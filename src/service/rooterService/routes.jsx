import TestPage from '../../MainPage/testPage';
import VideoRoom from '../../MainPage/videoRoom';

export const routes = [
    {
        path: '/',
        component: TestPage,
        exact: true,
        id: 1
    },
    {
        path: '/test',
        component: VideoRoom,
        exact: true,
        id: 3
    }
]