import NotImplemented from '../NotImplemented/NotImplemented'

import Main from '../Main/MainContainer'
import Delivery from '../Delivery/DeliveryContainer'
import Cart from '../Cart/CartContainer'
import Auth from '../Auth/AuthContainer'
import Photobooks from '../Photobooks/PhotobooksContainer'

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
        element: <Cart />,
    },
    {
        path: '/photobooks',
        element: <Photobooks />,
    },
    {
        path: 'authentication',
        element: <Auth />,
    },
    {
        path: '/profile',
        children: [
            {
                path: '',
                element: <NotImplemented />
            },
        ]
    },

]

export default routes