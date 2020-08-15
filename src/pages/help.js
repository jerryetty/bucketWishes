import React from 'react'
import { Link } from 'react-router-dom'
import { getUser } from 'components/auth'
import { Typography } from '@material-ui/core'
import YellowBucket from 'components/images/bucket.png'
import BlueBucket from 'components/images/bucketBlue.png'
import GreyBucket from 'components/images/bucketGrey.png'

const Help = (props) => {
  const { uid } = getUser()

  return (
    <>
      <div className='row mt-5 mb-5 content'>
        <div className='col-md-8'>
        <div className='row'>
        <div className='col-12'>
          <Typography variant='h4' color='primary' align='left' className='w-7'>
            What the colors mean
          </Typography>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={YellowBucket} alt='bucket' className='bucket-image' />
          <div className='help-bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket text-white'
              id='title'
            >
              Buckets you <br/> created
            </Typography>
          </div>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={BlueBucket} alt='bucket' className='bucket-image' />
          <div className='help-bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket text-white'
              id='title'
            >
              Buckets you were <br/> invited to, but did not create
            </Typography>
          </div>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={GreyBucket} alt='bucket' className='bucket-image' />
          <div className='help-bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket text-white'
              id='title'
            >
              Buckets from <br/> the Admins at BucketWishes
            </Typography>
          </div>
        </div>
      </div>
        </div>
        <div className='col-md-4'>
          <Typography
            variant='h4'
            color='primary'
            align='left'
            className='w-7'
          >
            FAQ
          </Typography>
          <div className='mt-3'>
            <Typography
              variant='h6'
              color='primary'
              align='left'
              className='w-5'
            >
              What is a bucket?
            </Typography>
            <Typography
              variant='body2'
              color='textPrimary'
              align='left'
              className=''
            >
              A bucket is a virtual container you create, fill with messages to
              a loved one and then send it to that person or group of people
            </Typography>
            <br />
            <Typography
              variant='h6'
              color='primary'
              align='left'
              className='w-5'
            >
              What is a wish?
            </Typography>
            <Typography
              variant='body2'
              color='textPrimary'
              align='left'
              className=''
            >
              A wish is a message to a loved one that you place in a bucket.
            </Typography>
          </div>
          <button
            className='help-button menu-button mt-2' style={{backgroundColor: '#fbe29c'}}
            onClick={() => {
              localStorage.removeItem(uid)
            }}
          >
            Contact Us
          </button>
          <Link
            to='/'
            onClick={() => {
              localStorage.removeItem(uid)
            }}
          >
            <button className='help-button menu-button' style={{backgroundColor: '#fbe29c'}}>Replay Tutorial</button>
          </Link>
          <a href='http://www.enwranch.org/'>
            <button className='help-button menu-button' style={{backgroundColor: '#fbe29c'}}>Visit our Website</button>
          </a>
        </div>
      </div>
      
    </>
  )
}

export default Help
