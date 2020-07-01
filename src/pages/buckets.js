import React, { useState, useEffect } from 'react'
import { myFirebase } from 'utils/firebase'
import { getUser } from 'components/auth'
import Bucket from 'components/ui/bucket'
import BucketOpen from 'components/ui/bucketOpen'
import AddBucketCard from 'components/ui/addBucketCard'
import InviteCard from 'components/ui/invite'
import SendBucketCard from 'components/ui/sendBucketCard'
import request from 'request'
import Header from 'components/ui/header'
import { Typography } from '@material-ui/core'

const Buckets = (props) => {
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
        .where('restricted', '==', false)
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
  const [openCreateBucket, setOpenCreateBucket] = useState(false)
  const [openInviteCard, setOpenInviteCard] = useState(false)
  const [openSendBucketCard, setOpenSendBucketCard] = useState(false)
  const [activeBucket, setActiveBucket] = useState(null)
  const [openPreview, setOpenPreview] = useState(false)
  const [shared, setShared] = useState(false)
  const [previewData, setPreviewData] = useState({})

  const handleOpenBucket = () => {
    setOpenBucket(true)
  }

  const handleClosePreview = () => {
    setShared(false)
    setOpenPreview(false)
  }

  const handleCloseBucket = () => {
    setOpenBucket(false)
  }

  const handleCloseCreateBucket = () => {
    setOpenCreateBucket(false)
  }

  const handleOpenInviteCard = () => {
    setOpenInviteCard(true)
  }

  const handleCloseInviteCard = () => {
    setOpenInviteCard(false)
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
        bucketUrl: data.bucketUrl
      }
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
      setShared(true)
    })
  }

  return (
    <>
      <div>
        {openBucket && (
          <BucketOpen
            email={email}
            uid={uid}
            displayName={displayName}
            bucket={activeBucket}
            handleClose={handleCloseBucket}
            handleOpenInviteCard={handleOpenInviteCard}
            handleOpenSendBucketCard={handleOpenSendBucketCard}
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
        {openCreateBucket && (
          <AddBucketCard
            email={email}
            uid={uid}
            displayName={displayName}
            handleClose={handleCloseCreateBucket}
          />
        )}
        {openInviteCard && (
          <InviteCard
            email={email}
            uid={uid}
            displayName={displayName}
            id={activeBucket.id}
            handleClose={handleCloseInviteCard}
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
          <div className='row mt-5'>
            <div className='col-12'>
              <Typography
                variant='h5'
                align='center'
                className='w-7 mb-3'
                color='primary'
              >
                User Buckets
              </Typography>
            </div>
            {buckets.map((bucket, count) => (
              <div className='col-md-3 text-center' key={count}>
                <Bucket
                  email={email}
                  uid={uid}
                  displayName={displayName}
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
                className='w-7 mb-3 mt-3'
                color='primary'
              >
                Admin Buckets
              </Typography>
            </div>
            {restrictedBuckets.map((bucket, count) => (
              <div className='col-md-3 text-center' key={count}>
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

export default Buckets
