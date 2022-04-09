import { withLayout } from '../../hocs'
import Photobooks from './Photobooks'

const PhotobooksContainer = () => {
    const PhotobooksWithLayout = withLayout(Photobooks)
    
    return <PhotobooksWithLayout />
}

export default PhotobooksContainer