
import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { blue} from '@ant-design/colors'

const Signup = ({ onSignup, toLogIn }) => {
    const [form] = Form.useForm()

    return (
        <Form
        form={form}
        name='signup_form'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={values => {
          onSignup(values)
            .catch(error => {
              if (error.includes('Пользователь существует')) { 
                form.setFields([
                  {
                    name: 'email',
                    errors: [error]
                  },
                  {
                    name: 'password',
                    value: '',
                  },
                  {
                    name: 'confirm',
                    value: '',
                  },
                ])
              }
            })
        }}
      >
        <Form.Item
          name='email'
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
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Эл. почта' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined color='secondary' className='site-form-item-icon' />}
            type='password'
            placeholder='Пароль'
          />
        </Form.Item>
        <Form.Item
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста подтвердите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password
            prefix={<LockOutlined color='secondary' className='site-form-item-icon' />} 
            placeholder='Подтвердите пароль' 
        />
      </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Form.Item>
            <Space size='small' style={{ marginTop: 8 }}>
                <span>Есть аккаунт?</span>
                <span style={{ color: blue[4], cursor: 'pointer' }} onClick={toLogIn}>войти</span>
          </Space>
        </Form.Item>
      </Form>
    )
}

export default Signup