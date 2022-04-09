import { withLayout } from '../../hocs'
import Cart from './Cart'

const CartContainer = () => {
    const CartWithLayout = withLayout(Cart)
    
    return <CartWithLayout  />
}

export default CartContainer