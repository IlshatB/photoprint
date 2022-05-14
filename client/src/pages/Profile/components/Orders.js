import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { Typography, Collapse, Steps, Descriptions, List, Modal, Button } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

import { useCurrentClient, useConfig, useWindowWidth } from '../../../hooks'
import { loginClient } from '../../../store/client/actions'

const Orders = ({ client }) => {
    const dispatch = useDispatch()
    const config = useConfig()
    const { token } = useCurrentClient()
    
    const inProgressOrders = useMemo(() => {
        return client.orders.filter(o => o.status !== 'delivered' && o.status !== 'canceled')
    }, [client])

    const doneOrders = useMemo(() => {
        return client.orders.filter(o => o.status === 'delivered')
    }, [client])

    const handleCancelConfirm = async id => {
        try {
            await axios.patch(`/api/orders/cancel/${id}`, {}, config)
            dispatch(loginClient(token))
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

    return !!client.orders.length 
        ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Title level={5}>Активные заказы</Typography.Title>
                {!!inProgressOrders.length && (
                    <Collapse accordion>     
                        {inProgressOrders.map(o => {
                            return (
                                <Collapse.Panel key={o._id} header={`Заказ №${o._id}`}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}> 
                                        <Typography.Text type="secondary" style={{ marginBottom: 8 }}>Детали заказа:</Typography.Text>
                                        <Descriptions column={1} size="small">
                                            <Descriptions.Item label="Цена">{`${o.cost} руб.`}</Descriptions.Item>
                                            <Descriptions.Item label="Дата заказа">{dayjs(o.date).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
                                            <Descriptions.Item label="Адрес">{o.address}</Descriptions.Item>
                                            <Descriptions.Item label="Доставка">{o.delivery === 'courier' ? "Курьером" : 'Почтой'}</Descriptions.Item>
                                            <Descriptions.Item label="Оплата">{o.paymentType === 'cash' ? "Наличными" : 'Картой'}</Descriptions.Item>
                                        </Descriptions>
                                        <List
                                            dataSource={o.items}
                                            renderItem={item => <Item item={item} />}
                                        />
                                        <Typography.Text type="secondary" style={{ marginBottom: 8, marginTop: 32 }}>Статус заказа:</Typography.Text>
                                        <Steps direction="vertical" current={getStatusOrder(o.status)} size="small">
                                            <Steps.Step title="Ожидание" description="Ожидание подтверждения" />
                                            <Steps.Step title="Производство" description="Подготовка заказа" />
                                            <Steps.Step title="В пути" description="Доставка заказа" />
                                            <Steps.Step title="Доставлено" description="Заказ доставлен" />
                                        </Steps>
                                        {o.status === 'pending' && (
                                            <div>
                                                <Button type="primary" danger onClick={() => handleCancel(o._id)} >Отменить заказ</Button>
                                            </div>
                                        )}
                                    </div>
                                </Collapse.Panel> 
                            )
                        }
                    )}                
                </Collapse>
                )}
                <Typography.Title level={5} style={{ marginTop: 16 }}>История заказов</Typography.Title>
                {!!doneOrders.length && (
                    <Collapse bordered={false} accordion>
                        {doneOrders.map(o => {
                            return (
                                <Collapse.Panel key={o._id} header={`Заказ №${o._id}`}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}> 
                                        <Typography.Text type="secondary" style={{ marginBottom: 8 }} disabled>Детали заказа:</Typography.Text>
                                        <Descriptions column={1} size="small" contentStyle={styles.done} labelStyle={styles.done}>
                                            <Descriptions.Item label="Цена">{`${o.cost} руб.`}</Descriptions.Item>
                                            <Descriptions.Item label="Дата заказа">{dayjs(o.date).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
                                            <Descriptions.Item label="Адрес">{o.address}</Descriptions.Item>
                                            <Descriptions.Item label="Доставка">{o.delivery === 'courier' ? "Курьером" : 'Почтой'}</Descriptions.Item>
                                            <Descriptions.Item label="Оплата">{o.paymentType === 'cash' ? "Наличными" : 'Картой'}</Descriptions.Item>
                                        </Descriptions>
                                        <List
                                            dataSource={o.items}
                                            renderItem={item => <Item item={item} done />}
                                        />
                                    </div>
                                </Collapse.Panel> 
                        )})}
                    </Collapse>
                )}
            </div>
        )
        : (
            <div style={{ textAlign: 'center', width: '100%' }}>
                <Typography.Text>У вас нет заказов</Typography.Text>
            </div>
        )
}

const Item = ({ item, done = false }) => {
    const { width } = useWindowWidth()

    return (
        <List.Item style={{ width: '100%' }}>
            <Descriptions layout={width < 430 ? 'vertical' : 'horizontal'} column={1} size="small" bordered style={{ width: '100%' }} contentStyle={done && styles.done} labelStyle={done && styles.done}>
                <Descriptions.Item label="Название" labelStyle={{ minWidth: '150px' }}>
                    {item.good.name}
                </Descriptions.Item>
                <Descriptions.Item label="Количество" contentStyle={{ width: '100%' }}>
                    {item.amount}
                </Descriptions.Item>
                {!!item?.characteristics.some(c => !!c.value) && (
                    <Descriptions.Item label="Характеристики" contentStyle={{ width: '100%' }}>
                        {item.characteristics.map(c => c?.value && (
                            <p key={c?.title} style={{ ...(done && styles.done)}}>{`${getTitleDescription(c?.title)}: ${c?.value}`}</p>
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

export default Orders

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

const styles = {
    done: {
        color: 'rgba(0,0,0,.25)',
    }
}