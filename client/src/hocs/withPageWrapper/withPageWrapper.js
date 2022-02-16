import NavigationBar from "../../components/NavigationBar/NavigationBar"
import SideBar from '../../components/SideBar/SideBar'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        padding: '32px 64px',
    }
}

const withPageWrapper = Component => ({ ...rest }) => {

    return (
        <>
            <NavigationBar />
            <div style={styles.container}>
                <SideBar />
                <div style={styles.content}>
                    <Component {...rest} />
                </div>
            </div>
         
        </>
    )
}
export default withPageWrapper