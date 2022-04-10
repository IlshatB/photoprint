import { withLayout } from '../../hocs'
import { ShoppingCartProvider } from '../../providers'

import Photobooks from './Photobooks'

const PhotobooksContainer = () => {
    const { setItems } = ShoppingCartProvider.useContext()

    const handleAddItem = id => {
      setItems('add', { id, amount: 1 })
    }

    const PhotobooksWithLayout = withLayout(Photobooks)
    
    const paths = [
        { value: 'Главная', url: '/home' },
        { value: 'Фотокниги', url: '/photobooks' },
    ]

    return <PhotobooksWithLayout title="Фотокниги" paths={paths} onAddItem={handleAddItem} />
}

export default PhotobooksContainer