import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { Form, Input, Typography, Button, Result, Spin } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import { withLayout } from '../../../hocs'
import { useState } from 'react'

const Reset = () => {
    const { token } = useParams()

    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async values => {
        const { password } = values

        try {
            setLoading(true)
            const { data } = await axios.put(`/api/auth/reset-password/${token}`, { password }, { headers: { "Content-Type": "application/json" } })
            setMessage(data.message)
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
                ? <Result status="error" title={error} extra={[ <Button key="try_again" onClick={handleTryAgain}>Повторить</Button> ]} />
                : loading
                    ? <Spin size="small" /> 
                    : message 
                        ? (<Result
                                status="success"
                                title={message}
                                extra={[
                                    <Typography.Link key="enter">
                                        <Link to="/authentication">Войти</Link>
                                    </Typography.Link>
                                ]}
                        />)
                        : (<Form initialValues={{ password: '' }} onFinish={handleSubmit}>
                                <Typography.Title level={2}>Введите новый пароль</Typography.Title>
                                    <Form.Item name="password"
                                        rules={[
                                            { required: true, message: "Введите пароль" },
                                        ]}
                                    >
                                    <Input prefix={<LockOutlined color="secondary" className="site-form-item-icon" />} type="password" placeholder="Пароль" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Отправить</Button>
                            </Form>) 
            }
        </div>
    )
}

const ResetContainer = () => {
    const ResetWithLayout =  withLayout(Reset)
    return <ResetWithLayout />
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
}


export default ResetContainer