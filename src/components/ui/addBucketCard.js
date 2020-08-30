import React, { useState } from 'react'
import { myFirebase } from 'utils/firebase'
import { useFormik } from 'formik'  
import * as Yup from 'yup'
import { ClickAwayListener, Typography } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const AddBucketCard = (props) => {
  const bucketDocRef = myFirebase.firestore().collection('buckets')
  const [step, setStep] = useState(1)
  const [bucketId, setBucketId] = useState(null)

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Title is too short')
      .max(140, 'Character limit exceeded')
      .required('This is a required field'),
    description: Yup.string()
      .min(1, 'Description is too short')
      .required('This is a required field')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      restricted: false,
      author: props.uid,
      authorEmail: props.email,
      authorName: props.displayName,
      createdAt: Date.now(),
      collaborators: {
        verified: [props.email],
        pending: []
      },
      name: '',
      email: '',
      sent: false,
      sendByDate: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const data = {
        title: values.title,
        description: values.description,
        restricted: values.restricted,
        author: values.author,
        authorEmail: values.authorEmail,
        authorName: values.authorName,
        createdAt: values.createdAt,
        collaborators: values.collaborators,
        recipient: {
          name: values.name,
          email: values.email,
        },
        sent: values.sent,
        sendByDate: values.sendByDate,
        inviteCodes: []
      }
      let wish = null

      if (values.wish) {
        wish = {
          author: props.displayName,
          authorEmail: props.email,
          uid: props.uid,
          message: values.wish,
          createdAt: Date.now()
        }
      }

      delete data.wish // Removes the wish from the other values since it is saved to a different collection
      setBucketId(createBucket(data, wish))
      resetForm()
      setStep(5)
      setSubmitting(false)
    }
  })

  const createBucket = (data, wish) => {
    bucketDocRef.add(data).then((ref) => {
      if (wish) {
        bucketDocRef
          .doc(ref.id)
          .collection('wishes')
          .doc(props.uid)
          .set(wish, { merge: true })
          .then(() => {})
      }
      setBucketId(ref.id)
      console.log('Added document with ID: ', ref.id)
    })
  }

  const bucket = props.useBucket(bucketId)

  return (
    <div className='overlay'>
      <div className='col-md-6 mx-auto'>
        <ClickAwayListener onClickAway={props.handleClose}>
          <form onSubmit={formik.handleSubmit}>
            <div className='create-bucket-card text-center p-3'>
              <div className='close-button' onClick={props.handleClose}>
                <CloseIcon />
              </div>
              {step === 1 && (
                <>
                  <Typography variant='body1' color='primary' className='w-5'>
                    Name Your Bucket
                  </Typography>
                  <div className='mt-4'>
                    <input
                      type='text'
                      id='title'
                      name='title'
                      className='mb-1 custom-font'
                      margin='dense'
                      fullWidth
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      error={!!(formik.touched.title && formik.errors.title)}
                      helperText={
                        formik.touched.title && formik.errors.title
                          ? formik.errors.title
                          : null
                      }
                    />
                  </div>
                  <div className='text-danger mt-4'>
                    {formik.touched.title && formik.errors.title
                      ? formik.errors.title
                      : null}
                  </div>
                  <div className='mt-4'>
                    <button
                      className='bw-button'
                      onClick={() => {
                        if (formik.touched.title && !formik.errors.title) {
                          setStep(2)
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <Typography variant='body1' color='primary' className='w-5'>
                    Provide the purpose and instructions for those <br /> who
                    will be adding wishes to the bucket.
                  </Typography>
                  <div className='mt-4'>
                    <textarea
                      id='description'
                      name='description'
                      className='mb-1'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      cols='50'
                      rows='5'
                    ></textarea>
                  </div>
                  <div className='text-danger mt-4'>
                    {formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : null}
                  </div>
                  <div className='mt-4'>
                    <button className='bw-button' onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button
                      className='bw-button'
                      onClick={() => {
                        if (
                          formik.touched.description &&
                          !formik.errors.description
                        ) {
                          setStep(3)
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <Typography variant='body1' color='primary' className='w-5'>
                    Add your wish!
                  </Typography>
                  <div className='mt-4'>
                    <textarea
                      id='wish'
                      name='wish'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.wish}
                      cols='50'
                      rows='5'
                    ></textarea>
                  </div>
                  <div className='mt-4'>
                    <button className='bw-button' onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button className='bw-button' onClick={() => setStep(4)}>
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <Typography variant='h6' color='primary' className='w-5'>
                    Who shall we send this Bucket to?
                  </Typography>
                  <div className='mt-1'>
                    <input
                      required
                      type='text'
                      id='name'
                      name='name'
                      className='mb-1 custom-font'
                      margin='dense'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder='Enter their name'
                    />
                  </div>
                  <div className='mt-1'>
                    <input
                      required
                      type='email'
                      id='email'
                      name='email'
                      className='mb-1 custom-font'
                      margin='dense'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder='Enter their email'
                    />
                  </div>
                  <Typography variant='body2' color='primary' className='mt-2'>
                    When would you like to send this bucket
                  </Typography>
                  <div className='mt-1'>
                    <input
                      required
                      type='date'
                      id='sendByDate'
                      name='sendByDate'
                      className='mb-1 custom-font'
                      margin='dense'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className='mt-4'>
                    <button className='bw-button' onClick={() => setStep(3)}>
                      Back
                    </button>
                    <button className='bw-button' type='submit'>
                      Finish
                    </button>
                  </div>
                </>
              )}
              {step === 5 && bucketId && (
                <>
                  <Typography variant='h6' className='w-5 text-success'>
                    Your Bucket was created successfully!
                  </Typography>
                  <Typography variant='body2' color='text-primary'>
                    Would you like to invite friends and family to add wishes to
                    this bucket?
                  </Typography>

                  <div className='mt-4'>
                    <button className='bw-button' onClick={props.handleClose}>
                      Later
                    </button>
                    <button
                      className='bw-button'
                      onClick={(e) => {
                        e.preventDefault()
                        props.handleClose()
                        props.handleSetActiveBucket(bucket)
                        props.handleOpenInviteCard()
                      }}
                    >
                      Sure
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </ClickAwayListener>
      </div>
    </div>
  )
}

export default AddBucketCard
