import TestPage from '../../initalpage/testPage';
import VideoCall from '../../initalpage/videoCallRoom';
import VideoRoom from '../../initalpage/videoRoom';
export const routes = [

    {
        path: '/',
        component: TestPage,
        exact: true,
        id: 1
    },
    {
        path: '/home',
        component: VideoCall,
        exact: true,
        id: 2,
    },
    {
        path: '/test',
        component: VideoRoom,
        exact: true,
        id: 3
    }
]