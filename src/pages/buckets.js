import React, { useState, useEffect } from 'react'
import { myFirebase } from 'utils/firebase'
import { getUser } from 'components/auth'
import Bucket from 'components/ui/bucket'
import BucketOpen from 'components/ui/bucketOpen'
import InviteCard from 'components/ui/invite'
import SendBucketCard from 'components/ui/sendBucketCard'
import request from 'request'
import PopupAlert from 'components/ui/popupAlert'
import AddRecipient from 'components/ui/addRecipient'
import { Typography } from '@material-ui/core'

const Home = (props) => {
  const bucketDocRef = myFirebase.firestore().collection('buckets')
  const { displayName, uid, email } = getUser()
  
  const useDefaultBuckets = () => {
    const [defaultBuckets, setDefaultBuckets] = useState([])

    useEffect(() => {
      bucketDocRef
        .where('restricted', '==', true)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          (snapshot) => {
            const newBuckets = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            setDefaultBuckets(newBuckets)
          },
          (err) => {
            console.log(`Encountered error: ${err}`)
          }
        )
    }, [])
    return defaultBuckets
  }

  const useBuckets = () => {
    const [buckets, setBuckets] = useState([])

    // fetch all buckets inside useEffect
    useEffect(() => {
      bucketDocRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          (snapshot) => {
            const newBuckets = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            setBuckets(newBuckets)
          },
          (err) => {
            console.log(`Encountered error: ${err}`)
          }
        )
    }, [])

    return buckets
  }

  const buckets = useBuckets()
  const restrictedBuckets = useDefaultBuckets()

  const [openBucket, setOpenBucket] = useState(false)
  const [openInviteCard, setOpenInviteCard] = useState(false)
  const [openAddRecipientCard, setOpenAddRecipientCard] = useState(false)
  const [openSendBucketCard, setOpenSendBucketCard] = useState(false)
  const [activeBucket, setActiveBucket] = useState(null)
  const [openPreview, setOpenPreview] = useState(false)
  const [shared, setShared] = useState(0)
  const [previewData, setPreviewData] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleOpenBucket = () => {
    setOpenBucket(true)
  }

  const handleCloseBucket = () => {
    setOpenBucket(false)
  }

  const handleClosePreview = () => {
    setShared(0)
    setOpenPreview(false)
  }

  const handleOpenInviteCard = () => {
    setOpenInviteCard(true)
  }

  const handleCloseInviteCard = () => {
    setOpenInviteCard(false)
  }

  const handleOpenAddRecipientCard = () => {
    setOpenAddRecipientCard(true)
  }

  const handleCloseAddRecipientCard = () => {
    setOpenAddRecipientCard(false)
  }

  const handleOpenSendBucketCard = () => {
    setOpenSendBucketCard(true)
  }

  const handleCloseSendBucketCard = () => {
    setOpenSendBucketCard(false)
  }

  const handleOpenPreview = (data) => {
    setPreviewData(data)
    setOpenPreview(true)
  }

  const handleSetActiveBucket = (bucket) => {
    setActiveBucket(bucket)
  }

  const postData = async (data = previewData) => {
    var options = {
      method: 'POST',
      url: 'https://us-central1-bucket-wishes.cloudfunctions.net/sendEmail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        name: data.name,
        email: data.email,
        bucketUrl: data.bucketUrl,
        senderName: displayName
      }
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
      bucketDocRef.doc(activeBucket.id).update({
        sent: true
      })
      setShared(1)
    })
  }

  const handleShowAlert = () => {
    setShowAlert(true)
  }

  const handleSetAlertMessage = (message) => {
    setAlertMessage(message)
  }

  const handleHideAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  return (
    <>
      {/* <Dialog /> */}
      <div>
        {showAlert && (
          <PopupAlert
            open={showAlert}
            severity='error'
            handleHideAlert={handleHideAlert}
            message={alertMessage}
          />
        )}

        {openBucket && (
          <BucketOpen
            email={email}
            uid={uid}
            displayName={displayName}
            bucket={activeBucket}
            handleClose={handleCloseBucket}
            handleOpenInviteCard={handleOpenInviteCard}
            handleOpenSendBucketCard={handleOpenSendBucketCard}
            handleOpenAddRecipientCard={handleOpenAddRecipientCard}
            handleSetAlertMessage={handleSetAlertMessage}
            handleShowAlert={handleShowAlert}
            shared={shared}
          />
        )}
        {openPreview && (
          <BucketOpen
            preview={true}
            email={email}
            uid={uid}
            displayName={displayName}
            bucket={activeBucket}
            handleClose={handleClosePreview}
            shared={shared}
            setShared={setShared}
            submit={postData}
          />
        )}
        
        {openInviteCard && (
          <InviteCard
            email={email}
            uid={uid}
            displayName={displayName}
            id={activeBucket.id}
            bucket={activeBucket}
            handleClose={handleCloseInviteCard}
          />
        )}
        {openAddRecipientCard && (
          <AddRecipient
            email={email}
            uid={uid}
            displayName={displayName}
            id={activeBucket.id}
            handleClose={handleCloseAddRecipientCard}
            handleOpenInviteCard={handleOpenInviteCard}
          />
        )}
        {openSendBucketCard && (
          <SendBucketCard
            email={email}
            uid={uid}
            displayName={displayName}
            id={activeBucket.id}
            bucket={activeBucket}
            handleClose={handleCloseSendBucketCard}
            openPreview={openPreview}
            handleOpenPreview={handleOpenPreview}
          />
        )}

        {(buckets || restrictedBuckets) && (
          <div className='row mt-5' id='buckets-area'>
            <div className='col-12'>
              <Typography
                variant='h5'
                align='center'
                className='w-7 mb-3'
                color='primary'
              >
                Buckets created by users
              </Typography>
            </div>
            {buckets.map((bucket, count) => (
              <div
                className='col-lg-4 col-sm-6 col-md-6 text-center'
                key={count}
              >
                <Bucket
                  email={email}
                  uid={uid}
                  displayName={displayName}
                  blue={bucket.author === uid ? false : true}
                  regular
                  setActiveBucket={handleSetActiveBucket}
                  bucket={bucket}
                  handleOpenBucket={handleOpenBucket}
                  handleCloseBucket={handleCloseBucket}
                  handleOpenInviteCard={handleOpenInviteCard}
                  handleOpenSendBucketCard={handleOpenSendBucketCard}
                />
              </div>
            ))}
            <div className='col-12'>
              <Typography
                variant='h5'
                align='center'
                className='w-7 mb-3 mt-4'
                color='primary'
              >
                Buckets created by Admins
              </Typography>
            </div>
            {restrictedBuckets.map((bucket, count) => (
              <div
                className='col-lg-4 col-sm-6 col-md-6 text-center'
                key={count}
              >
                <Bucket
                  email={email}
                  uid={uid}
                  displayName={displayName}
                  restricted
                  setActiveBucket={handleSetActiveBucket}
                  bucket={bucket}
                  handleOpenBucket={handleOpenBucket}
                  handleCloseBucket={handleCloseBucket}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Home
