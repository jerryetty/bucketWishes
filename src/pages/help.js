import React from 'react'
import { Typography } from '@material-ui/core'
import YellowBucket from 'components/images/bucket.svg'
import BlueBucket from 'components/images/bucketBlue.svg'
import GreyBucket from 'components/images/bucketPink.svg'
import Header from 'components/ui/header'

const Help = (props) => {
  return (
    <>
      <div className='row mt-5 mb-5'>
        <div className='col-md-8'>
          <Typography
            variant='h4'
            color='secondary'
            align='left'
            className='w-5'
          >
            How to use Bucket Wishes
          </Typography>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              marginTop: '20px',
              marginBottom: '20px'
            }}
          >
            <iframe
              title='video'
              src='https://www.loom.com/embed/8d3add1493a2452690a6a7d5bb4a1820'
              frameBorder={0}
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '500px'
              }}
            />
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
              // props.handleClose()
              // props.setOpenPreview(true)
            }}
          >
            Replay Tutorial
          </button>
          <button
            className='bw-button menu-button'
            onClick={() => {
              // props.handleClose()
              // props.setOpenPreview(true)
            }}
          >
            Contact Us
          </button>
          <button
            className='bw-button menu-button'
            onClick={() => {
              // props.handleClose()
              // props.setOpenPreview(true)
            }}
          >
            Visit our Website
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-5'>
          <Typography variant='h4' color='primary' align='left' className='w-5'>
            What the colors mean
          </Typography>
        </div>
        <div className='col-md-4'>
          <img src={YellowBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details'>
            <Typography
              align='center'
              variant='body1'
              color='primary'
              className='w-5'
              id='title'
            >
              Buckets you created.
            </Typography>
          </div>
        </div>
        <div className='col-md-4'>
          <img src={BlueBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details'>
            <Typography
              align='center'
              variant='body1'
              color='primary'
              className='w-5'
              id='title'
            >
              Buckets you were invited to, but did not create.
            </Typography>
          </div>
        </div>
        <div className='col-md-4'>
          <img src={GreyBucket} alt='bucket' className='bucket-image' />
          <div className='bucket-details'>
            <Typography
              align='center'
              variant='body1'
              color='primary'
              className='w-5'
              id='title'
            >
              Buckets from the Admins at bucket wishes. These contain messages
              and notifications.
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default Help
