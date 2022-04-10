import { withLayout } from '../../hocs'
import Cart from './Cart'

const CartContainer = () => {
    const CartWithLayout = withLayout(Cart)

    const paths = [
        { value: 'Главная', url: '/home' },
        { value: 'Корзина', url: '/cart' },
    ]

    return <CartWithLayout title="Корзина" paths={paths} />
}

export default CartContainer