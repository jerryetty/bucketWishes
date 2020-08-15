import React, { useState, useEffect } from 'react'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import { myFirebase as firebase } from 'utils/firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import ConfirmDialog from './confirmDialog'
import PopupAlert from './popupAlert'

const Wishes = (props) => {
  const wishesRef = firebase
    .firestore()
    .collection('buckets')
    .doc(props.bucket.id)
    .collection('wishes')

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .max(1000, 'Character limit exceeded')
      .required('Please enter a message')
  })

  const formik = useFormik({
    initialValues: {
      author: props.displayName,
      authorEmail: props.email,
      uid: props.uid,
      message: props.message,
      createdAt: Date.now()
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const data = values
      addWish(data)
      resetForm()
      if(props.showAddWishInput) {props.handleHideAddWishInput()}
      if(props.showEditWishInput) {props.handleHideEditWishInput()}
    }
  })

  const addWish = (data) => {
    wishesRef
      .doc(props.uid)
      .set(data, { merge: true })
      .then(() => {})
  }

  const useWishes = () => {
    const [wishes, setWishes] = useState([])

    useEffect(() => {
      wishesRef.onSnapshot(
        (snapshot) => {
          const newWishes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setWishes(newWishes)
        },
        (err) => {
          console.log(`Encountered error: ${err}`)
        }
      )
      return () => {}
    }, [])

    return wishes
  }

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [wishIdToDelete, setWishIdToDelete] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const handleDelete = () => {
    wishesRef.doc(wishIdToDelete).delete()
    handleCloseConfirmDialog()
    setWishIdToDelete(null)
    handleShowAlert()
  }

  const handleShowAlert = () => {
    setShowAlert(true)
  }

  const handleHideAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  const handleFocus = (e) => e.target.select()

  const wishes = useWishes()

  const checkForUserWish = () => {
    wishes.map((wish) => {
      if (wish.id === props.uid) {
        props.setAddedWish(true)
      }
    })
  }

  checkForUserWish()

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          open={openConfirmDialog}
          handleClose={handleCloseConfirmDialog}
          message='Are you sure you want to delete this wish?'
          action={handleDelete}
        />
      )}

      {showAlert && (
        <PopupAlert
          open={showAlert}
          severity='error'
          handleHideAlert={handleHideAlert}
          message='Deleted!'
        />
      )}

      {props.showAddWishInput && (
        <div className='wish p-3 mt-3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='edit-wish'>
              <input
                type='text'
                id='message'
                name='message'
                className='mb-3'
                placeholder='Please add your wish here'
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                onChange={formik.handleChange}
              />
              <button type='submit' className='bw-button'>
                Add
              </button>
              <button 
                type='button'
                onClick={props.handleHideAddWishInput}
                className='bw-button'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {wishes.map((wish) => (
        <div className='wish p-3 mt-3 row' key={wish.id}>
          <div className='col-12'>
            {(!props.showEditWishInput || wish.id !== props.uid) && (
              <Typography variant='body2' color='primary' className='mb-2'>
                {wish.message}
              </Typography>
            )}
            {(props.showEditWishInput && wish.id === props.uid) && (
              <form onSubmit={formik.handleSubmit}>
                <div className='edit-wish'>
                  <input
                    type='text'
                    id={wish.id}
                    name='message'
                    className='mb-3'
                    onBlur={formik.handleBlur}
                    onFocus={handleFocus}
                    onChange={formik.handleChange}
                    defaultValue={wish.message}
                  />
                  <button type='submit' className='bw-button'>
                    Update
                  </button>
                  <button
                    onClick={props.handleHideEditWishInput}
                    className='bw-button'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className='col-9 col-md-8'>
            <Typography variant='caption' color='textPrimary'>
              {wish.author}
            </Typography>
          </div>
          <div className='col-md-4 col-3'>
            {((props.bucketOwner || wish.id === props.uid) && !props.preview) && (
              <div className='wish-actions text-right'>
                <Tooltip title='Delete wish' aria-label='Delete wish'>
                  <span>
                    <IconButton
                      onClick={() => {
                        setWishIdToDelete(wish.id)
                        handleOpenConfirmDialog()
                      }}
                      className='mt-2 wish-action-icon'
                      id='add-collaborator'
                      color='primary'
                      aria-label='Delete wish'
                      size='small'
                      disableFocusRipple
                      disableRipple
                    >
                      <DeleteIcon className='wish-action-icon' />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title='Edit wish' aria-label='Edit wish'>
                  <span>
                    <IconButton
                      onClick={props.handleShowEditWishInput}
                      className='mt-2 wish-action-icon'
                      id='add-collaborator'
                      color='primary'
                      aria-label='Edit wish'
                      size='small'
                      disabled={(wish.id !== props.uid) ? true : false}
                    >
                      <EditIcon className='wish-action-icon' />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default Wishes
