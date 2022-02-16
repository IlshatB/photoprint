import { useFormik } from 'formik'
import * as Yup from 'yup'

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
})

const LoginForm = () => {
    const { values, errors, touched, handleChange, ...formik } = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '',
            type: true,
            phone: '',
            password: '',
        },
        onSubmit: values => console.log(values),
    })
    
    const disabled = formik.isSubmitting || !formik.isValid || !formik.dirty
  
    const handleFieldToggle = () => {
        formik.setFieldValue('type', !values.type)
    }

    const handleComplexError = () => {
        console.log(touched.phone)
        return values.type 
            ? (touched.email && errors.email) 
                ? errors.email : undefined
            : (touched.phone && errors.phone) 
                ? errors.phone : undefined
    }


    return (
        <Form onSubmit={formik.handleSubmit} loading={formik.isSubmitting} style={{ margin: '16px' }}>
            <Header  size='large'>
                Вход с паролем
            </Header>
            <Form.Group>
                <Form.Field>
                    <Button as='div' labelPosition='right'>
                        <Button icon onClick={() => handleFieldToggle()}>
                            <Icon name={values.type ? 'mail' : 'phone'} />
                        </Button>
                        <Label basic pointing='left'>
                            {values.type ? 'Эл.почта' : 'Телефон'}
                        </Label>
                    </Button>
                </Form.Field>
                <Form.Input
                    type={values.type ? 'email' : 'text'}
                    name={values.type ? 'email' : 'phone'}
                    placeholder="Эл. почта или телефон"
                    value={values.type ? values.email : values.phone}
                    onChange={handleChange} 
                    error={handleComplexError()} 
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    type="password"
                    name="password" 
                    placeholder="Пароль"
                    value={values.password}
                    onChange={handleChange} 
                    error={(touched.password && errors.password) ? errors.password : undefined} 
                    width="16"
                />
                <Form.Button primary disabled={disabled} type="submit">Войти</Form.Button>
            </Form.Group>
            <Form.Checkbox label='Запомнить на две недели' />
            <Form.Button type="button">Забыли пароль?</Form.Button>
        </Form>
    )
}

export default LoginForm