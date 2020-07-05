import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ClickAwayListener, Typography } from "@material-ui/core"

const SendBucketCard = props => {
  const [sent, setSent] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("This field is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      bucketUrl: `#/bucket/${props.id}`,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      props.handleClose()
      props.handleOpenPreview(values)
      resetForm()
    },
  })

  return (
    <>
      <div className="row overlay">
        <div className="col-md-6 mx-auto">
          <ClickAwayListener onClickAway={props.handleClose}>
            <div className="create-bucket-card p-3 text-center">
              <form onSubmit={formik.handleSubmit}>
                <Typography variant="h6" color="primary" className="w-5">
                  Send this bucket to your loved ones
                </Typography>
                <Typography variant="body2" color="primary" className="mt-2">
                  Enter their name
                </Typography>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="mb-1 custom-font"
                    margin="dense"
                    fullWidth
                    onBlur={formik.handleBlur}
                    onFocus={props.handleFocus}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null
                    }
                  />
                </div>
                <Typography variant="body2" color="primary" className="mt-2">
                  Enter their email
                </Typography>
                <div className="mt-1">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="mb-1 custom-font"
                    margin="dense"
                    fullWidth
                    onBlur={formik.handleBlur}
                    onFocus={props.handleFocus}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                  />
                </div>
                <div className="mt-4">
                  {!sent && (
                    <button
                      className="bw-button"
                      type="submit"
                    >
                      Preview
                    </button>
                  )}
                </div>
              </form>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </>
  )
}

export default SendBucketCard
