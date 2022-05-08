import { useSelector } from 'react-redux'
import { Row, Col, Typography, Drawer } from 'antd'
import CartItem from './CartItem'
import useCart from './useCart'

const CartDrawer = ({ open, onClose }) => {
    const { cartItems = [] } = useSelector(store => store.client)
    const { onAdd, onRemove } = useCart()

    return (
        <Drawer title="Корзина" placement="right" onClose={onClose} visible={open}>
            <Row gutter={[16, 16]}>
                {!!cartItems.length ? cartItems.map(item => (
                    <Col key={item._id} xs={24} style={{ userSelect: 'none' }}>
                        <CartItem item={item} onAddItem={() => onAdd(item, cartItems)} onRemoveItem={() => onRemove(item, cartItems)} />
                    </Col>
                )) : (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <Typography.Text>Ваша корзина пуста</Typography.Text>
                    </div>
                )}
            </Row>
        </Drawer>
    )
} 

export default CartDrawer