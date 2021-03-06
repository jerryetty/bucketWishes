import React, { useState, useEffect } from 'react'
import { myFirebase } from 'utils/firebase'
import firebase from 'firebase'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import request from 'request'
import otpGenerator from 'otp-generator'
import { ClickAwayListener, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const InviteCard = (props) => {
  const bucketDocRef = myFirebase.firestore().collection('buckets')
  const [invited, setInvited] = useState(false)
  const [duplicate, setDuplicate] = useState(false)

  const useCollaborators = () => {
    const [collaborators, setCollaborators] = useState([])
    useEffect(() => {
      bucketDocRef.doc(props.bucket.id).onSnapshot(
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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('This field is required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      collaboratorName: '',
      senderName: props.displayName,
      dateInvited: Date.now(),
      bucketId: props.id,
      otp: otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      if (addCollaborator(values)) {
        resetForm()
        if (sendData(values)) {
          setInvited(true)
        }
        
      }
    }
  })

  
  const sendData = async (data) => {
    var options = {
      method: 'POST',
      url: 'https://us-central1-bucket-wishes.cloudfunctions.net/sendCollaboratorInvite',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        senderName: data.senderName,
        email: data.email,
        recipientName: props.bucket.recipient ? props.bucket.recipient.name : 'No recipient set yet',
        collaboratorName: data.collaboratorName,
        bucketId: data.bucketId,
        inviteCode: data.otp
      }
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
    })
  }

  const addCollaborator = (data) => {
    if (checkForDuplicates(data.email)) {
      setDuplicate(true)
      return false
    } else {
      const FieldValue = firebase.firestore.FieldValue
      bucketDocRef.doc(props.id).update({
        'collaborators.pending': FieldValue.arrayUnion(data.email),
        'otps': FieldValue.arrayUnion(data.otp),
      })
      return true
    }
  }

  const collaborators = useCollaborators()

  const checkForDuplicates = (email) => {
    if (collaborators.indexOf(email) >= 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='overlay'>
      <div className='col-md-6 mx-auto'>
        <ClickAwayListener onClickAway={props.handleClose}>
          <div className='create-bucket-card text-center p-5'>
            <div className="close-button" onClick={props.handleClose}>
              <Close />
            </div>
            <form onSubmit={formik.handleSubmit}>
              {!invited && (
                <>
                  <Typography variant='body1' color='primary' className='w-5'>
                    Invite friends and family to add wishes to this bucket
                  </Typography>
                  <Typography variant='body2' color='primary' className='mt-2'>
                    Enter their name
                  </Typography>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='collaboratorName'
                      name='collaboratorName'
                      className='mb-1 custom-font'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.collaboratorName}
                    />
                  </div>
                  <Typography variant='body2' color='primary' className='mt-2'>
                    Enter their email
                  </Typography>
                  <div className='mt-1'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='mb-1 custom-font'
                      onBlur={formik.handleBlur}
                      onFocus={props.handleFocus}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={!!(formik.touched.email && formik.errors.email)}
                    />
                  </div>
                  <div className='text-danger'>
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null}
                  </div>
                  {duplicate && (
                    <div className='text-danger'>
                      That person already has access to this bucket
                    </div>
                  )}
                  <div className='mt-4'>
                    <button
                      className='bw-button'
                      type='submit'
                      disabled={formik.errors.email ? true : false}
                    >
                      Send Invite
                    </button>
                  </div>
                </>
              )}
              {invited && (
                <>
                  <div className='text-success'>
                    <Typography variant='h5'>Invite Sent</Typography>
                  </div>
                  <div className='mt-4'>
                    <button
                      className='bw-button'
                      onClick={() => {
                        setInvited(false)
                      }}
                    >
                      Invite Someone Else
                    </button>
                    <button className='bw-button' onClick={props.handleClose}>
                      Close
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  )
}

export default InviteCard
