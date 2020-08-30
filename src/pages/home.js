import React, { useState, useEffect } from 'react'
import { myFirebase } from 'utils/firebase'
import firebase from 'firebase'
import QueryString from 'query-string'
import { getUser } from 'components/auth'
import Bucket from 'components/ui/bucket'
import BucketOpen from 'components/ui/bucketOpen'
import AddBucketCard from 'components/ui/addBucketCard'
import InviteCard from 'components/ui/invite'
import SendBucketCard from 'components/ui/sendBucketCard'
import request from 'request'
import Tour from 'reactour'
import PopupAlert from 'components/ui/popupAlert'
import AddRecipient from 'components/ui/addRecipient'

const Home = (props) => {
  const bucketDocRef = myFirebase.firestore().collection('buckets')
  const { displayName, uid, email } = getUser()

  const cookie = localStorage.getItem(uid)

  const checkFirstTimeUser = () => {
    if (cookie) {
      return false
    } else {
      localStorage.setItem(uid, true)
      return true
    }
  }

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
        .where('collaborators.verified', 'array-contains', email)
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

  const usePendingBuckets = () => {
    const [buckets, setBuckets] = useState([])

    // fetch all buckets inside useEffect
    useEffect(() => {
      bucketDocRef
        .where('collaborators.pending', 'array-contains', email)
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

  const useBucket = (bucketId) => {
    const [currentBucket, setCurrentBucket] = useState({})
    useEffect(() => {
      if (bucketId && bucketId !== undefined) {
        bucketDocRef
          .doc(bucketId)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              // setLoading(0)
              setCurrentBucket(null)
              console.log('No such document!')
            } else {
              // setLoading(1)
              setCurrentBucket({
                ...doc.data(),
                id: doc.id
              })
            }
          })
          .catch((err) => {
            console.log('Error getting document', err)
          })
      } else {
        console.log('We didnt see a bucket id')
      }
    }, [bucketId])
    return currentBucket
  }

  const buckets = useBuckets()
  const restrictedBuckets = useDefaultBuckets()
  const pendingBuckets = usePendingBuckets()

  const [openBucket, setOpenBucket] = useState(false)
  const [openCreateBucket, setOpenCreateBucket] = useState(false)
  const [openInviteCard, setOpenInviteCard] = useState(false)
  const [openAddRecipientCard, setOpenAddRecipientCard] = useState(false)
  const [openSendBucketCard, setOpenSendBucketCard] = useState(false)
  const [activeBucket, setActiveBucket] = useState(null)
  const [openPreview, setOpenPreview] = useState(false)
  const [shared, setShared] = useState(0)
  const [openTour, setOpenTour] = useState(checkFirstTimeUser())
  const [previewData, setPreviewData] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleOpenBucket = () => {
    setOpenBucket(true)
  }

  const handleDeleteBucket = (id) => {
    bucketDocRef.doc(id).delete()
  }

  const handleCloseBucket = () => {
    setOpenBucket(false)
  }

  const handleClosePreview = () => {
    setShared(0)
    setOpenPreview(false)
  }

  const handleOpenCreateBucket = () => {
    setOpenCreateBucket(true)
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

  const handleOpenAddRecipientCard = () => {
    setOpenAddRecipientCard(true)
  }

  const handleCloseAddRecipientCard = () => {
    setOpenAddRecipientCard(false)
  }

  const handleOpenSendBucketCard = () => {
    setOpenSendBucketCard(true)
  }

  const handleCloseTour = () => {
    setOpenTour(false)
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

  const handleAcceptBucket = (id) => {
    const FieldValue = firebase.firestore.FieldValue
    bucketDocRef.doc(id).update({
      'collaborators.pending': FieldValue.arrayRemove(email),
      'collaborators.verified': FieldValue.arrayUnion(email)
    })
  }

  const handleRejectBucket = (id) => {
    const FieldValue = firebase.firestore.FieldValue
    bucketDocRef.doc(id).update({
      'collaborators.pending': FieldValue.arrayRemove(email)
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

  let queryBucketId

  if (props.location.search) {
    const queryValues = QueryString.parse(props.location.search)
    queryBucketId = queryValues.bucket
  } else {
    queryBucketId = null
  }

  // console.log(queryBucketId)
  const bucket = useBucket(queryBucketId)

  useEffect(() => {
    if (queryBucketId && queryBucketId !== 'undefined') {
        handleSetActiveBucket({...bucket, id: queryBucketId})
        handleOpenBucket()
    }
  }, [bucket, queryBucketId])

  const steps = [
    {
      selector: '#brand',
      content:
        "Welcome to bucket wishes. Here's a quick tutorial to get you started"
    },
    {
      selector: '#create-bucket',
      content: 'Click here to create your first bucket'
    },
    {
      selector: '#buckets-area',
      content:
        'The buckets you create will be shown here. Click any of them to open'
    },
    {
      selector: '#send-bucket',
      content:
        'Send a bucket full of wishes to someone. TIP: Try to send buckets after filling them with wishes'
    },
    {
      selector: '#invite-someone',
      content: 'Invite someone to add wishes to a bucket'
    },
    {
      selector: '#appbar-menu',
      content: 'Click here to open the navigation menu'
    },
    {
      selector: '#appbar-menu',
      content:
        'You can always re-run this tutorial from the help section by clicking here'
    }
  ]

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
            {...props}
            email={email}
            uid={uid}
            displayName={displayName}
            bucket={activeBucket}
            handleClose={handleCloseBucket}
            handleOpenInviteCard={handleOpenInviteCard}
            handleOpenSendBucketCard={handleOpenSendBucketCard}
            handleOpenAddRecipientCard={handleOpenAddRecipientCard}
            handleSetAlertMessage={handleSetAlertMessage}
            handleSetActiveBucket={handleSetActiveBucket}
            handleShowAlert={handleShowAlert}
            handleDeleteBucket={handleDeleteBucket}
            useBucket={useBucket}
            shared={shared}
            handleAcceptBucket={handleAcceptBucket}
            handleRejectBucket={handleRejectBucket}
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
            handleOpenInviteCard={handleOpenInviteCard}
            handleOpenAddRecipientCard={handleOpenAddRecipientCard}
            handleSetActiveBucket={handleSetActiveBucket}
            useBucket={useBucket}
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
            bucket={activeBucket}
            handleClose={handleCloseAddRecipientCard}
            handleSetActiveBucket={handleSetActiveBucket}
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
        {openTour && (
          <Tour
            steps={steps}
            isOpen={openTour}
            onRequestClose={() => {
              handleCloseTour()
            }}
          />
        )}
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <input type='hidden' id='hiddenComponent' />
            <input
              type='text'
              className='create-bucket-prompt'
              placeholder='Create a bucket...'
              id='create-bucket'
              onClick={handleOpenCreateBucket}
            />
          </div>
        </div>

        {(buckets || restrictedBuckets || pendingBuckets) && (
          <div className='row mt-5' id='buckets-area'>
            {pendingBuckets.map((bucket, count) => (
              <div
                className='col-lg-4 col-md-6 col-sm-6  text-center'
                key={count}
              >
                <Bucket
                  email={email}
                  uid={uid}
                  displayName={displayName}
                  blue={bucket.author === uid ? false : true}
                  pending
                  bucket={bucket}
                  setActiveBucket={handleSetActiveBucket}
                  handleOpenBucket={handleOpenBucket}
                  handleCloseBucket={handleCloseBucket}
                  handleOpenInviteCard={handleOpenInviteCard}
                  handleOpenSendBucketCard={handleOpenSendBucketCard}
                  handleAcceptBucket={handleAcceptBucket}
                  handleRejectBucket={handleRejectBucket}
                />
              </div>
            ))}
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
