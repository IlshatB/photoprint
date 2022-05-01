import { Result } from "antd"

import { withLayout} from '../../hocs'

const NotFound = ({ error, withContainer = true }) => {
    return withContainer ? (
        <div style={styles.container}>
            <ErrorResilt error={error} />
        </div>
    ) : <ErrorResilt error={error} />

}

const ErrorResilt = ({ error }) => {
    return  <Result status="404" title="404" subTitle={error ?? 'Страница не найдена'} />
}

const styles = {
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
    }
}

const NotFoundContainer = ({ title }) => {
    const NotFoundWithLayout = withLayout(NotFound)
    return <NotFoundWithLayout error={title} />
}

NotFoundContainer.View = NotFound
export default NotFoundContainer

