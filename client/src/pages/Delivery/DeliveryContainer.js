import { withLayout } from '../../hocs'
import Delivery from './Delivery'

const DeliveryContainer = () => {
    const DeliveryWithLayout = withLayout(Delivery)
    const paths = [
        { value: 'Главная', url: '/home' },
        { value: 'Доставка', url: '' },
    ]

    return <DeliveryWithLayout title="Доставка" paths={paths} />
}

export default DeliveryContainer