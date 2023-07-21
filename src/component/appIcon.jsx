import React from 'react'
import { Banner, Liv_Icon, MLP_Icon } from '../assets/imagePath'
import { useSelector } from 'react-redux';
import { useState } from 'react';

function AppIcon() {
  const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
  const hospitalGroup = callPrepareVideo.getHospitalGroup();
  var hospitalIcon
  useState(() => {
    console.log(hospitalGroup,'ssssssssssssssssssssssssssssssssssssssssss');
    
      if (hospitalGroup === 'MP') {
        hospitalIcon = MLP_Icon;
      } else if(hospitalGroup === 'Liv'){
        hospitalIcon = Liv_Icon;
      }
    
  },[callPrepareVideo])

  return (
    <div className='app-icon-container'>
      <img src={hospitalIcon} alt="" />
    </div>
  )
}

export default AppIcon
