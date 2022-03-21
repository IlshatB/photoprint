import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { Form, Button, Icon, Label, Header } from 'semantic-ui-react'

const schema = Yup.object({
    type: Yup.boolean(),
    email: Yup.string()
        .email('Неверный формат')
        .when('type', (type, schema) => {
            return type ? schema.required('Введите почту') : schema
        }),
    phone: Yup.string()
        .when('type', (type, schema) => {
            return !type ? schema.required('Введите номер') : schema
        }),
    password: Yup.string()
        .min(6, 'Пароль должен состоять из минимум 6 символов')
        .required('Введите пароль'),
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
})

const RegistrationForm = ({ onRegister }) => {
    const navigate = useNavigate()
    const { values, errors, touched, handleChange, handleBlur, ...formik } = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '',
            type: true,
            phone: '',
            password: '',
            confirm: '',
        },
        onSubmit: values => onRegister(values).then(() => navigate('/', { replace: true })),
    })
    
    const disabled = formik.isSubmitting || !formik.isValid || !formik.dirty
  
    const handleFieldToggle = () => {
        formik.setFieldValue('type', !values.type)
    }

    const handleComplexError = () => {
        return values.type 
            ? (touched.email && errors.email) && { content: errors.email }
            : (touched.phone && errors.phone) && { content: errors.phone }
    }


    return (
        <Form onSubmit={formik.handleSubmit} loading={formik.isSubmitting} style={{ padding: '16px', width: '50%', minWidth: '250px' }}>
            <Header  size='large'>
                Регистрация
            </Header>
            <Form.Group>
                <Form.Field>
                    <Button type="button" as='div' labelPosition='right'>
                        <Button type="button" icon onClick={() => handleFieldToggle()}>
                            <Icon name={values.type ? 'mail' : 'phone'} />
                        </Button>
                        <Label basic pointing='left'>
                            {values.type ? 'Эл.почта' : 'Телефон'}
                        </Label>
                    </Button>
                </Form.Field>
                <div style={{ width: '100%' }}>
                    <Form.Input
                        name="email"
                        type="text"
                        placeholder="Почта или номер"
                        fluid
                        value={values.email}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        error={handleComplexError()} 
                        children={!values.type ? (
                            <InputMask
                                name="phone"
                                placeholder="Почта или номер"
                                value={values.phone}
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                mask="+7\(999) 999-9999"
                            />
                        ) : undefined}
                    />
                </div>
            </Form.Group>
            <Form.Group>
                <div style={{ width: '100%' }}>
                    <Form.Input
                        name="password" 
                        type="password"
                        placeholder="Пароль"
                        fluid
                        value={values.password}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        error={(touched.password && errors.password) && { content: errors.password }} 
                    />
                </div>
            </Form.Group>
            <Form.Group>
                <div style={{ width: '100%' }}>
                    <Form.Input
                        name="confirm" 
                        type="password"
                        placeholder="Повторите пароль"
                        fluid
                        value={values.confirm}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        error={(touched.confirm && errors.confirm) && { content: errors.confirm }} 
                    />
            </div>
            </Form.Group>
            <Form.Checkbox label="Я согласен на обработку данных" />
            <Form.Button type="submit" primary disabled={disabled}>Зарегистрироваться</Form.Button>
        </Form>
    )
}

export default RegistrationForm