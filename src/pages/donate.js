import React from 'react'
import { Typography } from '@material-ui/core'
import Gift from 'components/images/gift.svg'

const Donate = (props) => {
  return (
    <>
      <div className='row mt-5'>
        <div className='col-md-5 donate-title'>
          <Typography
            variant='h4'
            color='primary'
            align='center'
            className='w-7'
          >
            Donate to Bucket <br /> Wishes
          </Typography>
          <img src={Gift} alt='Donate' />
        </div>
        <div className='col-md-7 donate-content'>
          <Typography variant='body1' color='textPrimary' align='justify'>
            We are currently working to develop funds to launch Eagle’s Nest
            Wilderness Ranch. We need to purchase a ranch property and begin to
            build homes for our children. In addition, we are also in need of
            developing ongoing support to help us with the operational expenses
            necessary to care for the children. <br />
            <br /> This App was created as one way to help us develop the
            support that we will need to accomplish our mission. Please join
            with us as we seek to give children a second chance and provide the
            loving care and support that they so desperately need and desire.{' '}
            <br />
            <br /> Will you help us to accomplish our Mission of: Renewing Hope.
            Rebuilding Dreams. Restoring Futures. Impacting Generations, one
            life at a time. <br />
            <br /> If so, please click on the “Give Now” button below and help
            us change the future for a child!
          </Typography>
        </div>
      </div>
      <div className='row mt-5 mb-5'>
        <div className='col-md-7'>
          <div className='donate-card'>
            <Typography variant='body1' color='primary' className='w-7'>
              Join the Founding 500
            </Typography>
            <Typography variant='caption' color='textPrimary'>
              500 individuals, organizations, businesses or churches who will
              make a five year commitment to give $1,200 per year ($100/month).
              As a “Founding 500 Member” your name will forever be listed as a
              part of ENWR’s History in the Main Office as well as in the
              “Founding 500 Home” (A home that will be built with a percentage
              of each gift given and honoring all those who have joined.)
            </Typography>
            <a href='https://www.enwranch.org/founding-500.html' target='blank'>
              <button className='bw-button'>Give Now</button>
            </a>
          </div>
        </div>
        <div className='col-md-5'>
          <div className='donate-card'>
            <Typography variant='body1' color='primary' className='w-7'>
              Donate a monthly Gift
            </Typography>
            <Typography variant='caption' color='textPrimary'>
              Gifts of $10, $25, $50 or more given on a consistent monthly basis
              add up to a lot and will help make a difference in the lives of
              children.
            </Typography>
            <a
              href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
              target='blank'
            >
              <button className='bw-button'>Give Now</button>
            </a>
          </div>
        </div>
        <div className='col-md-5'>
          <div className='donate-card'>
            <Typography variant='body1' color='primary' className='w-7'>
              Donate a one-time Gift
            </Typography>
            <Typography variant='caption' color='textPrimary'>
              A gift of any amount is very helpful and will help us in caring
              for the children at ENWR.
            </Typography>
            <a
              href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
              target='blank'
            >
              <button className='bw-button'>Give Now</button>
            </a>
          </div>
        </div>
        <div className='col-md-7'>
          <div className='donate-card'>
            <Typography variant='body1' color='primary' className='w-7'>
              Send a Note of Encouragement to a child at Eagle’s Nest Wilderness
              Ranch
            </Typography>
            <Typography variant='caption' color='textPrimary'>
              A gift of any amount is very helpful and will help us in caring
              for the children at ENWR.
            </Typography>
            <a
              href='https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch'
              target='blank'
            >
              <button className='bw-button'>Give Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Donate
