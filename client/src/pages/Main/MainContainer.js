import { withLayout } from '../../hocs'
import Main from './Main'

const MainContainer = () => {
    const MainWithLayout = withLayout(Main)
    
    return <MainWithLayout  />
}

export default MainContainer