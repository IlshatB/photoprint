import { withLayout } from '../../hocs'

const Empty = ({ children }) => {
    return (
        <div>
            <h1>Not implemented</h1>
            {children ?? ''}
        </div>
    )
}

const NotImplemented = () => {
    const EmptyWithLayout = withLayout(Empty)

    return <EmptyWithLayout />
}

export default NotImplemented