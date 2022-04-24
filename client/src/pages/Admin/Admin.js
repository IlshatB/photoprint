import { Form, Input, Button  } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


const Admin = ({ onCreate }) => {
    const [form] = Form.useForm()


    return (
        <Form
        form={form}
        name='login_form'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onCreate}
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
          <Input
            prefix={<LockOutlined color='secondary' className='site-form-item-icon' />}
            type='password'
            placeholder='Пароль'
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    )
    
}

export default Admin