import React, { useState } from 'react'
import { myFirebase as firebase } from 'utils/firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Moment from 'react-moment'
import { Typography, ClickAwayListener, TextField } from '@material-ui/core'
import Wishes from './wishes'

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
      let data = values
      editBucket(data)
      setEdit(false)
      // setTimeout(props.handleClose, 2000)
    }
  })

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

  const [showAddWishInput, setShowAddWishInput] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleShowAddWishInput = () => {
    setShowAddWishInput(true)
  }

  const handleHideAddWishInput = () => {
    setShowAddWishInput(false)
  }

  return (
    <>
      <div className='row overlay'>
        <div className='col-md-8 mx-auto'>
          <ClickAwayListener onClickAway={props.handleClose}>
            <div className='bucket-open p-5'>
              {!props.shared && (
                <>
                  {!edit && (
                    <>
                      <Typography variant='h5' color='primary' className='w-5'>
                        {props.bucket.title}
                      </Typography>
                      <Typography variant='body1' color='secondary'>
                        {props.bucket.description}
                      </Typography>

                      <Typography variant='caption' color='secondary'>
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
                        <TextField
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
                        <TextField
                          type='text'
                          id='description'
                          name='description'
                          className='mb-3'
                          margin='dense'
                          label='Edit the description of your bucket'
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
                        />
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
                      </form>
                    </ClickAwayListener>
                  )}
                  {!props.bucket.restricted && (
                    <div className='wishes-container mt-4'>
                      <Wishes
                        {...props}
                        bucketOwner={setBucketOwner()}
                        showAddWishInput={showAddWishInput}
                        handleShowAddWishInput={handleShowAddWishInput}
                        handleHideAddWishInput={handleHideAddWishInput}
                      />
                    </div>
                  )}

                  <hr />
                  {!props.preview && !props.bucket.restricted && (
                    <div className='bucket-actions'>
                      <div className='row'>
                        <div className='col-3 text-center'>
                          <Typography
                            variant='caption'
                            color='primary'
                            className='c-pointer'
                            onClick={props.handleOpenInviteCard}
                          >
                            Invite others
                          </Typography>
                        </div>
                        <div className='col-3 text-center'>
                          <Typography
                            variant='caption'
                            color='primary'
                            className='c-pointer'
                            onClick={handleShowAddWishInput}
                          >
                            Add a wish
                          </Typography>
                        </div>
                        <div className='col-3 text-center'>
                          <Typography
                            variant='caption'
                            color='primary'
                            className='c-pointer'
                            onClick={() => {
                              setEdit(true)
                            }}
                          >
                            Edit Bucket
                          </Typography>
                        </div>
                        <div className='col-3 text-center'>
                          <Typography
                            variant='caption'
                            color='primary'
                            className='c-pointer'
                            onClick={props.handleOpenSendBucketCard}
                          >
                            Send Bucket
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                  {props.preview && (
                    <div className='bucket-actions'>
                      <div className='row'>
                        <div className='col-md-4 text-center'>
                          <Typography variant='caption' color='primary'>
                            Close Preview
                          </Typography>
                        </div>
                        <div className='col-md-4 text-center'></div>
                        <div className='col-md-4 text-center'>
                          <Typography
                            variant='caption'
                            color='primary'
                            className='c-pointer'
                            onClick={() => {
                              props.submit()
                            }}
                          >
                            Send this Bucket
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {props.shared && (
                <>
                  <Typography variant='h5' color='primary' className='w-5'>
                    Your bucket was sent successfully
                  </Typography>
                  <Typography variant='body1' color='secondary'>
                    Consider donating to Bucket wishes
                  </Typography>
                  <div className='row mt-2 mb-2 text-center'>
                    <div className='col-md-4'>
                      <div
                        className='donate-card'
                        style={{ height: 220, boxShadow: 'none' }}
                      >
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Join the Founding 500
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          Donate $100/month for 5 years.
                        </Typography>
                        <a
                          href='https://www.enwranch.org/founding-500.html'
                          target='blank'
                        >
                          <button className='bw-button'>Give Now</button>
                        </a>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div
                        className='donate-card'
                        style={{ height: 220, boxShadow: 'none' }}
                      >
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
                    <div className='col-md-4'>
                      <div
                        className='donate-card'
                        style={{ height: 220, boxShadow: 'none' }}
                      >
                        <Typography
                          variant='body1'
                          color='primary'
                          className='w-7'
                        >
                          Donate a one-time Gift
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                          Give any amount on a non-recurrent basis
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
