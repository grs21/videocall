import React from 'react'
import { Banner, Liv_Icon, MLP_Icon } from '../assets/imagePath'
import { useSelector } from 'react-redux';

function AppIcon() {
    const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
    const hospitalGroup = callPrepareVideo.getHospitalGroup();
    const hospitalIcon = hospitalGroup === 'MP' ? MLP_Icon : Liv_Icon;
  return (
    <div className='app-icon-container'>
        <img src={hospitalIcon} alt="" />
    </div>
  )
}

export default AppIcon
