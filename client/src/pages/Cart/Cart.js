import { useMemo } from 'react'
import { 
    useSelector, 
    useDispatch 
} from 'react-redux'
import axios from 'axios'
import { Row, Col, Typography, Button } from 'antd'

import { useCurrentClient } from '../../hooks'
import { loginClient } from '../../store/client/actions'

import CartItem from './CartItem'
import useCart from './useCart'

const Cart = () => {
    const { cartItems = [], id: clientId } = useSelector(store => store.client)
    const dispatch = useDispatch()
    const { onAdd, onRemove } = useCart()
    const { token } = useCurrentClient()

    const config = useMemo(() => ({
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }), [token])

    const handleMakeOrder = async () => {
        let cost = 0
        const items = cartItems.map(i => ({ ...i, good: i.good._id }))
        cartItems.forEach(i => {
            cost += i.amount * (i.good.sale ? (i.good.price * (100 - i.good.sale) / 100) : i.good.price)
        })
        
        const variables = {
            date: new Date(),
            status: 'pending',
            cost,
            items,
            client: clientId,
        }

        await axios.post('/api/orders/make', variables, config)
        dispatch(loginClient(token))
    }

    return !!cartItems.length 
        ? (
            <div>
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
                    <Button type="primary" onClick={handleMakeOrder}>Оформить заказ</Button>
                </div>
            </div>
        )
        : (
            <div style={{ textAlign: 'center', width: '100%' }}>
                <Typography.Text>Ваша корзина пуста</Typography.Text>
            </div>           
        )
}

export default Cart