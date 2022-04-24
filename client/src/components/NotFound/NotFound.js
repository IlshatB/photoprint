import { Typography } from "antd"

import { withLayout} from '../../hocs'

const NotFound = ({ error }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography.Title type="warning" level={1}>
                404. {` ${error ?? 'Не найдено'}`}
            </Typography.Title>
        </div>
    )
}

const NotFoundContainer = ({ title }) => {
    const NotFoundWithLayout = withLayout(NotFound)
    return <NotFoundWithLayout error={title} />
}

export default NotFoundContainer