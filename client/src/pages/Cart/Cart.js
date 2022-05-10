import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { Row, Col, Typography, Button, Modal, Progress } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import { loginClient } from '../../store/client/actions'
import { useConfig, useCurrentClient } from '../../hooks'

import OrderContainer from './Order'
import CartItem from './CartItem'
import useCart from './useCart'

const Cart = () => {
    const { cartItems = [], id: clientId } = useSelector(store => store.client)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { onAdd, onRemove } = useCart()
    const config = useConfig()
    const { token } = useCurrentClient()

    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)

    const cost = useMemo(() => {
        let value = 0
        cartItems.forEach(i => {
            value += i.amount * (i.good.sale ? (i.good.price * (100 - i.good.sale) / 100) : i.good.price)
        })
        return value
    }, [cartItems])

    const handleMakeOrder = async values => {
        const items = cartItems.map(i => ({ ...i, good: i.good._id }))
        
        const variables = {
            date: new Date(),
            status: 'pending',
            cost,
            items,
            client: clientId,
            ...values
        }

        await axios.post('/api/orders/make', variables, config)
        dispatch(loginClient(token))
        navigate('/profile')
    }

    return !!cartItems.length 
        ? (
            <>
                <Row gutter={[32, 32]}>
                    {cartItems.map((item, index) => {
                        return (
                            <Col key={`${item?._id}-${index}`} xs={24} sm={24} md={12} lg={8} xl={6} style={{ userSelect: 'none' }}>
                                <CartItem item={item} onAddItem={() => onAdd(item._id)} onRemoveItem={() => onRemove(item._id)} />
                            </Col>
                        )}
                    )}
                </Row>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={() => setOpen(true)}>
                        Заказать
                    </Button>
                </div>
                <Modal width="70%" cancelText="Назад" okButtonProps={{ style: { display: 'none' } }} onOk={() => {}}  bodyStyle={{ minHeight: '400px' }} title={<OrderTitle progress={progress} />} visible={open} onCancel={() => setOpen(false)}>
                    <OrderContainer items={cartItems} cost={cost} setProgress={setProgress} omMakeOrder={handleMakeOrder} />
                </Modal>
            </>
        )
        : (
            <div style={{ textAlign: 'center', width: '100%' }}>
                <Typography.Text>Ваша корзина пуста</Typography.Text>
            </div>           
        )
}

const OrderTitle = ({ progress }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Title level={5}>Оформление заказа</Typography.Title>
            <Progress type="circle" percent={progress} width={40} style={{ marginRight: 32 }} />
        </div>
    )
}

export default Cart