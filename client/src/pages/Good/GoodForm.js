import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Card, Select, Typography, Input, Button, Modal, InputNumber, Upload } from 'antd'
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'


import { categories, categoriesList, storage, getNowDateString } from '../../helpers'

const GoodForm = ({ edit = false, deleteLoading = false, good, onFinish, onDelete }) => {
    const [fileArray, setFileArray] = useState(good?.images)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const initialValues = {
        category: categories[good?.category] ?? categoriesList[0],
        name: good?.name ?? '',
        subDescription: good?.subDescription ?? '',
        description: good?.description ?? '',
        price: good?.price,
    }

    const handleDeleteConfirm = () => {
        onDelete().then(() => {
            navigate(`/${good.category}`)
        })
    }

    function handleDelete() {
        Modal.confirm({
            title: `Вы точно хотите удалить следующую услугу?`,
            icon: <ExclamationCircleOutlined />,
            content: good?.name,
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Назад',
            confirmLoading: deleteLoading,
            onOk: handleDeleteConfirm,
        });
    }

    const onChange = async ({
        file, fileList }) => {
        if (file.status === 'removed') {
            let imageRef = await storage.refFromURL(file.url);
            await imageRef.delete().then(() => {
                setFileArray(fileList)
            }).catch(err => console.log(err))
        }
        else {
            const fileName = getNowDateString() + file.name
            const snapshot = await storage
                .ref("images/" + fileName)
                .put(file)
            const url = await snapshot.ref.getDownloadURL()
            console.log(url)
            const firebaseInfo = {
                name: fileName,
                url,
                thumbUrl: url
            }
            fileList.pop()
            fileList.push(firebaseInfo)
            setFileArray(fileList)
        }
    };

    return (
        <Form
            form={form}
            name='good_form'
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Card title={<CardTitle name={fileArray ?? ''} />} bordered={false}>
                <Typography.Title level={4}>Внешний вид:</Typography.Title>
                <Form.Item name='imgInfo' >
                    <Upload
                        defaultFileList={fileArray ?? []}
                        beforeUpload={() => false}
                        listType="picture"
                        onChange={onChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Typography.Title level={4}>Краткое описание:</Typography.Title>
                <Form.Item
                    name='subDescription'
                    rules={[
                        {
                            required: true,
                            message: 'Введите краткое описание',
                        },
                    ]}>
                    <Input.TextArea rows={4} style={styles.input} bordered={false} placeholder='Краткое описание услуги/товара' />
                </Form.Item>
                <Typography.Title level={4}>Описание:</Typography.Title>
                <Form.Item name='description' rules={[{ required: true, message: 'Введите описание' }]}>
                    <Input.TextArea rows={10} style={styles.input} bordered={false} placeholder='Описание услуги/товара' />
                </Form.Item>
                <Typography.Title level={4}>Характеристики:</Typography.Title>

                <div style={styles.buttons(edit)}>
                    <Button type="primary" htmlType='submit'>{edit ? 'Сохранить' : 'Создать'}</Button>
                    <Button type="primary" danger onClick={handleDelete} >Удалить</Button>
                </div>
            </Card>
        </Form>
    )
}

const CardTitle = () => {
    return (
        <div>
            <Typography.Title level={4}>Категория:</Typography.Title>
            <Form.Item name='category' rules={[{ required: true, message: 'Выберите категорию' }]} >
                <Select>
                    {categoriesList.map(cat => (
                        <Select.Option key={`${cat.value}-${cat.title}`} value={cat.value}>
                            {cat.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Typography.Title level={4}>Название:</Typography.Title>
            <Form.Item name='name' rules={[{ required: true, message: 'Введите название' }]} style={{ marginTop: 16 }}>
                <Input.TextArea rows={2} style={styles.input} bordered={false} placeholder='Название услуги/товара' />
            </Form.Item>
            <Form.Item label="Цена:" name='price' rules={[{ required: true, message: 'Укажите цену' }]} style={{ marginTop: 16 }}>
                <InputNumber min={1} style={styles.input} bordered={false} placeholder='Цена' addonAfter=" руб." />
            </Form.Item>
        </div>
    )
}

const Dialog = ({
    title,
    visible,
    onOk,
    confirmLoading,
    onCancel,
}) => {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <p>modalText</p>
        </Modal>
    )
}

export default GoodForm

const styles = {
    input: {
        backgroundColor: '#f0f0f0',
        resize: 'none',
    },
    buttons: edit => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    }),
}