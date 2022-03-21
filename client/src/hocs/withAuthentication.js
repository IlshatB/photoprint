import NotImplemented from '../pages/NotImplemented/NotImplemented'

const withAuthentication = Component => ({ ...rest }) => {

    return (
        <NotImplemented>
            <Component {...rest} />
        </NotImplemented>
    )
}
export default withAuthentication