import React, { useState } from 'react'
import { myFirebase } from 'utils/firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClickAwayListener, Typography } from '@material-ui/core'

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
      }
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const data = values
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

      delete data.wish
      setBucketId(createBucket(data, wish))
      resetForm()
      setStep(4)
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

  return (
    <div className='row overlay'>
      <div className='col-md-6 mx-auto'>
        <ClickAwayListener onClickAway={props.handleClose}>
            <form onSubmit={formik.handleSubmit}>
          <div className='create-bucket-card text-center p-3'>
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
                        if (formik.touched.title && !formik.errors.title){
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
                    Provide the purpose and instructions for those <br/> who will be
                    adding wishes to the bucket.
                  </Typography>
                  <div className='mt-4'>
                    <textarea
                      id='description'
                      name='description'
                      className='mb-1'
                      margin='dense'
                      label='Tell a story about your bucket *'
                      fullWidth
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      error={
                        !!(formik.touched.title && formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                          ? formik.errors.description
                          : null
                      }
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
                    <button className='bw-button' onClick={() => {
                        if (formik.touched.description && !formik.errors.description){
                          setStep(3)
                        }
                      }}>
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
                      margin='dense'
                      fullWidth
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      cols='50'
                      rows='5'
                    ></textarea>
                  </div>
                  <div className='mt-4'>
                    <button className='bw-button' onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button className='bw-button' type='submit'>
                      Finish
                    </button>
                  </div>
                </>
              )}
              {step === 4 && bucketId && (
                <>
                  <Typography variant='h6' className='w-5 text-success'>
                    Your Bucket was created successfully!
                  </Typography>
                  <Typography variant='body2' color='secondary'>
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
                        props.handleSetActiveBucket({ id: bucketId })
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
