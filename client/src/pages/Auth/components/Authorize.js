import { Link } from 'react-router-dom'
import { Row, Col, Typography } from "antd"

import { withLayout } from '../../../hocs'

const Authorize = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography.Text>
            У вас нет доступа к этой странице
            <Link to="/authentication"> авторизоваться</Link>
        </Typography.Text>
        </div>
    )
}

const AuthorizeContainer = () => {
    const AuthorizeWithLayout =  withLayout(Authorize)
    return <AuthorizeWithLayout />
}

export default AuthorizeContainer