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
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
})

const RegistrationForm = () => {
    const { values, errors, touched, handleChange, ...formik } = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '',
            type: true,
            phone: '',
            password: '',
            confirm: '',
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
                Регистрация
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
            <Form.Input
                    type="password"
                    name="password" 
                    placeholder="Пароль"
                    value={values.password}
                    onChange={handleChange} 
                    error={(touched.password && errors.password) ? errors.password : undefined} 
                    width="16"
                />
            <Form.Input
                    type="password"
                    name="confirm" 
                    placeholder="Повторите пароль"
                    value={values.confirm}
                    onChange={handleChange} 
                    error={(touched.confirm && errors.confirm) ? errors.confirm : undefined} 
                    width="16"
                />
            <Form.Checkbox label="Я согласен на обработку данных" />
            <Form.Button primary disabled={disabled} type="submit">Зарегистрироваться</Form.Button>
        </Form>
    )
}

export default RegistrationForm