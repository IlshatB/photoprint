import { Link } from 'react-router-dom'
import { Tabs, Typography } from 'antd'

import { useCurrentClient } from '../../hooks'

import Admin from '../Admin/AdminContainer'

const Good = ({}) => {
    const { client } = useCurrentClient()

    return (
        123
        // <Tabs defaultActiveKey="account" onChange={() => {}}>
        //     <Tabs.TabPane tab="Учетная запись" key="account">
        //         <Typography.Paragraph>{`Ваша эл.почта: ${client.email}`}</Typography.Paragraph>
        //         <Typography.Paragraph><Link to="">Сменить пароль</Link></Typography.Paragraph>
        //     </Tabs.TabPane>
        //     <Tabs.TabPane tab="Заказы" key="orders">
        //         Заказы
        //     </Tabs.TabPane>
        //     {client.email === 'yogafeed@gmail.com' && (
        //         <Tabs.TabPane tab="Администратор" key="admin">
        //             <Admin />
        //         </Tabs.TabPane>              
        //     )}
        // </Tabs>
    )
}

export default Good