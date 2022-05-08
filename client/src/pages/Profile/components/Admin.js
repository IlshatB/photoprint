import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

import { List, Typography, Descriptions, Steps } from 'antd'

import { useCurrentClient } from '../../../hooks'

const Admin = () => {
    const { token } = useCurrentClient()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const { data } = await axios.get('/api/orders/fetch', config)
        setOrders(data.orders)
    }

    const config = useMemo(() => ({
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }), [token])

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

    return (
        <div>
            <Link to="new">Новая услуга / товар</Link>
            <div style={{ marginTop: 16 }}>
                <Typography.Title level={5}>Активные заказы</Typography.Title>
                <List 
                    dataSource={orders}
                    renderItem={order => <Order order={order} handleUpdateOrder={handleUpdateOrder} />}
                />
            </div>
        </div>
    )
}

const Order = ({ order, handleUpdateOrder }) => {
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
        </div>
    )
}

const Item = ({ item }) => {
    return (
        <List.Item style={{ width: '100%' }}>
            <Descriptions column={1} size="small" bordered style={{ width: '100%' }}>
                <Descriptions.Item label="Название">
                    {item.good.name}
                </Descriptions.Item>
                <Descriptions.Item label="Количество" contentStyle={{ width: '100%' }}>
                    {item.amount}
                </Descriptions.Item>
                <Descriptions.Item label="Характеристики" contentStyle={{ width: '100%' }}>
                    {item.characteristics.map(c => (
                        <p key={c?.title}>{`${getTitleDescription(c?.title)}: ${c?.value}`}</p>
                    ))}
                </Descriptions.Item>
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