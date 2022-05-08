import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Typography, Collapse, Steps, Descriptions, List } from "antd"

const Orders = ({ client }) => {
    const inProgressOrders = useMemo(() => {
        return client.orders.filter(o => o.status !== 'delivered')
    }, [client])

    const doneOrders = useMemo(() => {
        return client.orders.filter(o => o.status === 'delivered')
    }, [client])

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
    return (
        <List.Item style={{ width: '100%' }}>
            <Descriptions column={1} size="small" bordered style={{ width: '100%' }} contentStyle={done && styles.done} labelStyle={done && styles.done}>
                <Descriptions.Item label="Название">
                    {item.good.name}
                </Descriptions.Item>
                <Descriptions.Item label="Количество" contentStyle={{ width: '100%' }}>
                    {item.amount}
                </Descriptions.Item>
                <Descriptions.Item label="Характеристики" contentStyle={{ width: '100%' }}>
                    {item.characteristics.map(c => (
                        <p key={c?.title} style={{ ...(done && styles.done)}}>{`${getTitleDescription(c?.title)}: ${c?.value}`}</p>
                    ))}
                </Descriptions.Item>
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