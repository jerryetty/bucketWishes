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
                      <Typography
                        variant='body2'
                        className='mt-2'
                        color='secondary'
                      >
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
                  <Typography variant='h5' className='w-5 text-success'>
                    Your bucket was sent successfully
                  </Typography>
                  <Typography variant='body2' className="mt-2" color='secondary'>
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
                  <div className="bucket-actions text-center">
                    <button className="bw-button" onClick={props.handleClose}>
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
