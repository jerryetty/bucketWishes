import React, { useState, useEffect } from "react"
import { Typography, Tooltip, IconButton, TextField } from "@material-ui/core"
import {myFirebase as firebase} from "utils/firebase"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
} from "@material-ui/icons"
import ConfirmDialog from "./confirmDialog"
import PopupAlert from "./popupAlert"

const Wishes = props => {
  const wishesRef = firebase
    .firestore()
    .collection("buckets")
    .doc(props.bucket.id)
    .collection("wishes")

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .max(1000, "Character limit exceeded")
      .required("Please enter a message"),
  })

  const formik = useFormik({
    initialValues: {
      author: props.displayName,
      authorEmail: props.email,
      uid: props.uid,
      message: props.message,
      createdAt: Date.now(),
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const data = values
      addWish(data)
      resetForm()
      props.handleHideAddWishInput()
    },
  })

  const addWish = data => {
    wishesRef
      .doc(props.uid)
      .set(data, { merge: true })
      .then(() => {})
  }

  const useWishes = () => {
    const [wishes, setWishes] = useState([])

    useEffect(() => {
      wishesRef.onSnapshot(
        snapshot => {
          const newWishes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          setWishes(newWishes)
        },
        err => {
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
    if (reason === "clickaway") {
      return
    }

    setShowAlert(false)
  }

  const handleFocus = e => e.target.select()

  const handleEdit = () => {}

  const wishes = useWishes()

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          open={openConfirmDialog}
          handleClose={handleCloseConfirmDialog}
          message="Are you sure you want to delete?"
          action={handleDelete}
        />
      )}
      
      {showAlert && (
        <PopupAlert
          open={showAlert}
          severity="error"
          dismiss={handleHideAlert}
          message="Deleted!"
        />
      )}

      {props.showAddWishInput && (
        <div className="wish p-3 mt-3">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-10">
                <TextField
                  type="text"
                  id="message"
                  name="message"
                  className="mb-3"
                  margin="dense"
                  label="Add a wish"
                  fullWidth
                  onBlur={formik.handleBlur}
                  onFocus={handleFocus}
                  onChange={formik.handleChange}
                  defaultValue={props.message}
                  error={
                    formik.touched.message && formik.errors.message
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.message && formik.errors.message
                      ? formik.errors.message
                      : null
                  }
                />
              </div>
              <div className="col-2">
                <Tooltip title="Add a wish" aria-label="Add a wish">
                  <span>
                    <IconButton
                      type="submit"
                      className="mt-4"
                      id="add-collaborator"
                      color="primary"
                      aria-label="Add a wish"
                      size="small"
                      disableFocusRipple
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>
            </div>
          </form>
        </div>
      )}

      {wishes.map(wish => (
        <div className="wish p-3 mt-3 row" key={wish.id}>
          <div className="col-9">
            <Typography variant="body1" color="primary" className="w-5">
              {wish.message}
            </Typography>
            <Typography variant="body2" color="secondary">
              {wish.author}
            </Typography>
          </div>
          {((props.bucketOwner || wish.id === props.uid) && !props.preview) && (
            <div className="col-3 wish-actions">
              <Tooltip title="Delete wish" aria-label="Delete wish">
                <span>
                  <IconButton
                    onClick={() => {
                      setWishIdToDelete(wish.id)
                      handleOpenConfirmDialog()
                    }}
                    className="mt-2"
                    id="add-collaborator"
                    color="primary"
                    aria-label="Delete wish"
                    size="small"
                    disableFocusRipple
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Edit wish" aria-label="Edit wish">
                <span>
                  <IconButton
                    onClick={handleEdit}
                    className="mt-2"
                    id="add-collaborator"
                    color="primary"
                    aria-label="Edit wish"
                    size="small"
                    disableFocusRipple
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Wishes
