import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Typography, Divider } from 'antd'

import Sidebar from '../components/Sidebar/Sidebar'

const withLayout = Component => ({ title = '', paths = [],  ...rest }) => {
    return (
       <Layout style={{ minHeight: '100%' }}>
            <Layout hasSider style={{height: '100%'}}>
                <Sidebar />
                <Layout style={{minHeight: '100%'}}>
                    <Layout.Content style={{height: '100%', padding: '0 32px' }}>
                        {title && <Typography.Title level={2}>{title}</Typography.Title>}
                        {paths.length > 0 && (
                            <>
                                {paths.map((p, i) => (
                                    <Link to={p.url} component={Typography.Link} key={p.value}>
                                        {i > 0 ? ' ' : ''}
                                        {p.value}
                                        {i < paths.length - 1 ? ' /' : ''}
                                    </Link>
                                ))}
                                <Divider />
                            </>
                        )}
                        <Component {...rest} />
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>PhotoPrint ©2022</Layout.Footer>
                </Layout>
            </Layout>
       </Layout>
    )
}
export default withLayout