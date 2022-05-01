import { useState } from 'react'
import axios from 'axios'

import { Form, Input, Button, Typography, Result, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { withLayout } from '../../../hocs'
import NotFound from '../../../components/NotFound/NotFound'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [subMessage, setSubMessage] = useState('')
    const [error, setError] = useState()

    const handleSubmit = async values => {
        const { email } = values

        try {
            setLoading(true)
            const { data } = await axios.post('/api/auth/forgot-password', { email }, { headers: { "Content-Type": "application/json" } })
            setMessage(data.message)
            setSubMessage(data.subMessage)
            setLoading(false)
        } catch(err) {
            setError(err.response.data)
        }
    }

    const handleTryAgain = () => {
        setError(null)
        setTimeout(() => setLoading(false), 500)
    }

    return (
        <div style={styles.container}>
            {error 
                ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <NotFound.View error={error} withContainer={false} /> 
                        <Button onClick={handleTryAgain}>Повторить</Button>
                    </div>
                )
                : loading 
                    ? <Spin size="small" /> 
                    : message 
                        ?  <Result status="success" subTitle={subMessage} title={message} />
                        : (<Form initialValues={{ email: '' }} onFinish={handleSubmit}>
                                <Typography.Title level={2}>Восстановление пароля</Typography.Title>
                                <Form.Item
                                    name="email"
                                    label="Введите почту"
                                    rules={[
                                        { type: "email", message: "Неверный формат эл. почты" },
                                        { required: true, message: "Введите адрес эл. почты" },
                                    ]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Эл. почта" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Отправить</Button>
                            </Form>) 
            }
        </div>
    )
}

const ForgotPasswordContainer = () => {
    const ForgotPasswordWithLayout =  withLayout(ForgotPassword)
    return <ForgotPasswordWithLayout />
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
}

export default ForgotPasswordContainer