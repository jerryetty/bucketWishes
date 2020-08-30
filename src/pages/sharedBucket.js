import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { myFirebase } from 'utils/firebase'
import NotFound from 'components/images/404.svg'
import Topbar from 'components/ui/topbar'

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
        <Topbar hideHumberger />
        {currentBucket && (
          <div className='row content'>
            <div className='col-md-8'>
              <div className='col-12 mt-2'>
                <Typography variant='h4' className='w-7' color='primary'>
                  {currentBucket.title}
                </Typography>
              </div>
              <div className='col-12 mt-2'>
                <Typography
                  variant='body1'
                  className='w-5'
                  color='text-primary'
                >
                  {currentBucket.description}
                </Typography>
              </div>
              <div className='col-12 mt-2'>
                <Typography
                  variant='caption'
                  className='w-5'
                  color='text-primary'
                >
                  {`This bucket was created by ${currentBucket.authorName}, ${currentBucket.authorEmail}`}
                </Typography>
              </div>

              <div className='col-12 mt-5'>
                <Typography variant='h5' className='w-7' color='text-primary'>
                  Wishes
                </Typography>
                {wishes.map((wish) => (
                  <div className='wish p-3 mt-3 row' key={wish.id}>
                    <div className='col-12'>
                      <Typography
                        variant='body1'
                        color='text-primary'
                        className='w-5'
                      >
                        {wish.message}
                      </Typography>
                      <Typography variant='caption' color='primary'>
                        {wish.author}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-md-4'>
              <div className='col-12 mt-2'>
                <Typography variant='h5' className='w-7' color='primary'>
                  What is Bucket Wishes?
                </Typography>
              </div>
              <div className='col-12 mt-3'>
                <Typography
                  variant='body2'
                  color='text-primary'
                  className='w-5'
                >
                  BucketWishes is an app that lets you send loved ones beautiful
                  wishes in virtual containers(Buckets)
                </Typography>
                <br />
                <Typography
                  variant='body2'
                  color='text-primary'
                  className='w-5'
                >
                  Sign in to start sharing buckets today
                </Typography>
                <Link to='/'>
                  <button className='bw-button menu-button mt-5'>
                    Sign in
                  </button>
                </Link>
                <a
                  href='https://www.enwranch.org/contact-us.html'
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <button className='bw-button menu-button'>Contact Us</button>
                </a>
                <a
                  href='https://www.enwranch.com'
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <button className='bw-button menu-button'>
                    Visit our Website
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
        {!currentBucket && (
          <div className='not-found'>
            <img src={NotFound} alt='not found' />
            <Typography variant='h5' className='w-7'>
              Oops! We couldn't find that Bucket
            </Typography>
            <Link to='/'>
              <Typography variant='caption' className='w-5'>
                Back to Home page
              </Typography>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default SharedBucket
