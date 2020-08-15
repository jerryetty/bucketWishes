import React from 'react'

const Dialog = () => {
  return (
    <div id='myModal' className='bw-dialog'>
      {/* Modal content */}
      <div className='bw-dialog-content'>
        <div className='bw-dialog-header'>
          <span className='bw-dialog-close'>×</span>
          <h2>Modal Header</h2>
        </div>
        <div className='bw-dialog-body'>
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </div>
        <div className='bw-dialog-footer'>
          <h3>Modal Footer</h3>
        </div>
      </div>
    </div>
  )
}

export default Dialog
