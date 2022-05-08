import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Result } from 'antd'

import { withLayout } from '../../hocs'

const AuthGuard = ({ children }) => {
    const { isAdmin } = useSelector(store => store.client)

    const NotAllowedWithLayout = withLayout(NotAllowed)
    return isAdmin ? children : <NotAllowedWithLayout />
}

const NotAllowed = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Result
                status="403"
                title="403"
                subTitle="У вас нет доступа к этой странице"
                extra={<Link to="/">На главную</Link>}
            />
        </div>
    )
}

export default AuthGuard