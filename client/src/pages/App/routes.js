import Main from '../Main/MainContainer'
import Delivery from '../Delivery/DeliveryContainer'
import Cart from '../Cart/CartContainer'
import Auth from '../Auth/AuthContainer'
import Profile from '../Profile/ProfileContainer'

/** страницы товаров */
import Good from '../Good/GoodContainer'
import GoodForm from '../Good/GoodFormContainer'

import Photobooks from '../Categories/Photobooks'
import Photos from '../Categories/Photos'
import Print from '../Categories/Print'
import Souvenirs from '../Categories/Souvenirs'
import Calendars from '../Categories/Calendars'


/** вспомогательные компоненты */
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
        path: '/photos',
        children: [
            {
                path: '',
                element: <Photos />,
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
        path: '/print',
        children: [
            {
                path: '',
                element: <Print />,
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
        path: '/souvenirs',
        children: [
            {
                path: '',
                element: <Souvenirs />,
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
        path: '/calendars',
        children: [
            {
                path: '',
                element: <Calendars />,
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
        path: '/authentication/forgot-password',
        element: <Auth.ForgotPassword />,
    },
    {
        path: '/authentication/reset/:token',
        element: <Auth.Reset />,
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
            {
                path: 'new',
                element: (
                    <AdminGuard>
                        <GoodForm />
                    </AdminGuard>
                )
            },
        ],
    },
]

export default routes