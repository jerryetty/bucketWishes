import React from 'react'
import { Link } from 'react-router-dom'
import { getUser } from 'components/auth'
import { Typography } from '@material-ui/core'
import YellowBucket from 'components/images/bucket.svg'
import BlueBucket from 'components/images/bucketBlue.svg'
import GreyBucket from 'components/images/bucketPink.svg'

const Help = (props) => {
  const { uid } = getUser()

  return (
    <>
      <div className='row mt-5 mb-5'>
        <div className='col-md-8'>
        <div className='row'>
        <div className='col-12 mt-5'>
          <Typography variant='h4' color='primary' align='left' className='w-5'>
            What the colors mean
          </Typography>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={YellowBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket'
              id='title'
            >
              Buckets you created.
            </Typography>
          </div>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={BlueBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket'
              id='title'
            >
              Buckets you were invited to, but did not create.
            </Typography>
          </div>
        </div>
        <div className='col-md-4 help-bucket'>
          <img src={GreyBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details text-center'>
            <Typography
              variant='body1'
              color='primary'
              className='w-5 home-bucket'
              id='title'
            >
              Buckets from the Admins at bucket wishes.
            </Typography>
          </div>
        </div>
      </div>
        </div>
        <div className='col-md-4'>
          <Typography
            variant='h4'
            color='secondary'
            align='left'
            className='w-5'
          >
            FAQ
          </Typography>
          <div className='mt-3'>
            <Typography
              variant='h6'
              color='secondary'
              align='left'
              className='w-5'
            >
              What is a bucket?
            </Typography>
            <Typography
              variant='body2'
              color='secondary'
              align='left'
              className=''
            >
              A bucket is a virtual container you create, fill with messages to
              a loved one and then send it to that person or group of people
            </Typography>
            <br />
            <Typography
              variant='h6'
              color='secondary'
              align='left'
              className='w-5'
            >
              What is a wish?
            </Typography>
            <Typography
              variant='body2'
              color='secondary'
              align='left'
              className=''
            >
              A wish is a message to a loved one that you place in a bucket.
            </Typography>
          </div>
          <hr />
          <button
            className='bw-button menu-button mt-5'
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
            <button className='bw-button menu-button'>Replay Tutorial</button>
          </Link>
          <a href='http://www.enwranch.org/'>
            <button className='bw-button menu-button'>Visit our Website</button>
          </a>
        </div>
      </div>
    </>
  )
}

export default Help
