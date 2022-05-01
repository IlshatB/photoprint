import Main from '../Main/MainContainer'
import Delivery from '../Delivery/DeliveryContainer'
import Cart from '../Cart/CartContainer'
import Auth from '../Auth/AuthContainer'
import Profile from '../Profile/ProfileContainer'

/** страницы товаров */
import Good from '../Good/GoodContainer'
import GoodForm from '../Good/GoodFormContainer'

import Photobooks from '../Photobooks/PhotobooksContainer'

/** вспомогательные компоненты */
import NotImplemented from '../NotImplemented/NotImplemented'
import NotFound from '../../components/NotFound/NotFound'
import AuthGuard from '../../components/AuthGuard/AuthGuard'
import AdminGuard from '../../components/AdminGuard/AdminGuard'

const routes =  [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/404',
        element: <NotFound />,
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
        path: '/goods/new',
        element: (
            <AdminGuard>
                <GoodForm />
            </AdminGuard>
        ),
    },
    {
        path: '/photobooks',
        children: [
            {
                path: '',
                element: <Photobooks />,
            },
            {
                path: ':goodId',
                children: [
                    {
                        path: '',
                        element: (
                            <>
                                <Good />
                            </>
                        ),
                    },
                    {
                        path: 'edit',
                        element: (
                            <AdminGuard>
                                <GoodForm edit />
                            </AdminGuard>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: '/authentication',
        element: <Auth />,
    },
    {
        path: '/profile',
        children: [
            {
                path: '',
                element: (
                    <AuthGuard>
                        <Profile />
                    </AuthGuard>
                ),
            },
        ],
    },
]

export default routes