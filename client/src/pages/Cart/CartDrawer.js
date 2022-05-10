import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { Row, Col, Typography, Drawer, Button, Progress } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import { loginClient } from '../../store/client/actions'
import { useCurrentClient, useConfig } from '../../hooks'

import OrderContainer from './Order'
import CartItem from './CartItem'
import useCart from './useCart'

const CartDrawer = ({ open, onClose }) => {
    const { cartItems = [], id: clientId } = useSelector(store => store.client)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { onAdd, onRemove } = useCart()
    const config = useConfig()
    const { token } = useCurrentClient()

    const [showChild, setShowChild] = useState(false)

    const orderCost = useMemo(() => {
        let cost = 0
        cartItems.forEach(i => {
            let itemCost = i.good.price
            i.characteristics.forEach(c => {
                itemCost += (c?.cost || 0)
            })

            cost += (itemCost * (100 - (i.good.sale || 0)) / 100) * i.amount
        })
        return cost
    }, [cartItems])

    const expandedItems = useMemo(() => {
        return cartItems.map(i => {
            let itemCost = i.good.price
            i.characteristics.forEach(c => {
                itemCost += (c?.cost || 0)
            })

            return { ...i, totalCost: (itemCost * (100 - (i.good.sale || 0)) / 100) }
        })
    }, [cartItems])

    const handleMakeOrder = async values => {
        const items = cartItems.map(i => ({ ...i, good: i.good?._id }))
        
        const variables = {
            date: new Date(),
            status: 'pending',
            cost: orderCost,
            items,
            client: clientId,
            ...values
        }

        await axios.post('/api/orders/make', variables, config)
        dispatch(loginClient(token))
        navigate('/profile')
    }

    return (
        <Drawer title="Корзина" placement="right" onClose={onClose} visible={open}>
            {!!cartItems.length 
                ? (
                    <>
                        <Row gutter={[16, 16]}>
                            {cartItems.map(item => (
                                <Col key={item._id} xs={24} style={{ userSelect: 'none' }}>
                                    <CartItem item={item}  onAddItem={() => onAdd(item._id)} onRemoveItem={() => onRemove(item._id)} />
                                </Col>
                            ))}
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                            <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={() => setShowChild(true)}>
                                Заказать
                            </Button>
                        </div>
                        <Order items={expandedItems} visible={showChild} onClose={() => setShowChild(false)} cost={orderCost} omMakeOrder={handleMakeOrder} />
                    </>
                )
                : (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <Typography.Text>Ваша корзина пуста</Typography.Text>
                    </div> 
                )}
        </Drawer>
    )
} 

const Order = ({ items = [], visible, onClose, cost, omMakeOrder }) => {
    const [progress, setProgress] = useState(0)

    return (
        <Drawer
            title={<OrderTitle progress={progress} />}
            width={320}
            closable={false}
            onClose={onClose} visible={visible}
        >
            <OrderContainer items={items} cost={cost} setProgress={setProgress} omMakeOrder={omMakeOrder} />
        </Drawer>
    )
}

const OrderTitle = ({ progress }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>Оформление заказа</Typography.Title>
            <Progress type="circle" percent={progress} width={40} />
        </div>
    )
}

export default CartDrawer