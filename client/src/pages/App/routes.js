import NotImplemented from "../NotImplemented/NotImplemented"

import Authentication from '../Authentication/AuthenticationContainer'

import Main from '../Main/MainContainer'
import Auth from '../Auth/AuthContainer'
import Photobooks from "../Photobooks/PhotobooksContainer"

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
            {
                path: 'authentication',
                element: <Authentication />
            }, 
        ]
    },

]

export default routes