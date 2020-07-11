import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClickAwayListener, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const SendBucketCard = (props) => {
  const [sent, setSent] = useState(false)
  const [recipient, setRecipient] = useState(true)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('This field is required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      bucketUrl: `#/bucket/${props.id}`
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      props.handleClose()
      props.handleOpenPreview(values)
      resetForm()
    }
  })

  const handleSendBucket = () => {
    const values = {
      email: props.bucket.recipient.email,
      name: props.bucket.recipient.name,
      bucketUrl: `#/bucket/${props.id}`
    }
    props.handleClose()
    props.handleOpenPreview(values)
  }

  return (
    <>
      <div className='row overlay'>
        <div className='col-md-6 mx-auto'>
          <ClickAwayListener onClickAway={props.handleClose}>
            <div className='create-bucket-card p-3 text-center'>
              <div className='close-button' onClick={props.handleClose}>
                <Close />
              </div>
              {(!props.bucket.recipient || !props.bucket.recipient.email || !recipient) && (
                <form onSubmit={formik.handleSubmit}>
                  <Typography variant='h6' color='primary' className='w-5'>
                    Send this Bucket to Recipient
                  </Typography>
                  <Typography variant='body2' color='primary' className='mt-2'>
                    Enter their name
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
                    Enter their email
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

                  <div className='mt-4'>
                    {!sent && (
                      <button className='bw-button' type='submit'>
                        Preview
                      </button>
                    )}
                  </div>
                </form>
              )}
              {props.bucket.recipient && props.bucket.recipient.email && recipient && (
                <div>
                  <Typography variant='h6' color='primary' className='w-5'>
                    You are sending this bucket to
                  </Typography>
                  <Typography variant='body1' className='text-success mt-4'>
                    Jerry Etiang
                  </Typography>
                  <Typography variant='body1' className='text-success'>
                    ettyje@gmail.com
                  </Typography>
                  <div className='mt-4'>
                    <button className='bw-button' onClick={() => {setRecipient(false)}}>Edit Recipient</button>
                    {!sent && (
                      <button className='bw-button' onClick={handleSendBucket}>
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </>
  )
}

export default SendBucketCard
