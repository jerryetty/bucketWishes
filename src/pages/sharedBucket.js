import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { myFirebase } from 'utils/firebase'
import NotFound from 'components/images/404.svg'

const SharedBucket = (props) => {
  console.log(props)
  const bucket = props.match.params.id
  const bucketDocRef = myFirebase.firestore().collection('buckets')

  const useBucket = () => {
    const [currentBucket, setCurrentBucket] = useState([])
    useEffect(() => {
      bucketDocRef
        .doc(bucket)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            // setLoading(0)
            setCurrentBucket(null)
            console.log('No such document!')
          } else {
            // setLoading(1)
            setCurrentBucket(doc.data())
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }, [])
    return currentBucket
  }

  const useWishes = () => {
    const [wishes, setWishes] = useState([])

    useEffect(() => {
      bucketDocRef
        .doc(bucket)
        .collection('wishes')
        .onSnapshot(
          (snapshot) => {
            const newWishes = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))

            setWishes(newWishes)
          },
          (err) => {
            console.log(`Encountered error: ${err}`)
          }
        )
    }, [])
    return wishes
  }

  const currentBucket = useBucket()
  const wishes = useWishes()

  return (
    <>
      <div className='container'>
        {currentBucket && (
          <div className='row'>
            <div className='col-md-8'>
              <div className='col-12 mt-5'>
                <Typography variant='h4' className='w-5' color='primary'>
                  {currentBucket.title}
                </Typography>
              </div>
              <div className='col-12 mt-2'>
                <Typography variant='body1' color='secondary'>
                  {currentBucket.description}
                </Typography>
              </div>
              <div className='col-12 mt-2'>
                <Typography variant='caption' color='secondary'>
                  {`This bucket was created by ${currentBucket.authorName}, ${currentBucket.authorEmail}`}
                </Typography>
              </div>

              <div className='col-12 mt-5'>
                <Typography variant='h5' color='secondary'>
                  Wishes
                </Typography>
                {wishes.map((wish) => (
                  <div className='wish p-3 mt-3 row' key={wish.id}>
                    <div className='col-12'>
                      <Typography
                        variant='body1'
                        color='primary'
                        className='w-5'
                      >
                        {wish.message}
                      </Typography>
                      <Typography variant='body2' color='secondary'>
                        {wish.author}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-md-4'>
              <div className='col-12 mt-5'>
                <Typography variant='h5' className='w-5' color='primary'>
                  What is Bucket Wishes?
                </Typography>
              </div>
              <div className='col-12 mt-3'>
                <Typography variant='body2' color='secondary'>
                  It is an app that lets you send loved ones beautiful wishes in
                  virtual containers(Buckets)
                </Typography>
                <br />
                <Typography variant='body2' color='secondary'>
                  Create an account to start sharing buckets today
                </Typography>
                <Link to='/'>
                  <button className='bw-button menu-button mt-5'>
                    Create an account
                  </button>
                </Link>
                <Link to='/'>
                  <button className='bw-button menu-button'>Contact Us</button>
                </Link>
                <Link to='/'>
                  <button className='bw-button menu-button'>
                    Visit our Website
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {!currentBucket && (
          <div className='not-found'>
            <img src={NotFound} alt="not found" />
            <Typography variant='h5'>
              Oops! We couldn't find that Bucket
            </Typography>
            <Link to='/'>
              <Typography variant='caption'>Back to Home page</Typography>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default SharedBucket
