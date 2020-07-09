const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

exports.sendEmail = functions.https.onRequest((req, res) => {
  // Grab the email and bucketURL parameter.
  const email = req.body.email
  const name = req.body.name
  const bucketUrl = req.body.bucketUrl

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'no-reply@bucketwishes.app',
        pass: 'bucketwishes1'
      }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'no-reply@bucketwishes.app', // sender address
      to: email, // list of receivers
      subject: 'You received a bucket ✔', // Subject line
      html: `Hello ${name}, <br /> You received a bucket. open <a href='bucketwishes.app/${bucketUrl}'>this link</a> to check it out`
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return res.json()
  }

  main().catch(console.error)
})

exports.sendCollaboratorInvite = functions.https.onRequest((req, res) => {
  // Grab the email and bucketURL parameter.
  const email = req.body.email
  const senderName = req.body.senderName

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'no-reply@bucketwishes.app',
        pass: 'bucketwishes1'
      }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'no-reply@bucketwishes.app', // sender address
      to: email, // list of receivers
      subject: 'You\'ve been invited to add wishes to a bucket', // Subject line
      html: `Hey, <br /> ${senderName} created a bucket and wants you to add wishes to it. Visit <a href='bucketwishes.app'> Bucket Wishes </a> to view it'`
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return res.json()
  }

  main().catch(console.error)
})
