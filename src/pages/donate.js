import React from 'react'
import { Typography } from '@material-ui/core'
import Gift from 'components/images/gift.svg'

const Donate = (props) => {
  return (
    <>
      <div className="row mt-5">
        <div className="col-md-5 donate-title">
          <Typography variant="h4" color="secondary" align="center" className="w-5">
            Donate to Bucket <br/> Wishes
          </Typography>
          <img src={Gift} alt="Donate"/>
        </div>
        <div className="col-md-7 donate-content">
          <Typography variant="body1" color="primary" align="justify">
          We are currently working to develop funds to launch Eagle’s Nest Wilderness Ranch. We need to purchase a ranch property and begin to build homes for our children. In addition, we are also in need of developing ongoing support to help us with the operational expenses necessary to care for the children. <br /><br /> This App was created as one way to help us develop the support that we will need to accomplish our mission. Please join with us as we seek to give children a second chance and provide the loving care and support that they so desperately need and desire. <br /><br /> Will you help us to accomplish our Mission of: Renewing Hope. Rebuilding Dreams. Restoring Futures. Impacting Generations, one life at a time. <br /><br /> If so, please click on the “Give Now” button below and help us change the future for a child!
          </Typography>
        </div>
      </div>
      <div className="row mt-5 mb-5 text-center">
        <div className="col-md-4">
          <div className="donate-card">
            <Typography variant="h6" color="primary" className="w-7">
              Join the Founding 500
            </Typography>
            <Typography variant="body1" color="secondary">
              Donate $100/month for 5 years.
            </Typography>
            <a href="https://www.enwranch.org/founding-500.html" target="blank">
              <button className="bw-button">
                Give Now
              </button>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="donate-card">
          <Typography variant="h6" color="primary" className="w-7">
              Donate a monthly Gift
            </Typography>
            <Typography variant="body1" color="secondary">
              Gifts of $10, $25, $50 or more given on a consistent monthly basis add up to a lot and will help make a difference in the lives of children.
            </Typography>
            <a href="https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch" target="blank">
              <button className="bw-button">
                Give Now
              </button>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="donate-card">
          <Typography variant="h6" color="primary" className="w-7">
              Donate a one-time Gift
            </Typography>
            <Typography variant="body1" color="secondary">
              Give any amount on a non-recurrent basis
            </Typography>
            <a href="https://donorbox.org/development-campaign-for-eagle-s-nest-wilderness-ranch" target="blank">
              <button className="bw-button">
                Give Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Donate
