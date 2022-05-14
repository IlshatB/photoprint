import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

import { List, Typography, Descriptions, Steps, Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { useConfig, useWindowWidth } from '../../../hooks'

const Admin = () => {
    const config = useConfig()
    const [orders, setOrders] = useState([])

    const fetchOrders = useCallback(async () => {
        const { data } = await axios.get('/api/orders/fetch', config)
        setOrders(data.orders.filter(o => o.status !== 'canceled'))
    }, [config])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])


    const handleUpdateOrder = async (id, status, clientId) => {
        try {
            await axios.patch(`/api/orders/update/${id}`, { status, clientId }, config)
            fetchOrders()
        } catch (e) {
            console.log(e)
        }
    }

    const handleCancelConfirm = async id => {
        try {
            await axios.patch(`/api/orders/cancel/${id}`, {}, config)
            fetchOrders()
        } catch (e) {
            console.log(e)
        }
    }

    function handleCancel(orderId) {
        Modal.confirm({
            title: `Вы действительно хотите отменить данный заказ?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Отменить',
            okType: 'danger',
            cancelText: 'Назад',
            onOk: () => handleCancelConfirm(orderId),
        });
    }

    return (
        <div>
            <Link to="new">Новая услуга / товар</Link>
            <div style={{ marginTop: 16 }}>
                <Typography.Title level={5}>Активные заказы</Typography.Title>
                <List 
                    dataSource={orders}
                    renderItem={order => <Order order={order} handleUpdateOrder={handleUpdateOrder} handleCancel={handleCancel} />}
                />
            </div>
        </div>
    )
}

const Order = ({ order, handleUpdateOrder, handleCancel }) => {
    return (
        <div style={{ backgroundColor: '#fff', padding: 8, marginBottom: 16 }}>
            <Typography.Paragraph type="secondary">
                №{order._id}
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">
                Детали:
            </Typography.Paragraph>
            <Descriptions column={1} size="small">
                <Descriptions.Item label="Цена">{`${order.cost} руб.`}</Descriptions.Item>
                <Descriptions.Item label="Дата заказа">{dayjs(order.date).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
                <Descriptions.Item label="Адрес">{order.address}</Descriptions.Item>
                <Descriptions.Item label="Доставка">{order.delivery === 'courier' ? "Курьером" : 'Почтой'}</Descriptions.Item>
                <Descriptions.Item label="Оплата">{order.paymentType === 'cash' ? "Наличными" : 'Картой'}</Descriptions.Item>                
            </Descriptions>
            <List
                dataSource={order.items}
                renderItem={item => <Item item={item} />}
            />
            <div style={{ padding: 16 }}>
                <Steps size="small" current={getStatusOrder(order.status)} onChange={value => handleUpdateOrder(order._id, getStatusLabel(value), order.client)}>
                    <Steps.Step title="Ожидание" />
                    <Steps.Step title="Производство" />
                    <Steps.Step title="В пути" />
                    <Steps.Step title="Доставлено" />
                </Steps>
            </div>
            {order.status === 'pending' && (
                <div>
                     <Button type="primary" danger onClick={() => handleCancel(order._id)} >Отменить заказ</Button>
                 </div>
             )}
        </div>
    )
}

const Item = ({ item }) => {
    const { width } = useWindowWidth()

    return (
        <List.Item style={{ width: '100%' }}>
            <Descriptions layout={width < 430 ? 'vertical' : 'horizontal'} column={1} size="small" bordered style={{ width: '100%' }}>
                <Descriptions.Item label="Название" labelStyle={{ minWidth: '150px' }}>
                    {item.good.name}
                </Descriptions.Item>
                <Descriptions.Item label="Количество" contentStyle={{ width: '100%' }}>
                    {item.amount}
                </Descriptions.Item>
                {!!item?.characteristics.some(c => !!c.value) && (
                    <Descriptions.Item label="Характеристики" contentStyle={{ width: '100%' }}>
                        {item.characteristics.map(c => c?.value && (
                            <p key={c?.title}>{`${getTitleDescription(c?.title)}: ${c?.value}`}</p>
                        ))}
                    </Descriptions.Item>
                )}
                {item?.attachments.length > 0 && (
                    <Descriptions.Item label="Вложения" contentStyle={{ width: '100%' }}>
                        {item.attachments.map((a, id) => (
                            <p key={a.name}>
                                <a href={a.url} target="_blank">{`Изображение №${id + 1}`}</a>
                            </p>
                        ))}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </List.Item>
    )
}

export default Admin


const getStatusOrder = status => {
    switch (status) {
        case 'pending':
            return 0
        case 'production':
            return 1    
        case 'delivery': 
            return 2
        case 'delivered':
            return 3
        default:
            return 0
    }
}

const getStatusLabel = value => {
    switch(value) {
        case 0:
            return 'pending'
        case 1:
            return 'production'
        case 2:
            return 'delivery'
        case 3:
            return 'delivered'
        default:
            return 'pending'                     
    }
}

const getTitleDescription = title => {
    switch (title) {
        case 'size':
            return 'Размер'
        case 'type':
            return 'Тип'
        default:
             return ''    
        }
}