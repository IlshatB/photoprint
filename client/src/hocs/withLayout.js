import { Layout } from 'antd'

import Sidebar from '../components/Sidebar/Sidebar'

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

const withLayout = Component => ({ ...rest }) => {

    return (
       <Layout style={{ height: '100%' }}>
            <Layout hasSider style={{ height: '100%' }} >
                <Sidebar />
                <Layout style={{ height: '100%' }}>
                    <Layout.Content style={{ height: '100%' }}>
                        <Component {...rest} />
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>PhotoPrint ©2022</Layout.Footer>
                </Layout>
            </Layout>
       </Layout>
    )
}
export default withLayout