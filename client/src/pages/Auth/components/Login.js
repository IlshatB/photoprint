
import { Link } from 'react-router-dom'
import { Form, Input, Button, Space  } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { blue} from '@ant-design/colors'

const Login = ({ onLogin, toSignUp }) => {
    const [form] = Form.useForm()

    const handleFinish = values => {
        onLogin(values).catch(error => {
            if(error.includes('Пользователь не найден')) {
                form.setFields([
                   { name: 'email', errors: [error] },
                   { name: 'password', value: '', errors: [''] },
                ])
            } else if (error.includes('Неверный пароль')) {
                form.setFields([ { name: 'password', value: '', errors: [error] } ])
            }
        })
    }

    return (
        <Form form={form} name="login_form" className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleFinish}>
            <Form.Item name="email"
                rules={[
                  { type: "email", message: "Неверный формат эл. почты" },
                  { required: true,  message: "Введите адрес эл. почты" },
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Эл. почта" />
            </Form.Item>
            <Form.Item name="password"
              rules={[
                { required: true, message: "Введите пароль" },
              ]}
            >
                <Input prefix={<LockOutlined color="secondary" className="site-form-item-icon" />} type="password" placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Войти</Button>
                <Space size="small" style={{ marginTop: 8 }}>
                  <span>Или</span>
                  <span style={{ color: blue[4], cursor: 'pointer' }} onClick={toSignUp}>зарегистрироваться</span>
                </Space>
            </Form.Item>
            <Link to="forgot-password" style={{ color: blue[4] }}>
                Забыли пароль?
            </Link>
        </Form>
    )
}

export default Login