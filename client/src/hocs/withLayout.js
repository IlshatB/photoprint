import { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, Typography, Divider, Breadcrumb, Affix, Badge, Avatar } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { blue } from '@ant-design/colors'

import { CartContext } from '../providers'
import { useCurrentClient, useWindowWidth } from '../hooks'
import PageSideBar from '../components/PageSideBar/PageSidebar'
import CartDrawer from '../pages/Cart/CartDrawer'

const withLayout = Component => ({ title = '', paths = [],  ...rest }) => {
    const { cartItems = [] } = useSelector(store => store.client)
    const { isAuthenticated } = useCurrentClient()
    const { loading } = useContext(CartContext)
    const { width } = useWindowWidth()
    const [openDrawer, setOpenDrawer] = useState(loading || false)

    const amounts = useMemo(() => {
        let amount = 0
        cartItems.forEach(i => {
            amount += i.amount
        })
        return amount
    }, [cartItems])

    return (
       <Layout style={{ minHeight: '100%' }}>
            <Layout hasSider style={{ height: '100%' }}>
                <PageSideBar />
                <Layout style={{ minHeight: '100%' }}>
                    <Layout.Content style={{ height: '100%', padding: `0 ${width < 700 ? 16 : 32}px` }}>
                        <Typography.Title level={2} style={{ ...(title === 'loading' && { visibility: 'hidden' })}}>{title}</Typography.Title>
                        {paths.length > 0 && (
                            <>
                                <Breadcrumb>
                                    {paths.map(({ value, url }, id) => (
                                        <Breadcrumb.Item key={`${url}-${id}`} style={{ ...(value === 'loading' && { visibility: 'hidden' })}}>
                                            <Link to={url} component={Typography.Link} key={value}>
                                                {value === 'loading' ? '' : value}
                                            </Link>
                                        </Breadcrumb.Item>
                                    ))}
                                </Breadcrumb>
                                <Divider />
                            </>
                        )}
                        <Component {...rest} />
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        PhotoPrint ??2022
                        {isAuthenticated && (
                            <>
                                <Affix style={{ position: 'absolute', bottom: 32, right: 32, cursor: 'pointer', zIndex: 10 }}>
                                    <Badge count={amounts ?? null} overflowCount={99} size="small" >
                                        <Avatar style={{ backgroundColor:  blue[0], color: blue[4] }} shape="square" size="large" icon={<ShoppingCartOutlined />} onClick={() => setOpenDrawer(value => !value)} />
                                    </Badge>
                                </Affix>
                                <CartDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
                            </>
                        )}
                    </Layout.Footer>
                </Layout>
            </Layout>
       </Layout>
    )
}

export default withLayout
