import Main from '../Main/MainContainer'
import Delivery from '../Delivery/DeliveryContainer'
import Cart from '../Cart/CartContainer'
import Auth from '../Auth/AuthContainer'
import Profile from '../Profile/ProfileContainer'

/** страницы товаров */
import Photobooks from '../Photobooks/PhotobooksContainer'

/** вспомогательные компоненты */
import NotImplemented from '../NotImplemented/NotImplemented'
import AuthGuard from '../../components/AuthGuard/AuthGuard'

const routes =  [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/home',
        element: <Main />,
    },
    {
        path: '/delivery',
        element: <Delivery />,
    },
    {
        path: '/cart',
        element: (
            <AuthGuard>
                <Cart />
            </AuthGuard>
        ),
    },
    {
        path: '/photobooks',
        element: <Photobooks />,
    },
    {
        path: '/authentication',
        element: <Auth />,
    },
    {
        path: '/profile',
        element: (
            <AuthGuard>
                <Profile />
            </AuthGuard>
        ),
    },

]

export default routes