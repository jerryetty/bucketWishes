import React from "react"
import { IconButton, Typography, Tooltip } from "@material-ui/core"
import {
  PersonAdd as PersonAddIcon,
  Send as SendIcon,
  Help as HelpIcon,
} from "@material-ui/icons"
import YellowBucket from "components/images/bucket.svg"
import BlueBucket from "components/images/bucketBlue.svg"
import GreyBucket from "components/images/bucketPink.svg"

const Bucket = props => {
  
  return (
    <>
      {props.regular && (
        <div className="single-bucket-container">
          <img src={props.blue ? BlueBucket : YellowBucket} alt="bucket" className="bucket-image" />
          <div className="bucket-details">
            <Typography
              variant="body1"
              color="primary"
              className="w-7"
              id="title"
            >
              {props.bucket.title}
            </Typography>
            <button
              className="bw-button mt-3"
              onClick={() => {
                props.setActiveBucket(props.bucket)
                props.handleOpenBucket()
              }}
            >
              Open
            </button>
            <div className="mt-3">
              <Tooltip
                title="Invite friends and family to this bucket"
                aria-label="Add collaborators"
              >
                <span>
                  <IconButton
                    onClick={() => {
                      props.setActiveBucket(props.bucket)
                      props.handleOpenInviteCard()
                    }}
                    id="invite-someone"
                    color="primary"
                    aria-label="add collaborators"
                    size="small"
                    disableFocusRipple
                  >
                    <PersonAddIcon />
                  </IconButton>
                </span>
              </Tooltip>
              
              <Tooltip title="Send this bucket" aria-label="share">
                <span>
                  <IconButton
                    onClick={() => {
                      props.setActiveBucket(props.bucket)
                      props.handleOpenSendBucketCard()
                    }}
                    id="send-bucket"
                    color="primary"
                    aria-label="send"
                    size="small"
                    disableFocusRipple
                  >
                    <SendIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      {props.restricted && (
        <div className="single-bucket-container">
          <img src={GreyBucket} alt="bucket" className="bucket-image" />
          <div className="bucket-details">
            <Typography
              variant="body1"
              color="primary"
              className="w-7"
              id="title"
            >
              {props.bucket.title}
            </Typography>
            <button
              className="bw-button mt-3"
              onClick={() => {
                props.setActiveBucket(props.bucket)
                props.handleOpenBucket()
              }}
            >
              Open
            </button>
            <div className="mt-3">
              <Tooltip
                title="Learn More"
                aria-label="Learn More"
              >
                <span>
                  <IconButton
                    id="add-collaborator"
                    color="primary"
                    aria-label="add collaborators"
                    size="small"
                    disableFocusRipple
                  >
                    <HelpIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      {props.pending && (
        <div className="single-bucket-container">
          <img src={GreyBucket} alt="bucket" className="bucket-image" />
          <div className="bucket-details">
            <Typography
              variant="body1"
              color="primary"
              className="w-7"
              id="title"
            >
              {props.bucket.title}
            </Typography>
            <button
              className="bw-button mt-1"
              onClick={() => {
                props.setActiveBucket(props.bucket)
                props.handleAcceptBucket(props.bucket.id)
              }}
            >
              Accept
            </button>
            <button
              className="bw-button mt-1"
              onClick={() => {
                props.setActiveBucket(props.bucket)
                props.handleRejectBucket(props.bucket.id)
              }}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Bucket
