import { Link } from 'react-router-dom'
import { Result } from "antd"

import { withLayout } from '../../../hocs'

const Authorize = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Result
                status="403"
                title="403"
                subTitle="У вас нет доступа к этой странице"
                extra={<Link to="/authentication">Авторизоваться</Link>}
            />
        </div>
    )
}

const AuthorizeContainer = () => {
    const AuthorizeWithLayout =  withLayout(Authorize)
    return <AuthorizeWithLayout />
}

export default AuthorizeContainer