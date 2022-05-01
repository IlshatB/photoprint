import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tabs, Typography } from 'antd'

import { useCurrentClient } from '../../hooks'

import Admin from '../Admin/AdminContainer'

const Profile = () => {
    const { email, isAdmin } = useSelector(store => store.client)

    return (
        <Tabs defaultActiveKey="account" onChange={() => {}}>
            <Tabs.TabPane tab="Учетная запись" key="account">
                <Typography.Paragraph>{`Ваша эл.почта: ${email}`}</Typography.Paragraph>
                <Typography.Paragraph><Link to="">Сменить пароль</Link></Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Заказы" key="orders">
                Заказы
            </Tabs.TabPane>
            {isAdmin && (
                <Tabs.TabPane tab="Администратор" key="admin">
                    <Admin />
                </Tabs.TabPane>              
            )}
        </Tabs>
    )
}

export default Profile