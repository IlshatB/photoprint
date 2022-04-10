import { Link } from 'react-router-dom'
import { Tabs, Typography } from 'antd'

import { useCurrentUser } from '../../hooks'


const Profile = () => {
    const { user } = useCurrentUser()

    return (
        <Tabs defaultActiveKey="account" onChange={() => {}}>
            <Tabs.TabPane tab="Учетная запись" key="account">
                <Typography.Paragraph>{`Ваша эл.почта: ${user.email}`}</Typography.Paragraph>
                <Typography.Paragraph><Link to="">Сменить пароль</Link></Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Заказы" key="orders">
                Заказы
            </Tabs.TabPane>
        </Tabs>
    )
}

export default Profile