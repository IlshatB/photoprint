import NavigationBar from "../components/NavigationBar/NavigationBar"
import SideBar from '../components/SideBari/SideBar'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: '1',

    },
    content: {
        padding: '0 32px',
        height: '100%',
        width: '100%',
    }
}

const withPageWrapper = Component => ({ ...rest }) => {

    return (
        <>
            {/* <NavigationBar /> */}
            <div style={styles.container}>
                <SideBar />
                <div style={styles.content}>
                    <Component {...rest} />
                </div>
            </div>
            <div>123</div>
        </>
    )
}
export default withPageWrapper