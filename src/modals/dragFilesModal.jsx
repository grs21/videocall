import React from 'react'
import FileUpload from '../component/fileUpload'
import { uploadFile } from '../service/api/apiService'
import { useDispatch, useSelector } from 'react-redux';
import { PLEASE_UPLOAD_FILE, FILE_EXTENSION, UNSUPPORTED_FILE_TYPE } from '../constant/constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSelectedFile, setIsDragging, setPreview } from '../stores/slices/fileSlice';

function DragFilesModal() {
  const { selectedFile, isDragging } = useSelector(state => state.files);
  const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
  const dispatch = useDispatch();

  const uploadFileHandle = async () => {
    if (selectedFile) {
      const identityNumber = callPrepareVideo.doctorPersonId;
      var formData = new FormData();
      formData.append('IdentityNumber', identityNumber);
      formData.append('App', 'MLPONLINE');
      formData.append('Type', 'Doctor');
      formData.append('File', selectedFile, selectedFile.name);
      const roomId = callPrepareVideo.getRoomId();
      const fromName = callPrepareVideo.getDoctorName();
      const fromId = callPrepareVideo.getDoctorId();
      const toId = callPrepareVideo.getPatientId();
      const toName = callPrepareVideo.getFullName();
      uploadFile(formData, roomId, fromName, fromId, toId, toName, selectedFile.name)
    } else {
      toast.info(PLEASE_UPLOAD_FILE);
    }
  }
  const handleCloseButton = (e) => {
    dispatch(setSelectedFile(null));
    dispatch(setPreview(null));
  }
  return (
    <div id="drag_files" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Drag and drop files upload</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseButton}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form id="js-upload-form">
              <FileUpload />
            </form>
            <div className="submit-section">
              <button className="btn btn-primary submit-btn" id="liveToastBtn" onClick={uploadFileHandle}>Submit</button>
            </div>
            <ToastContainer
              autoClose={1000}
              hideProgressBar
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DragFilesModal
