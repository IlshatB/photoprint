import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

import { Form, Card, Select, Typography, Input, Button, Modal, InputNumber, Radio, Tooltip, Upload, Row, Col } from 'antd'
import { ExclamationCircleOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons'

import { useConfig } from '../../hooks'
import { categoriesList, storage, getNowDateString } from '../../helpers'

const styles = {
    input: {
        backgroundColor: '#f0f0f0',
        resize: 'none',
    },
    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
}

const GoodForm = ({ edit = false, deleteLoading = false, good, onFinish, onDelete }) => {
    const navigate = useNavigate()
    const { goodId } = useParams()

    const [fileArray, setFileArray] = useState(good?.images)
    const config = useConfig()

    const [form] = Form.useForm()
    const { setFieldsValue } = form

    const initialValues = {
        images: good?.images ?? [],
        category: good?.category ?? 'photobooks',
        name: good?.name ?? '',
        subDescription: good?.subDescription ?? '',
        description: good?.description ?? '',
        price: good?.price,
        sale: good?.sale,
        productionTime: good?.productionTime,
    }

    const handleDeleteConfirm = () => {
        onDelete().then(() => {
            navigate(good?.category ? `/${good?.category}` : -1)
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
        })
    }

    const onChange = async ({ file, fileList }) => {
        let images = []

        if (file.status === 'removed') {
            let imageRef = await storage.refFromURL(file.url)
            await imageRef.delete().then(() => {
                setFileArray(fileList)
            }).catch(err => console.log(err))

            images = good?.images.filter(i => i.name === file.name)
        }
        else {
            const fileName = getNowDateString() + file.name
            const snapshot = await storage
                .ref("images/" + fileName)
                .put(file)
            const url = await snapshot.ref.getDownloadURL()
            const firebaseInfo = {
                name: fileName,
                url,
                thumbUrl: url
            }
            fileList.pop()
            fileList.push(firebaseInfo)
            setFileArray(fileList)
            images = [ ...good?.images, firebaseInfo ]
        }

        try {
            await axios.patch(`/api/goods/update/images/${goodId}`, { images }, config)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form
            form={form}
            name='good_edit_form'
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Card title={<CardTitle name={good?.name ?? ''} form={form} />} bordered={false}>
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
                    rules={[ { required: true, message: 'Введите краткое описание' } ]}
                >
                    <Input.TextArea rows={4} style={styles.input} bordered={false} placeholder='Краткое описание услуги/товара' />
                </Form.Item>
                <Typography.Title level={4}>Описание:</Typography.Title>
                <Form.Item name='description' rules={[{ required: true, message: 'Введите описание' }]}>
                    <Input.TextArea rows={10} style={styles.input} bordered={false} placeholder='Описание услуги/товара' />
                </Form.Item>
                <Typography.Title level={4}>Характеристики:</Typography.Title>
                <Characteristics good={good} setFieldsValue={setFieldsValue} />

                <div style={styles.buttons}>
                    <Button type="primary" htmlType='submit'>{edit ? 'Сохранить' : 'Создать'}</Button>
                    <Button type="primary" danger onClick={handleDelete} >Удалить</Button>
                </div>
            </Card>
        </Form>
    )
}

const Characteristics = ({ good, setFieldsValue }) => {
    const [sizeVariant, setSizeVariant] = useState(good?.size ? 'single' : !!good?.sizes.length ? 'multi' : null)
    const [typeVariant, setTypeVariant] = useState(good?.type ? 'single' : !!good?.types.length ? 'multi' : null)

    console.log(good)
    const [sizesCounter, setSizesCounter] = useState(good?.sizes.length > 1 ? good?.sizes.length : 2)
    const [typesCounter, setTypesCounter] = useState(good?.types.length > 1 ? good?.types.length : 2)

    const handleChangeSizeVariant = e => {
        const variant = e.target.value
        if (variant === 'single') {
            setFieldsValue({ 'sizes-0': null })
            setFieldsValue({ 'sizes-1': null })
            setFieldsValue({ 'sizes-2': null })
            setFieldsValue({ 'sizes-3': null })
            setFieldsValue({ 'sizes-4': null })

            setFieldsValue({ 'sizes-cost-0': null })
            setFieldsValue({ 'sizes-cost-1': null })
            setFieldsValue({ 'sizes-cost-2': null })
            setFieldsValue({ 'sizes-cost-3': null })
            setFieldsValue({ 'sizes-cost-4': null })
        }
        else if (variant === 'multi') {
            setFieldsValue({ size: null })
        }

        setSizeVariant(e.target.value)
    }

    const handleChangeTypeVariant = e => {
        const variant = e.target.value
        if (variant === 'single') {
            setFieldsValue({ 'types-0': null })
            setFieldsValue({ 'types-1': null })
            setFieldsValue({ 'types-2': null })
            setFieldsValue({ 'types-3': null })
            setFieldsValue({ 'types-4': null })

            setFieldsValue({ 'types-cost-0': null })
            setFieldsValue({ 'types-cost-1': null })
            setFieldsValue({ 'types-cost-2': null })
            setFieldsValue({ 'types-cost-3': null })
            setFieldsValue({ 'types-cost-4': null })
        }
        else if (variant === 'multi') {
            setFieldsValue({ type: null })
        }

        setTypeVariant(e.target.value)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 16 }}>
                <Typography.Title level={5}>Размер товара/услуги</Typography.Title>
                <Radio.Group onChange={handleChangeSizeVariant} value={sizeVariant}>
                    <Radio value="single">Один размер</Radio>
                    <Radio value="multi">Несколько размеров</Radio>
                </Radio.Group>
                {sizeVariant === 'single' ? (
                    <Form.Item name='size' style={{ marginTop: 16 }} initialValue={good?.size} shouldUpdate>
                        <Input style={styles.input} bordered={false} placeholder='Размер товара' />
                    </Form.Item>
                ) : sizeVariant === 'multi' ? (
                    <>
                        <Typography.Paragraph style={{ marginTop: 16 }} type="warning">Укажите до 5 разных вариаций размера товара</Typography.Paragraph>
                        {Array.from(Array(sizesCounter).keys()).map((_, id) => (
                            <Row gutter={[16, 16]} key={`sizes-${id}`}>
                                <Col xs={8}>
                                    <Form.Item
                                        name={`sizes-${id}`}
                                        initialValue={good?.sizes[id]?.value}
                                        shouldUpdate
                                    >
                                        <Input style={styles.input} bordered={false} placeholder='Укажите размер' />
                                    </Form.Item>
                                </Col>
                                <Col xs={4}>
                                    <Form.Item
                                        name={`sizes-cost-${id}`}
                                        initialValue={good?.sizes[id].cost}
                                        shouldUpdate
                                    >
                                        <InputNumber min={0} prefix="+" addonAfter="&#8381;" style={styles.input} bordered={false} placeholder="0" />
                                    </Form.Item>                                
                                </Col>
                            </Row>
                        ))
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button shape="round" disabled={sizesCounter === 5} onClick={() => setSizesCounter(v => v + 1)} >Добавить</Button>
                            <Button shape="round" disabled={sizesCounter === 2} onClick={() => setSizesCounter(v => v - 1)} danger>Убрать</Button>
                        </div>
                    </>
                ) : null}
            </div>
            <div style={{ marginBottom: 16 }}>
                <Typography.Title level={5}>Тип товара/услуги</Typography.Title>
                <Radio.Group onChange={handleChangeTypeVariant} value={typeVariant}>
                    <Radio value="single">Один тип</Radio>
                    <Radio value="multi">Несколько типов</Radio>
                </Radio.Group>
                {typeVariant === 'single' ? (
                    <Form.Item name='type' style={{ marginTop: 16 }} initialValue={good?.type} shouldUpdate>
                        <Input style={styles.input} bordered={false} placeholder='Тип товара' />
                    </Form.Item>
                ) : typeVariant === 'multi' ? (
                    <>
                        <Typography.Paragraph style={{ marginTop: 16 }} type="warning">Укажите до 5 разных вариаций типа товара</Typography.Paragraph>
                        {Array.from(Array(typesCounter).keys()).map((_, id) => (
                            <Row gutter={[16, 16]} key={`types-${id}`}>
                                <Col xs={8}>
                                    <Form.Item
                                        name={`types-${id}`}
                                        initialValue={good?.type[id]?.value}
                                        shouldUpdate
                                    >
                                        <Input style={styles.input} bordered={false} placeholder='Укажите тип' />
                                    </Form.Item>
                                </Col>
                                <Col xs={4}>
                                    <Form.Item
                                        name={`types-cost-${id}`}
                                        initialValue={good?.type[id].cost}
                                        shouldUpdate
                                    >
                                        <InputNumber min={0} prefix="+" addonAfter="&#8381;" style={styles.input} bordered={false} placeholder="0" />
                                    </Form.Item>                                
                                </Col>
                            </Row>
                        ))
                        }

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button shape="round" disabled={typesCounter === 5} onClick={() => setTypesCounter(v => v + 1)} >Добавить</Button>
                            <Button shape="round" disabled={typesCounter === 2} onClick={() => setTypesCounter(v => v - 1)} danger>Убрать</Button>
                        </div>
                    </>
                ) : null}
            </div>

        </div>
    )
}

const CardTitle = ({ form }) => {
    const { getFieldsValue, setFieldsValue } = form
    const values = getFieldsValue()

    return (
        <div>
            <Typography.Title level={4}>Категория:</Typography.Title>
            <Form.Item name="category" rules={[{ required: true, message: 'Выберите категорию' }]} >
                <Select value={values} onChange={value => setFieldsValue('category', value)}>
                    {categoriesList.map(cat => (
                        <Select.Option key={`${cat.value}-${cat.title}`} value={cat.value}>
                            {cat.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Typography.Title level={4}>Название:</Typography.Title>
            <Form.Item name="name" rules={[{ required: true, message: 'Введите название' }]} style={{ marginTop: 16 }}>
                <Input.TextArea rows={2} style={styles.input} bordered={false} placeholder='Название услуги/товара' />
            </Form.Item>
            <Form.Item name="price" label="Цена:" rules={[{ required: true, message: 'Укажите цену' }]} style={{ marginTop: 16 }}>
                <InputNumber min={1} style={{ ...styles.input, width: '100%' }} bordered={false} placeholder='Цена' addonAfter=" руб." />
            </Form.Item>
            <Form.Item name="sale" label="Скидка" style={{ marginTop: 16 }}>
                <InputNumber min={1} max={100} style={{ ...styles.input, width: '100%' }} bordered={false} placeholder="Скидка в %" addonAfter="%" />
            </Form.Item>
            <Form.Item
                name="productionTime"
                label={<TroductionTimeTooltip />}
                style={{ marginTop: 16 }}
            >
                <Input min={1} style={styles.input} bordered={false} placeholder="Время" />
            </Form.Item>
        </div>
    )
}

const TroductionTimeTooltip = () => {
    const title = (<>
        Вводите время в формате: <br />
        Числовое_значениеТип_тайминга <br />
        m - минуты <br />
        h - часы <br />
        d - дни <br />
        Пример: 2h - 2 часа
    </>)

    return (
        <>
            Время производства
            <Tooltip title={title}>
                <InfoCircleOutlined style={{ marginLeft: 4 }} />
            </Tooltip>
        </>
    )
}

export default GoodForm
