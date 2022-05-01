import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Tabs, Typography, Button, Form, Input, Result, Spin } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import Admin from '../Admin/AdminContainer'

const Profile = () => {
    const { id, email, isAdmin } = useSelector(store => store.client)
    const [resetToken, setResetToken] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState()
    

    const handleGetToken = async () => {
        try {
            const { data } = await axios.post(`/api/auth/change-password/${id}`, { headers: { "Content-Type": "application/json" } })
            setResetToken(data.token)
    
        } catch(err) {
            setError(err.response.data)
        }
    }

    const handleUpdatePassword = async values => {
        const { oldPassword, newPassword } = values
        if (oldPassword === newPassword) {
            setError('Пароли совпадают')
            return
        }

        try {
            setLoading(true)
            const login = await axios.post('/api/auth/signin', { email, password: oldPassword}, { headers: { "Content-Type": "application/json" } })
            try {
                if (login.data.token) {
                    const { data } = await axios.put(`/api/auth/reset-password/${resetToken}`, { password: newPassword }, { headers: { "Content-Type": "application/json" } })
                    setMessage(data.message)
                }    
                setLoading(false)
            } catch(err) {
                setError(err.response.data)
            }
        } catch(err) {
            setError(err.response.data)
        }
    }

    const handleBack = () => {
        setMessage('')
        setError(null)
        setResetToken(null)
        setLoading(false)
    }

    const handleTryAgain = () => {
        setError(null)
        setTimeout(() => setLoading(false), 500)
    }

    return resetToken
     ? error 
        ? <Result status="error" title={error} extra={[ <Button key="try_again" onClick={handleTryAgain}>Повторить</Button> ]} />
        : loading
            ?  (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '50%' }}>
                <Spin size="small" />
                </div>)
            : message 
                ? <Result status="success" title={message} extra={[<Button key="back" type="link" onClick={handleBack}>Назад</Button>]} />
                : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form initialValues={{ oldPassword: '', newPassword: '' }} onFinish={handleUpdatePassword} labelWrap>
                        <Form.Item labelAlign="left" labelCol={{ flex: '150px' }} name="oldPassword" label="Старый пароль" rules={[ { required: true, message: "Введите пароль" } ]}>
                            <Input prefix={<LockOutlined color="secondary" className="site-form-item-icon" />} type="password" placeholder="Пароль" />
                        </Form.Item>
                        <Form.Item labelAlign="left" labelCol={{ flex: '150px' }} name="newPassword" label="Новый пароль" rules={[ { required: true, message: "Введите пароль" } ]}>
                            <Input prefix={<LockOutlined color="secondary" className="site-form-item-icon" />} type="password" placeholder="Пароль" />
                        </Form.Item>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Button type="primary" htmlType="submit">Отправить</Button>
                            <Button type="link" danger onClick={handleBack}>Назад</Button>
                        </div>
                    </Form>
                </div>
            )
            : (
                <Tabs defaultActiveKey="account" onChange={() => {}}>
                    <Tabs.TabPane tab="Учетная запись" key="account">
                        <Typography.Paragraph>{`Ваша эл.почта: ${email}`}</Typography.Paragraph>
                            <Button type="link" onClick={handleGetToken}>Сменить пароль</Button>
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