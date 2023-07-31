import React from 'react'
import 'lightbox.js-react/dist/index.css'
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css';
import { useSelector } from 'react-redux';

function ShareFileModal() {
  const { shareImgURL } = useSelector(state => state.modal);
  var img = shareImgURL[0]['src'];


  return (
    <div id="share_files" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <SlideshowLightbox
            showThumbnails={true}
            images={
              [
                {
                  src: img,
                  loaded: false,
                },
              ]
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ShareFileModal
