import React from 'react'
import { Banner, Liv_Icon, MLP_Icon } from '../assets/imagePath'
import { useSelector } from 'react-redux';

function ResultItem() {
    const { callPrepareVideo } = useSelector(state => state.videoRoomProperty);
    const hospitalGroup = callPrepareVideo.getHospitalGroup();
    const hospitalIcon = hospitalGroup === 'MP' ? MLP_Icon : Liv_Icon;
    return (
        <div className='result-wrapper'>
            <div className='img'>
                <img src={hospitalIcon} alt="" />
            </div>
            <div className='body-container' >
                <div className='background-img'>
                    <img src={Banner} alt="" />
                </div>
                <div className='text-container'>
                    <p>Görüşmeniz sonlanmıştır. Sayfayı kapatabilirsiniz.</p>
                    <p>Görüşme ile ilgili öneri ve şikayetleriniz için hastane bilgi işlem ile iletişime geçebilirsiniz.</p>
                </div>
            </div>
        </div>
    )
}

export default ResultItem
