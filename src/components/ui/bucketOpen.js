import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { myFirebase as firebase } from 'utils/firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Moment from 'react-moment'
import {
  Typography,
  ClickAwayListener,
  IconButton,
  CircularProgress
} from '@material-ui/core'
import Wishes from './wishes'
import ConfirmDialog from './confirmDialog'
import PopupAlert from './popupAlert'
import {
  Info as InfoIcon,
  Delete as DeleteIcon,
  CloseRounded
} from '@material-ui/icons'

const BucketOpen = (props) => {
  const activeBucket = props.bucket
  const bucketDocRef = firebase.firestore().collection('buckets')
  let inviteCodes

  if (props.bucket.otps) {
    inviteCodes = props.bucket.otps
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Title is too short')
      .max(140, 'Character limit exceeded'),
    description: Yup.string().min(1, 'Description is too short')
  })

  const acceptCodeValidationSchema = Yup.object().shape({
    bucketCode: Yup.number().required('Code is required')
  })

  const formik = useFormik({
    initialValues: {
      title: activeBucket.title,
      description: activeBucket.description,
      updated: Date.now()
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      editBucket(values)
      setBucketDetails(values)
      setEdit(false)
    }
  })

  const formikInviteCode = useFormik({
    initialValues: {
      bucketCode: ''
    },
    validationSchema: acceptCodeValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      if (inviteCodes && inviteCodes.indexOf(values.bucketCode)) {
        props.handleAcceptBucket(activeBucket.id)
        handleAccepted(1)
      } else console.log('You, entered a wrong code')
    }
  })

  const useCollaborators = () => {
    const [collaborators, setCollaborators] = useState([])
    useEffect(() => {
      bucketDocRef.doc(activeBucket.id).onSnapshot(
        (snapshot) => {
          if (snapshot.data()) {
            const collaborators = snapshot.data().collaborators.verified
            setCollaborators(collaborators)
          }
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
      bucketDocRef.doc(activeBucket.id).onSnapshot(
        (snapshot) => {
          if (snapshot.data()) {
            const collaborators = snapshot.data().collaborators.pending
            setCollaborators(collaborators)
          }
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
    bucketDocRef
      .doc(activeBucket.id)
      .update(data)
      .then(() => {
        console.log('Document updated')
      })
  }

  const handleFocus = (e) => e.target.select()

  const setBucketOwner = () => {
    if (props.uid === activeBucket.author) {
      return true
    } else return false
  }

  const [bucketDetails, setBucketDetails] = useState({
    title: activeBucket.title,
    description: activeBucket.description
  })
  const [showEditWishInput, setShowEditWishInput] = useState(false)
  const [showAddWishInput, setShowAddWishInput] = useState(false)
  const [addedWish, setAddedWish] = useState(false)
  const [edit, setEdit] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [accepted, setAccepted] = useState(-1)

  const handleAccepted = (value) => {
    return setAccepted(value)
  }

  useEffect(() => {
    if (activeBucket.collaborators) {
      const verifiedCollaborators = activeBucket.collaborators.verified
      const unVerifiedCollaborators = activeBucket.collaborators.pending
      if (
        unVerifiedCollaborators &&
        unVerifiedCollaborators.indexOf(props.email) > -1
      ) {
        handleAccepted(0)
      } else if (
        verifiedCollaborators &&
        verifiedCollaborators.indexOf(props.email) > -1
      ) {
        handleAccepted(1)
      } else {
        handleAccepted(-1)
      }
    }
  }, [props.email, activeBucket.collaborators])

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
    bucketDocRef.doc(activeBucket.id).delete()
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

      <div className='dialog'>
        <div id='myModal' className='bw-dialog'>
          {accepted === 1 && (
            <>
              {(props.shared === 0 || !props.shared) && (
                <>
                  {showInfo && (
                    <ClickAwayListener onClickAway={handleHideInfo}>
                      <div className='bucket-info'>
                        <div className='details'>
                          <div>
                            {/* <Typography
                              variant='caption'
                              color='primary'
                              className='w-5'
                            >
                              Recipient
                            </Typography>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='c-pointer text-link text-info'
                              onClick={props.handleOpenAddRecipientCard}
                            >
                              {activeBucket.recipient &&
                                activeBucket.recipient.name}
                              {!activeBucket.recipient && (
                                <span>Add a recipient</span>
                              )}
                            </Typography> */}
                          </div>
                          <div>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='w-5'
                            >
                              Send by
                            </Typography>
                            <Typography
                              variant='caption'
                              color='primary'
                              className='c-pointer text-link text-info'
                              onClick={props.handleOpenAddRecipientCard}
                            >
                              {activeBucket.sendByDate &&
                                activeBucket.sendByDate}
                              {!activeBucket.sendByDate && (
                                <span>Choose a date</span>
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
                              {activeBucket.sent && (
                                <span className='text-success'>Sent</span>
                              )}
                              {!activeBucket.sent && <span>Not Sent</span>}
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
                          {props.uid === activeBucket.author &&
                            !props.preview &&
                            !activeBucket.restricted && (
                              <>
                                <IconButton
                                  id='add-collaborator'
                                  className='w-5 text-danger'
                                  aria-label='add collaborators'
                                  size='small'
                                  onClick={handleOpenConfirmDialog}
                                  disableFocusRipple={true}
                                  disableRipple={true}
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
                  <div className='bw-dialog-content'>
                    <div className='bw-dialog-header'>
                      {!edit && (
                        <>
                          <div className='bucket-top-actions'>
                            <span onClick={handleToggleInfo}>
                              <IconButton
                                disableFocusRipple={true}
                                disableRipple={true}
                              >
                                <InfoIcon className='bw-dialog-close' />
                              </IconButton>
                            </span>
                            <span onClick={props.handleClose}>
                              <IconButton
                                disableFocusRipple={true}
                                disableRipple={true}
                              >
                                <CloseRounded className='bw-dialog-close' />
                              </IconButton>
                            </span>
                          </div>

                          <div>
                            <Typography
                              variant='h5'
                              color='primary'
                              className='w-5'
                            >
                              {bucketDetails.title || activeBucket.title}
                            </Typography>
                            <Typography
                              variant='body2'
                              className='mt-2'
                              color='textPrimary'
                            >
                              {bucketDetails.description ||
                                activeBucket.description}
                            </Typography>

                            <Typography variant='caption' color='textSecondary'>
                              Author: {activeBucket.authorName}
                              {' | '}
                            </Typography>
                            <Typography variant='caption' color='textSecondary'>
                              <Moment format='YYYY/MM/DD'>
                                {activeBucket.createdAt}
                              </Moment>
                            </Typography>
                            <br />
                            <Typography variant='caption' color='textSecondary'>
                              Recipient: {activeBucket.recipient.name}
                            </Typography>
                            <br />
                            <Typography variant='caption' color='textSecondary'>
                              Status:{' '}
                              {activeBucket.sent && (
                                <span className='text-success'>Sent</span>
                              )}
                              {!activeBucket.sent && <span>Not Sent</span>}
                            </Typography>
                          </div>
                        </>
                      )}
                      {edit && (
                        <ClickAwayListener onClickAway={() => setEdit(false)}>
                          <form
                            onSubmit={formik.handleSubmit}
                            style={{ width: '100%' }}
                          >
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
                              className='mb-3 mt-2'
                              onBlur={formik.handleBlur}
                              onFocus={handleFocus}
                              onChange={formik.handleChange}
                              value={formik.values.title}
                              style={{ width: '100%' }}
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
                              className='mb-3 mt-2'
                              onBlur={formik.handleBlur}
                              onFocus={handleFocus}
                              onChange={formik.handleChange}
                              value={formik.values.description}
                              style={{ width: '100%' }}
                            ></textarea>
                            <div className='text-center'>
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
                    </div>
                    <div className='bw-dialog-body'>
                      {!activeBucket.restricted && (
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
                    </div>
                    {!props.preview && !activeBucket.restricted && (
                      <div className='bucket-actions bw-dialog-footer'>
                        <div>
                          <button
                            className='bw-button'
                            onClick={props.handleOpenInviteCard}
                          >
                            Invite others
                          </button>
                        </div>
                        {!addedWish && (
                          <button
                            className='bw-button'
                            onClick={handleShowAddWishInput}
                          >
                            Add your Wish
                          </button>
                        )}

                        {props.uid === activeBucket.author && (
                          <>
                            <div>
                              <button
                                className='bw-button'
                                onClick={() => {
                                  setEdit(true)
                                }}
                              >
                                Edit Bucket
                              </button>
                            </div>
                            <div>
                              <button
                                className='bw-button sendButton'
                                onClick={props.handleOpenSendBucketCard}
                              >
                                Send Bucket
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {activeBucket.restricted && (
                      <div className='bucket-actions bw-dialog-footer'>
                        <Link to='/about'>
                          <button className='bw-button'>Learn more</button>
                        </Link>
                        <Link to='/donate'>
                          <button className='bw-button'>Donate</button>
                        </Link>
                      </div>
                    )}
                    {props.preview && (
                      <div className='bucket-actions'>
                        <button
                          className='bw-button'
                          onClick={props.handleClose}
                        >
                          Close Preview
                        </button>
                        <button
                          className='bw-button'
                          onClick={() => {
                            props.setShared(-1)
                            props.submit()
                          }}
                        >
                          Send this Bucket
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {props.shared === -1 && (
                <div className='bw-dialog-content'>
                  <div className='bw-dialog-header'>
                    <div className='bucket-top-actions'>
                      <span onClick={props.handleClose}>
                        <IconButton
                          disableFocusRipple={true}
                          disableRipple={true}
                        >
                          <InfoIcon className='bw-dialog-close' />
                        </IconButton>
                      </span>
                      <span onClick={props.handleClose}>
                        <IconButton
                          disableFocusRipple={true}
                          disableRipple={true}
                        >
                          <CloseRounded className='bw-dialog-close' />
                        </IconButton>
                      </span>
                    </div>
                  </div>
                  <div className='bw-dialog-body'>
                    <div className='text-center'>
                      <CircularProgress />
                    </div>
                  </div>
                </div>
              )}
              {props.shared === 1 && (
                <div className='bw-dialog-content'>
                  <div className='bw-dialog-header'>
                    <div className='text-right'>
                      <span onClick={props.handleClose}>
                        <IconButton
                          disableFocusRipple={true}
                          disableRipple={true}
                        >
                          <CloseRounded className='bw-dialog-close' />
                        </IconButton>
                      </span>
                    </div>
                    <div>
                      <Typography variant='h5' className='w-5 text-success'>
                        Your bucket was sent successfully
                      </Typography>
                    </div>
                  </div>
                  <div className='bw-dialog-body'>
                    <Typography
                      variant='body2'
                      className='mt-2'
                      color='textPrimary'
                    >
                      Thank you for using BucketWishes! We are excited to share
                      in providing opportunities to encourage those in our world
                      by letting them know they are LOVED and APPRECIATED!
                      BucketWishes was also created as a means to bring
                      awareness and provide additional financial resources
                      necessary to care for children who have been orphaned,
                      abused or are homeless. Listed below are a few options of
                      ways you can join with us in helping and encouraging
                      children who have experienced hardship in their lives.
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
                          <Typography variant='caption' color='textPrimary'>
                            500 individuals, organizations, businesses or
                            churches who will make a five year commitment to
                            give $1,200 per year ($100/month). As a “Founding
                            500 Member” your name will forever be listed as a
                            part of ENWR’s History in the Main Office as well as
                            in the “Founding 500 Home” (A home that will be
                            built with a percentage of each gift given and
                            honoring all those who have joined.)
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
                          <Typography variant='caption' color='textPrimary'>
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
                          <Typography variant='caption' color='textPrimary'>
                            A gift of any amount is very helpful and will help
                            us in caring for the children at ENWR.
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
                          <Typography variant='caption' color='textPrimary'>
                            A gift of any amount is very helpful and will help
                            us in caring for the children at ENWR.
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
                  </div>
                </div>
              )}
            </>
          )}
          {accepted === 0 && (
            <div className='bw-dialog-content'>
              <div className='bw-dialog-header'>
                <div className='bucket-top-actions'>
                  <span onClick={props.handleClose}>
                    <IconButton disableFocusRipple={true} disableRipple={true}>
                      <InfoIcon className='bw-dialog-close' />
                    </IconButton>
                  </span>
                  <span onClick={props.handleClose}>
                    <IconButton disableFocusRipple={true} disableRipple={true}>
                      <CloseRounded className='bw-dialog-close' />
                    </IconButton>
                  </span>
                </div>
              </div>
              <div className='bw-dialog-body'>
                <div className='text-center'>
                  <Typography variant='body1'>
                    <strong>Accept</strong> the invite to add your wish to{' '}
                    <strong> {activeBucket.recipient.name + "'s"}</strong>{' '}
                    bucket
                  </Typography>
                  <br />
                </div>
                <div className='text-center'>
                  <button
                    className='bw-button mt-3'
                    onClick={() => {
                      props.handleAcceptBucket(activeBucket.id)
                      handleAccepted(1)
                      handleShowAddWishInput()
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className='bw-button mt-3'
                    onClick={() => props.handleRejectBucket(activeBucket.id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
          {accepted === -1 && (
            <div className='bw-dialog-content'>
              <div className='bw-dialog-header'>
                <div className='bucket-top-actions'>
                  <span onClick={props.handleClose}>
                    <IconButton disableFocusRipple={true} disableRipple={true}>
                      <InfoIcon className='bw-dialog-close' />
                    </IconButton>
                  </span>
                  <span onClick={props.handleClose}>
                    <IconButton disableFocusRipple={true} disableRipple={true}>
                      <CloseRounded className='bw-dialog-close' />
                    </IconButton>
                  </span>
                </div>
              </div>
              <div className='bw-dialog-body'>
                <form onSubmit={formikInviteCode.handleSubmit}>
                  <div className='text-center'>
                    <Typography variant='body1'>
                      Sorry you do not have access to this bucket
                    </Typography>
                    <Typography variant='caption'>
                      Enter the code that came with the email to get access
                    </Typography>
                  </div>
                  <div className='text-center mt-4 col-md-6 mx-auto'>
                    <input
                      type='number'
                      name='bucketCode'
                      id='bucketCode'
                      placeholder='Code'
                      onBlur={formikInviteCode.handleBlur}
                      onChange={formikInviteCode.handleChange}
                      value={formikInviteCode.values.bucketCode}
                    />
                    {formikInviteCode.errors.bucketCode && (
                      <span className='text-danger'>
                        {formikInviteCode.errors.bucketCode}
                      </span>
                    )}
                    <button className='bw-button mt-3' type='submit'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BucketOpen
