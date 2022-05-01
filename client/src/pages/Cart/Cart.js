import { useSelector } from 'react-redux'
import { Row, Col, Typography, Button } from 'antd'

import CartItem from './CartItem'
import useCart from './useCart'

const Cart = () => {
    const { id: clientId, cartItems = [] } = useSelector(store => store.client)
    const { onAdd, onRemove, onSave } = useCart()

    return (
        <>
            {cartItems.length > 0 && (
                <Typography.Text>
                    <Button 
                        size="small" 
                        style={{ backgroundColor: 'transparent', marginBottom: 16 }} 
                        onClick={() => onSave(cartItems, clientId)}
                    >
                        Сохранить
                    </Button> корзину?
                </Typography.Text>
            )}
            <Row gutter={[32, 32]}>
                {!!cartItems.length ? cartItems.map((item, index) => {
                    return (
                        <Col key={`${item?._id}-${index}`} xs={24} sm={24} md={12} lg={8} xl={6} style={{ userSelect: 'none' }}>
                            <CartItem item={item} onAddItem={() => onAdd(item, cartItems)} onRemoveItem={() => onRemove(item, cartItems)} />
                        </Col>
                    )
                }) : (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <Typography.Text>Ваша корзина пуста</Typography.Text>
                    </div>
                )}
            </Row>
        </>
    )
}

export default Cart