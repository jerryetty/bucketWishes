import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { myFirebase } from 'utils/firebase'
import { ClickAwayListener, Typography } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const AddRecipient = (props) => {
  const bucketDocRef = myFirebase.firestore().collection('buckets')
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('This field is required')
  })

  const formik = useFormik({
    initialValues: {
      name: props.bucket.recipient ? props.bucket.recipient.name : '',
      email: props.bucket.recipient ? props.bucket.recipient.email : '',
      sendByDate: Date.now()
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      bucketDocRef.doc(props.id).update({
        recipient: {
          name: values.name,
          email: values.email
        }
      })
      resetForm()
      props.handleClose()
      props.handleSetActiveBucket({
        ...props.bucket,
        recipient: {
          name: values.name,
          email: values.email
        }
      })
      props.handleOpenBucket()
      setSubmitting(false)
    }
  })

  return (
    <div className='overlay'>
      <div className='col-md-6 mx-auto'>
        <ClickAwayListener onClickAway={props.handleClose}>
          <div className='create-bucket-card text-center'>
            <div className='close-button' onClick={props.handleClose}>
              <CloseIcon />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant='h6' color='primary' className='w-5'>
                Who shall we send this Bucket to?
              </Typography>
              <Typography variant='body2' color='primary' className='mt-2'>
                Their name
              </Typography>
              <div className='mt-1'>
                <input
                  required
                  type='text'
                  id='name'
                  name='name'
                  className='mb-1 custom-font'
                  onBlur={formik.handleBlur}
                  onFocus={props.handleFocus}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <Typography variant='body2' color='primary' className='mt-2'>
                Their email
              </Typography>
              <div className='mt-1'>
                <input
                  required
                  type='email'
                  id='email'
                  name='email'
                  className='mb-1 custom-font'
                  onBlur={formik.handleBlur}
                  onFocus={props.handleFocus}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {/* <Typography variant='body2' color='primary' className='mt-2'>
                When would you like to send this bucket
              </Typography>
              <div className='mt-1'>
                <input
                  type='date'
                  id='sendByDate'
                  name='sendByDate'
                  className='mb-1 custom-font'
                  margin='dense'
                  onBlur={formik.handleBlur}
                  onFocus={props.handleFocus}
                  onChange={formik.handleChange}
                />
              </div> */}
              <div className='mt-4'>
                <button
                  className='bw-button'
                  type='submit'
                  disabled={formik.errors.email ? true : false}
                >
                  Add Recipient
                </button>
              </div>
            </form>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  )
}

export default AddRecipient
