import React from 'react'

function shareFileModal() {
  return (
    <div id="share_files" className="modal custom-modal fade" role="dialog">
    <div className="modal-dialog modal-dialog-centered modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Share File</h5>
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="files-share-list">
            <div className="files-cont">
              <div className="file-type">
                <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
              </div>
              <div className="files-info">
                <span className="file-name text-ellipsis">AHA Selfcare Mobile Application Test-Cases.xls</span>
                <span className="file-author"><a href="#">Bernardo Galaviz</a></span> <span className="file-date">May 31st at 6:53 PM</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Share With</label>
            <input className="form-control" type="text" />
          </div>
          <div className="submit-section">
            <button className="btn btn-primary submit-btn">Share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default shareFileModal
