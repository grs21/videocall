import React from 'react'
import { Liv_Icon, MLP_Icon } from '../assets/imagePath'
import { useSelector } from 'react-redux';

function AppIcon() {
  const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
  const hospitalGroup = callPrepareVideo.getHospitalGroup();
  var hospitalIcon = hospitalGroup !== '' ? hospitalGroup === 'MP' ? MLP_Icon : Liv_Icon : ''

  return (
    <div className='app-icon-container'>
      <img src={hospitalIcon} alt="" />
    </div>
  )
}

export default AppIcon
