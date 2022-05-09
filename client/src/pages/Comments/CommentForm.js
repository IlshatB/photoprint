import { useState } from 'react'
import { Form, Input, Rate, Button } from 'antd';
import { useSelector } from 'react-redux'
import axios from 'axios';

const { TextArea } = Input;

const CommentForm = ({ goodId, refetch }) => {
    const [rate, setRate] = useState()
    const { id } = useSelector((state) => state.client)
    const hanleChange = (value) => {
        setRate(value)
    }
    const hanleSubmit = async values => {
        const comment = {
            client: id,
            good: goodId,
            text: values.text,
            grade: values.rate,
            date: Date.now()
        }
        try {
            await axios.post('/api/comments/create', comment, { headers: { "Content-Type": "application/json" } })
            refetch()
        }
        catch (e) {
            console.error(e)
        }
    }
    return (
        <Form onFinish={hanleSubmit} style={{ background: 'white', marginTop: '20px', padding: '20px' }}>
            Ваше общее впечатление:
            <Form.Item name='rate'  rules={[{ required: true, message: 'Пожалуйста, поставтьте оценку' }]}>
                <Rate onChange={hanleChange} value={rate} />
            </Form.Item>
            Комментарий:
            <Form.Item name='text'  rules={[{ required: true, message: 'Пожалуйста, напишите комментарий' }]}>
                <TextArea rows={4} maxLength={300} placeholder="Максимальное количество символов: 300" />
            </Form.Item>
            <Button type="primary" htmlType='submit'>Отправить</Button>
        </Form >
    )

}

export default CommentForm