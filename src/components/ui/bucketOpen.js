import React, { useState, useEffect } from 'react'
import { myFirebase as firebase } from 'utils/firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Moment from 'react-moment'
import { Typography, ClickAwayListener, IconButton, CircularProgress } from '@material-ui/core'
import Wishes from './wishes'
import ConfirmDialog from './confirmDialog'
import PopupAlert from './popupAlert'
import { Info as InfoIcon, Delete as DeleteIcon } from '@material-ui/icons'

const BucketOpen = (props) => {
  const bucketDocRef = firebase
    .firestore()
    .collection('buckets')
    .doc(props.bucket.id)

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Title is too short')
      .max(140, 'Character limit exceeded'),
    description: Yup.string().min(1, 'Description is too short')
  })

  const formik = useFormik({
    initialValues: {
      title: props.bucket.title,
      description: props.bucket.description,
      updated: Date.now()
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      editBucket(values)
      setBucketDetails(values)
      setEdit(false)
      // setTimeout(props.handleClose, 2000)
    }
  })

  const useCollaborators = () => {
    const [collaborators, setCollaborators] = useState([])
    useEffect(() => {
      bucketDocRef.onSnapshot(
        (snapshot) => {
          const collaborators = snapshot.data().collaborators.verified
          setCollaborators(collaborators)
        },
        (err) => {
          console.log(`Encountered error: ${err}`)
        }
      )
    }, [])

    return collaborators
  }

  const usePendingCollaborators = () => {
    const [collaborators, setCollaborators] = useState([])
    useEffect(() => {
      bucketDocRef.onSnapshot(
        (snapshot) => {
          const collaborators = snapshot.data().collaborators.pending
          setCollaborators(collaborators)
        },
        (err) => {
          console.log(`Encountered error: ${err}`)
        }
      )
    }, [])

    return collaborators
  }

  const collaborators = useCollaborators()
  const pendingCollaborators = usePendingCollaborators()

  const editBucket = (data) => {
    bucketDocRef.update(data).then(() => {
      console.log('Document updated')
    })
  }

  const handleFocus = (e) => e.target.select()

  const setBucketOwner = () => {
    if (props.uid === props.bucket.author) {
      return true
    } else return false
  }

  const [bucketDetails, setBucketDetails] = useState({
    title: props.bucket.title,
    description: props.bucket.description
  })
  const [showEditWishInput, setShowEditWishInput] = useState(false)
  const [showAddWishInput, setShowAddWishInput] = useState(false)
  const [addedWish, setAddedWish] = useState(false)
  const [edit, setEdit] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleToggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleHideInfo = () => {
    setShowInfo(false)
  }

  const handleShowEditWishInput = () => {
    setShowEditWishInput(true)
  }

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  // Delete a bucket passing id as a parameter
  const handleDelete = () => {
    props.handleClose()
    bucketDocRef.delete()
    props.handleSetAlertMessage('Bucket Deleted')
    props.handleShowAlert()
  }

  const handleHideAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  const handleHideEditWishInput = () => {
    setShowEditWishInput(false)
  }

  const handleShowAddWishInput = () => {
    setShowAddWishInput(true)
  }

  const handleHideAddWishInput = () => {
    setShowAddWishInput(false)
  }

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          open={openConfirmDialog}
          handleClose={handleCloseConfirmDialog}
          message='Are you sure you want to delete this bucket?'
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

      <div className='row overlay'>
        <div className='col-md-8 mx-auto'>
          <ClickAwayListener onClickAway={props.handleClose}>
            <div className='bucket-open p-5'>
              {props.shared === 0 && (
                <>
                  {showInfo && (
                    <ClickAwayListener onClickAway={handleHideInfo}>
                      <div className='bucket-info'>
                        <div className='details'>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='w-5'
                            >
                              Recipient
                            </Typography>
                            <Typography variant='caption' color='primary' className='c-pointer text-link text-info' onClick={props.handleOpenAddRecipientCard}>
                             {props.bucket.recipient && props.bucket.recipient.name}
                             {!props.bucket.recipient && (
                               <span>
                                Add a recipient
                               </span>
                             )}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='w-5'
                            >
                              Send by
                            </Typography>
                            <Typography variant='caption' color='primary' className='c-pointer text-link text-info' onClick={props.handleOpenAddRecipientCard}>
                             {props.bucket.sendByDate && props.bucket.sendByDate}
                             {!props.bucket.sendByDate && (
                               <span>
                                Choose a date
                               </span>
                             )}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='w-5'
                            >
                              Status
                            </Typography>
                            <Typography variant='caption' color='primary'>
                             {props.bucket.sent && (
                               <span className="text-success">
                                 Sent
                               </span>
                             )}
                             {!props.bucket.sent && (
                               <span>
                                Not Sent
                               </span>
                             )}
                            </Typography>
                          </div>
                        </div>
                        <div className='people mt-3'>
                          <Typography
                            variant='body2'
                            color='primary'
                            className='w-7'
                          >
                            People Invited
                          </Typography>
                          <hr />
                          {collaborators.map((collaborator) => (
                            <Typography
                              key={collaborator}
                              variant='caption'
                              className='text-success'
                            >
                              {collaborator}
                              <br />
                            </Typography>
                          ))}
                          {pendingCollaborators.map((collaborator) => (
                            <Typography
                              key={collaborator}
                              variant='caption'
                              className='text-info'
                            >
                              {collaborator}
                              <br />
                            </Typography>
                          ))}
                        </div>
                        <div className='actions'>
                          {props.uid === props.bucket.author &&
                            !props.preview &&
                            !props.bucket.restricted && (
                              <>
                                <IconButton
                                  id='add-collaborator'
                                  className='w-5 text-danger'
                                  aria-label='add collaborators'
                                  size='small'
                                  onClick={handleOpenConfirmDialog}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <Typography
                                  variant='caption'
                                  className='w-5 text-danger c-pointer'
                                  onClick={handleOpenConfirmDialog}
                                >
                                  Delete this Bucket
                                </Typography>
                              </>
                            )}
                        </div>
                      </div>
                    </ClickAwayListener>
                  )}
                  {!edit && (
                    <>
                      <div className='bucket-title'>
                        <Typography
                          variant='h5'
                          color='primary'
                          className='w-5'
                        >
                          {bucketDetails.title}
                        </Typography>
                        <span>
                          <IconButton
                            id='add-collaborator'
                            color='primary'
                            aria-label='add collaborators'
                            size='small'
                            onClick={handleToggleInfo}
                          >
                            <InfoIcon />
                          </IconButton>
                        </span>
                      </div>
                      <Typography
                        variant='body2'
                        className='mt-2'
                        color='secondary'
                      >
                        {bucketDetails.description}
                      </Typography>

                      <Typography variant='caption' color='textSecondary'>
                        Author: {props.bucket.authorName}
                        {' | '}
                        <Moment format='YYYY/MM/DD'>
                          {props.bucket.createdAt}
                        </Moment>
                      </Typography>
                    </>
                  )}
                  {edit && (
                    <ClickAwayListener onClickAway={() => setEdit(false)}>
                      <form onSubmit={formik.handleSubmit}>
                        <Typography
                          variant='body2'
                          color='primary'
                          className='mb-1'
                        >
                          Change the name of this Bucket
                        </Typography>
                        <input
                          type='text'
                          id='title'
                          name='title'
                          className='mb-3'
                          margin='dense'
                          label='Change the name of your bucket'
                          fullWidth
                          onBlur={formik.handleBlur}
                          onFocus={handleFocus}
                          onChange={formik.handleChange}
                          value={formik.values.title}
                          error={
                            formik.touched.title && formik.errors.title
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.title && formik.errors.title
                              ? formik.errors.title
                              : null
                          }
                        />
                        <Typography
                          variant='body2'
                          color='primary'
                          className='mb-1'
                        >
                          Change the purpose of this Bucket
                        </Typography>
                        <textarea
                          type='text'
                          id='description'
                          name='description'
                          className='mb-3'
                          margin='dense'
                          fullWidth
                          onBlur={formik.handleBlur}
                          onFocus={handleFocus}
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          error={
                            formik.touched.title && formik.errors.description
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                              ? formik.errors.description
                              : null
                          }
                        ></textarea>
                        <div>
                          <button
                            onClick={() => {
                              setEdit(false)
                            }}
                            className='bw-button'
                          >
                            Cancel
                          </button>
                          <button type='submit' className='bw-button'>
                            Save
                          </button>
                        </div>
                      </form>
                    </ClickAwayListener>
                  )}
                  {!props.bucket.restricted && (
                    <div className='wishes-container mt-4'>
                      <Wishes
                        {...props}
                        bucketOwner={setBucketOwner()}
                        showEditWishInput={showEditWishInput}
                        showAddWishInput={showAddWishInput}
                        setAddedWish={setAddedWish}
                        handleShowEditWishInput={handleShowEditWishInput}
                        handleHideEditWishInput={handleHideEditWishInput}
                        handleShowAddWishInput={handleShowAddWishInput}
                        handleHideAddWishInput={handleHideAddWishInput}
                      />
                      <hr />
                    </div>
                  )}
                  {!props.preview && !props.bucket.restricted && (
                    <div className='bucket-actions mt-3'>
                      <div>
                        <Typography
                          variant='caption'
                          color='primary'
                          className='c-pointer w-5'
                          onClick={props.handleOpenInviteCard}
                        >
                          Invite others
                        </Typography>
                      </div>
                      {!addedWish && (
                        <Typography
                          variant='caption'
                          color='primary'
                          className='c-pointer w-5'
                          onClick={handleShowAddWishInput}
                        >
                          Add your Wish
                        </Typography>
                      )}

                      {props.uid === props.bucket.author && (
                        <>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='c-pointer w-5'
                              onClick={() => {
                                setEdit(true)
                              }}
                            >
                              Edit Bucket
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='c-pointer'
                              onClick={props.handleOpenSendBucketCard}
                            >
                              Send Bucket
                            </Typography>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {props.preview && (
                    <div className='bucket-actions'>
                      <Typography variant='caption' className='c-pointer' color='primary'>
                        Close Preview
                      </Typography>
                      <Typography
                        variant='caption'
                        color='primary'
                        className='c-pointer'
                        onClick={() => {
                          props.setShared(-1)
                          props.submit()
                        }}
                      >
                        Send this Bucket
                      </Typography>
                    </div>
                  )}
                </>
              )}
              {props.shared === -1 && (
                <div className='text-center'>
                  <CircularProgress />
                </div>
              )}
              {props.shared === 1 && (
                <>
                  <Typography variant='h5' className='w-5 text-success'>
                    Your bucket was sent successfully
                  </Typography>
                  <Typography
                    variant='body2'
                    className='mt-2'
                    color='secondary'
                  >
                    Thank you for using BucketWishes! We are excited to share in
                    providing opportunities to encourage those in our world by
                    letting them know they are LOVED and APPRECIATED!
                    BucketWishes was also created as a means to bring awareness
                    and provide additional financial resources necessary to care
                    for children who have been orphaned, abused or are homeless.
                    Listed below are a few options of ways you can join with us
                    in helping and encouraging children who have experienced
                    hardship in their lives.
                  </Typography>
                  <div className='row mt-5 mb-5'>
                    <div className='col-md-7'>
                      <div className='donate-card'>
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Join the Founding 500
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          500 individuals, organizations, businesses or churches
                          who will make a five year commitment to give $1,200
                          per year ($100/month). As a “Founding 500 Member” your
                          name will forever be listed as a part of ENWR’s
                          History in the Main Office as well as in the “Founding
                          500 Home” (A home that will be built with a percentage
                          of each gift given and honoring all those who have
                          joined.)
                        </Typography>
                        <a
                          href='https://www.enwranch.org/founding-500.html'
                          target='blank'
                        >
                          <button className='bw-button'>Give Now</button>
                        </a>
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div className='donate-card'>
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Donate a monthly Gift
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          Gifts of $10, $25, $50 or more given on a consistent
                          monthly basis add up to a lot and will help make a
                          difference in the lives of children.
                        </Typography>
                        <a
                          href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
                          target='blank'
                        >
                          <button className='bw-button'>Give Now</button>
                        </a>
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div className='donate-card'>
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Donate a one-time Gift
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          A gift of any amount is very helpful and will help us
                          in caring for the children at ENWR.
                        </Typography>
                        <a
                          href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
                          target='blank'
                        >
                          <button className='bw-button'>Give Now</button>
                        </a>
                      </div>
                    </div>
                    <div className='col-md-7'>
                      <div className='donate-card'>
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Send a Note of Encouragement to a child at Eagle’s
                          Nest Wilderness Ranch
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          A gift of any amount is very helpful and will help us
                          in caring for the children at ENWR.
                        </Typography>
                        <a
                          href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
                          target='blank'
                        >
                          <button className='bw-button'>Give Now</button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='bucket-actions text-center'>
                    <button className='bw-button' onClick={props.handleClose}>
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </>
  )
}

export default BucketOpen
