import React from 'react'
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile, setIsDragging, setPreview } from '../stores/slices/fileSlice';
import { FILE_EXTENSION, UNSUPPORTED_FILE_TYPE } from '../constant/constant';
import { toast } from 'react-toastify';

function FileUpload() {
    const { selectedFile, isDragging, preview } = useSelector(state => state.files);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const fileName = selectedFile?.name;
    var fileExtension = '';
    const handleFileUpload = () => {
        //fileInputRef.current.value = null;
        if (selectedFile) {
            // Dosya yükleme işlemlerini burada gerçekleştirin
            console.log('Yüklenen dosya:', selectedFile);
        }
        if (!isDragging) {
            // Dosya seçme işlemlerini burada gerçekleştirin
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        dispatch(setIsDragging(true));
        console.log('handleDragOver');
    };

    const handleDragLeave = () => {
        dispatch(setIsDragging(false));
        console.log('handleDragLeave');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file)
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
    };
    const setFile = (file) => {
        dispatch(setIsDragging(false));
        if (file !== undefined) {
            console.log(file, 'tıklandı');
            fileExtension = file.name.split('.').pop();
            const isImage = fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg'
            if (isImage) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Image = reader.result;
                    dispatch(setPreview(base64Image));
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
            }
            if (FILE_EXTENSION.includes(fileExtension)) {
                dispatch(setSelectedFile(file));
                // Dosya seçicisini sıfırla
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.info(UNSUPPORTED_FILE_TYPE);
            }
        }
    }

    return (
        <div className={`upload-drop-zone file-uploader ${isDragging ? 'dragging' : ''}`} id="drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileUpload}
        >
            <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
            {
                (preview !== null) ?
                    <div className='upload-preview'>
                        <img src={preview} alt="Selected File" />
                    </div> :
                    <i className="fa fa-cloud-upload fa-2x" />
            }
            <span className="upload-text">{(fileName !== null && fileName !== undefined) ? fileName : 'Just drag and drop files here'}</span>
        </div>
    )
}

export default FileUpload
