import NotImplemented from "../NotImplemented/NotImplemented"

import Authentication from '../Authentication/AuthenticationContainer'

const routes =  [
    {
        path: '/',
        element: <Authentication />
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