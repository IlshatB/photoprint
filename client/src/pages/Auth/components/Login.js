
import { Link } from 'react-router-dom'
import { Form, Input, Button, Space  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { blue} from '@ant-design/colors'

const Login = ({ onFinish, onFinishFailed, toSignUp }) => {
    return (
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
                type: 'email',
                message: 'Неверный формат эл. почты',
            },
            {
              required: true,
              message: 'Введите адрес эл. почты',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Эл. почта" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined color="secondary" className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Войти
          </Button>
          <Space size="small" style={{ marginTop: 8 }}>
            <span>Или</span>
            <span style={{ color: blue[4], cursor: 'pointer' }} onClick={toSignUp}>зарегистрироваться</span>
          </Space>
        </Form.Item>
        <Link to="" style={{ color: blue[4] }}>
            Забыли пароль?
        </Link>
      </Form>
    )
}

export default Login