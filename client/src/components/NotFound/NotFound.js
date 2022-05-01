import { Result } from "antd"

import { withLayout} from '../../hocs'

const NotFound = ({ error }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Result
                status="404"
                title="404"
                subTitle={error ?? 'Страница не найдена'}
            />
        </div>
    )
}

const NotFoundContainer = ({ title }) => {
    const NotFoundWithLayout = withLayout(NotFound)
    return <NotFoundWithLayout error={title} />
}

export default NotFoundContainer