import TestPage from '../../MainPage/testPage';
import VideoCall from '../../MainPage/videoCallRoom';
import VideoRoom from '../../MainPage/videoRoom';

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