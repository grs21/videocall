import React, { useEffect } from 'react'
import 'lightbox.js-react/dist/index.css'
import { SlideshowLightbox, initLightboxJS, Image } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setImageModalState } from '../stores/slices/imageShareSlice';

function ShareFileModal() {
  const { shareImgURL, imageModalState } = useSelector(state => state.modal);
  const dispatch = useDispatch();
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
