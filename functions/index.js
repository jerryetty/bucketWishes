const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

exports.sendEmail = functions.https.onRequest((req, res) => {
  // Grab the email and bucketURL parameter.
  const email = req.body.email
  const name = req.body.name
  const bucketUrl = req.body.bucketUrl
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
      sender: 'BucketWishes',
      from: 'BucketWishes <no-reply@bucketwishes.app>', // sender address
      to: email, // list of receivers
      subject: `Welcome to BucketWishesTM! ${name}, you have received a Bucket of Wishes!`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
       <head> 
        <meta charset="UTF-8"> 
        <meta content="width=device-width, initial-scale=1" name="viewport"> 
        <meta name="x-apple-disable-message-reformatting"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="telephone=no" name="format-detection"> 
        <title>You received a new Bucket</title> 
        <!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--> 
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
        <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]--> 
        <style type="text/css">
      @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
      #outlook a {
        padding:0;
      }
      .ExternalClass {
        width:100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height:100%;
      }
      .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
      }
      </style> 
       </head> 
       <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
        <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
         <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f6f6f6"></v:fill>
            </v:background>
          <![endif]--> 
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
           <tr style="border-collapse:collapse"> 
            <td valign="top" style="padding:0;Margin:0"> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/sapphire-tech/image/upload/v1596360805/bucketWishes/BucketWishesEmailHeaderV2_yfli51.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Hi ${name},</p>
                            <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">I created a <a target="_blank" href="https://bucketwishes.app/${bucketUrl}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">bucket</a> for you and have asked others to join me in helping to fill it with special wishes.&nbsp; We hope you enjoy reading all of your wishes and that it makes your day as special as you are to each one of us!</p><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">${senderName}&nbsp;&nbsp;</p>
                            </td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">BucketWishes is a <strong>free </strong>app that enables us to:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p> 
                             <ul> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Create buckets</strong> for family, friends and those in other parts of the country and world to let them know we’re thinking about and honoring them.&nbsp;&nbsp;</p></li> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Invite others</strong> to add wishes by sending emails to them. Wishes may include such things as words of gratitude, encouragement and/or possibly sharing a special song, memory or scripture verse reflecting our thoughts relative to the purpose for which the bucket was sent.</p></li> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Send the bucket</strong> FULL of wishes to the one(s) to be honored.&nbsp;</p></li> 
                             </ul><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>P.S.</strong>&nbsp; To learn more about how to create your own Buckets for those you care about and/or would like to honor <a target="_blank" href='bucketwishes.app' style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">click here</a>.</p><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:17px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333"><strong>The Story Behind BucketWishes</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">It was called the “Best High School Prank Ever!”. A High School Senior went to her principle and gave him a five gallon bucket. She asked him to stand at a designated spot in the hall way at a specified time holding the bucket. The principle was very suspect of being set up for a Senior prank, but his curiosity got the best of him and he decided to do as she had asked. When the bell rang for changing classes, students began filing by and putting slips of paper into his bucket. When the next bell rang and the hall was empty, the principle had a bucket full of these slips of paper. He took the bucket back to his office and dumped the pieces of paper on his desk. He began reading the slips and read comments such as these: “Thank you for being there when my Dad passed away.” “Thank you for making our school a safe place.” “Thank you for encouraging me I was struggling with life issues.” ETC. The principle was so overwhelmed by the outpouring of support that he sat down and cried. He said that now he knows why he does the job that he does in working with young people in the school setting.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">As a result of this story, God gave us the idea of providing this opportunity for others to “create buckets” for their family, friends and those in other parts of the country and world that they’d like to encourage by letting them know how much they’re thought of, cared for and loved. We have provided ideas for buckets that you might like to create, but we’ve also given you the opportunity to create a “custom bucket” for things that may not fit into these categories. So we encourage you to “think outside of the bucket” and have FUN finding ways to encourage those around you!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:17px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333"><strong>Creators of BucketWishes</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Bucket Wishes is a service provided by Eagle’s Nest Wilderness Ranch (ENWR) which is a 501(c)3 non-profit, privately funded Christian ranch providing individual family style homes for children who have been orphaned, abused, abandoned, neglected or are homeless. We will be located on a working cattle and horse ranch in the beautiful mountains in Grand County, CO.<br><br>There, children who exhibit mild to moderate behavioral issues due to past family and environmental circumstances will find permanent, loving Christian homes. Every child possesses an inherent need to belong and be a part of a family who provides love, guidance and protection. Each home will be staffed by a couple who will serve as “Houseparents,” providing a stable, long-term family environment as opposed to short-term or revolving placement. Children will also have the opportunity to learn about compassion and responsibility while giving them a sense of purpose as they live on a working cattle and horse ranch and assist with ranch operations. Equine-assisted therapies, opportunities to participate in sports, recreational activities, music, art, 4-H, etc will all be offered providing fun experiences while also aiding in the healing process.<br><br>This is a new model of caring for children in Colorado. It is one based upon providing permanency with a life-long family and place to call home. We will serve as an alternative to Foster care by taking in children who will most likely never be able to return home due to the parents or guardians being unable to care for their children. This will help provide permanency and stability for these children rather than having to move them from home to home until they age out of the foster care system. It is our plan to raise the children who come to live with us to adulthood.<br><br>If you enjoyed your experience with BucketWishes, please consider going to the Donate Page in either the BucketWishes App or to Eagle’s Nest Wilderness Ranch’s website at: <a target="_blank" href="https://enwranch.org" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">enwranch.org</a> and making a donation to Eagle’s Nest Wilderness Ranch to help us change the world for a child by: Renewing Hope. Rebuilding Dreams. Restoring Futures. Impacting future Generations…one life at a time.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;display:none"><br></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/sapphire-tech/image/upload/v1596360804/bucketWishes/BucketWishesEmailFooterV2_pa9qkk.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
        </div>  
       </body>
      </html>`
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
  const recipientName = req.body.recipientName
  const collaboratorName = req.body.collaboratorName
  const inviteCode = req.body.inviteCode
  const bucketId = req.body.bucketId

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
      subject: "You've been invited to add wishes to a bucket", // Subject line
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
       <head> 
        <meta charset="UTF-8"> 
        <meta content="width=device-width, initial-scale=1" name="viewport"> 
        <meta name="x-apple-disable-message-reformatting"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="telephone=no" name="format-detection"> 
        <title>You received a new Bucket</title> 
        <!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--> 
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
        <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]--> 
        <style type="text/css">
      @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
      #outlook a {
        padding:0;
      }
      .ExternalClass {
        width:100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height:100%;
      }
      .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
      }
      </style> 
       </head> 
       <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
        <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
         <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f6f6f6"></v:fill>
            </v:background>
          <![endif]--> 
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
           <tr style="border-collapse:collapse"> 
            <td valign="top" style="padding:0;Margin:0"> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/sapphire-tech/image/upload/v1596360805/bucketWishes/BucketWishesEmailHeaderV2_yfli51.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Hi ${collaboratorName},</p>
                            <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Will you join me in writing a wish for <strong>${recipientName}</strong> and help me to fill their bucket with lots of wishes?  Let’s make sure <strong>${recipientName}</strong> knows how much they are thought of and cared about!</p>
                            <br>
                            <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">
                            Click on this <a target="_blank" href="https://bucketwishes.app/#/preview/${bucketId}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">bucket</a> to join in and share your wish! 
                            <br> Enter this code if prompted, to add a wish to this bucket <h2>
                            ${inviteCode} </h2>
                            <br>Thanks for participating!
                             <br><strong>
                             ${senderName}</strong></p>

                            </td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">BucketWishes is a <strong>free </strong>app that enables us to:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p> 
                             <ul> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Create buckets</strong> for family, friends and those in other parts of the country and world to let them know we’re thinking about and honoring them.&nbsp;&nbsp;</p></li> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Invite others</strong> to add wishes by sending emails to them. Wishes may include such things as words of gratitude, encouragement and/or possibly sharing a special song, memory or scripture verse reflecting our thoughts relative to the purpose for which the bucket was sent.</p></li> 
                              <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#333333"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Send the bucket</strong> FULL of wishes to the one(s) to be honored.&nbsp;</p></li> 
                             </ul><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>P.S.</strong>&nbsp; To learn more about how to create your own Buckets for those you care about and/or would like to honor <a target="_blank" href='https://bucketwishes.app' style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">click here</a>.</p><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:17px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333"><strong>The Story Behind BucketWishes</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">It was called the “Best High School Prank Ever!”. A High School Senior went to her principle and gave him a five gallon bucket. She asked him to stand at a designated spot in the hall way at a specified time holding the bucket. The principle was very suspect of being set up for a Senior prank, but his curiosity got the best of him and he decided to do as she had asked. When the bell rang for changing classes, students began filing by and putting slips of paper into his bucket. When the next bell rang and the hall was empty, the principle had a bucket full of these slips of paper. He took the bucket back to his office and dumped the pieces of paper on his desk. He began reading the slips and read comments such as these: “Thank you for being there when my Dad passed away.” “Thank you for making our school a safe place.” “Thank you for encouraging me I was struggling with life issues.” ETC. The principle was so overwhelmed by the outpouring of support that he sat down and cried. He said that now he knows why he does the job that he does in working with young people in the school setting.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">As a result of this story, God gave us the idea of providing this opportunity for others to “create buckets” for their family, friends and those in other parts of the country and world that they’d like to encourage by letting them know how much they’re thought of, cared for and loved. We have provided ideas for buckets that you might like to create, but we’ve also given you the opportunity to create a “custom bucket” for things that may not fit into these categories. So we encourage you to “think outside of the bucket” and have FUN finding ways to encourage those around you!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:17px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:26px;color:#333333"><strong>Creators of BucketWishes</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">Bucket Wishes is a service provided by Eagle’s Nest Wilderness Ranch (ENWR) which is a 501(c)3 non-profit, privately funded Christian ranch providing individual family style homes for children who have been orphaned, abused, abandoned, neglected or are homeless. We will be located on a working cattle and horse ranch in the beautiful mountains in Grand County, CO.<br><br>There, children who exhibit mild to moderate behavioral issues due to past family and environmental circumstances will find permanent, loving Christian homes. Every child possesses an inherent need to belong and be a part of a family who provides love, guidance and protection. Each home will be staffed by a couple who will serve as “Houseparents,” providing a stable, long-term family environment as opposed to short-term or revolving placement. Children will also have the opportunity to learn about compassion and responsibility while giving them a sense of purpose as they live on a working cattle and horse ranch and assist with ranch operations. Equine-assisted therapies, opportunities to participate in sports, recreational activities, music, art, 4-H, etc will all be offered providing fun experiences while also aiding in the healing process.<br><br>This is a new model of caring for children in Colorado. It is one based upon providing permanency with a life-long family and place to call home. We will serve as an alternative to Foster care by taking in children who will most likely never be able to return home due to the parents or guardians being unable to care for their children. This will help provide permanency and stability for these children rather than having to move them from home to home until they age out of the foster care system. It is our plan to raise the children who come to live with us to adulthood.<br><br>If you enjoyed your experience with BucketWishes, please consider going to the Donate Page in either the BucketWishes App or to Eagle’s Nest Wilderness Ranch’s website at: <a target="_blank" href="https://enwranch.org" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543">enwranch.org</a> and making a donation to Eagle’s Nest Wilderness Ranch to help us change the world for a child by: Renewing Hope. Rebuilding Dreams. Restoring Futures. Impacting future Generations…one life at a time.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;display:none"><br></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/sapphire-tech/image/upload/v1596360804/bucketWishes/BucketWishesEmailFooterV2_pa9qkk.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
        </div>  
       </body>
      </html>`
    
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return res.json()
  }

  main().catch(console.error)
})
