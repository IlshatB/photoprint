import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Layout, Menu, Divider, Badge } from 'antd'
import { 
    BookFilled, 
    CalendarFilled, 
    PictureFilled, 
    FileImageFilled, 
    PrinterOutlined, 
    HomeOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from '@ant-design/icons'

import { useCurrentClient, useWindowWidth } from '../../hooks'

import './pageSideBar.css'

const PageSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated, exit } = useCurrentClient()
    const { width } = useWindowWidth()

    const { cartItems = [] } = useSelector(store => store.client)

    const amounts = useMemo(() => {
        let amount = 0
        cartItems.forEach(i => {
            amount += i.amount
        })
        return amount
    }, [cartItems])

    const [collapsed, setCollapsed] = useState(false)

    const handleCollapse = value => {
        setCollapsed(value)

        const content = document.querySelector('main.ant-layout-content')
        const footer = document.querySelector('footer.ant-layout-footer')

        if (document.body.clientWidth < 600 && !value) {
            content.style.display = 'none'
            footer.style.display = 'none'
        }
        else {
            content.style.display = 'block'
            footer.style.display = 'block'
        }
    }

    const handleExit = () => {
        exit()
        navigate('/home')
    }

    const smallScreenCollapse = !!(width < 992)

    return (
            <Layout.Sider
                width={300}
                collapsible 
                collapsed={smallScreenCollapse ? true : collapsed} 
                trigger={smallScreenCollapse}
                onCollapse={!smallScreenCollapse ? handleCollapse : () => {}}  
                breakpoint="lg"
                style={{ overflow: 'auto'}}
                theme="light"
            >
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to="/home">
                            ??????????????
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/delivery" icon={<CarOutlined />}>
                        <Link to="/delivery">
                            ????????????????
                        </Link>
                    </Menu.Item>
                    {isAuthenticated && (
                        <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
                            <Link to="/cart">
                                ??????????????
                                <Badge count={amounts} overflowCount={99} size="small" offset={[15, 0]}>
                                    <span style={{ visibility: 'hidden'}}>|</span>
                                </Badge>
                            </Link>
                        </Menu.Item>    
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="/profile" icon={<ProfileOutlined />}>
                            <Link to="/profile">
                                ??????????????
                            </Link>
                        </Menu.Item> 
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="/exit" danger id="ant-menu-item_exit" icon={<LogoutOutlined />} onClick={handleExit}>
                            ??????????
                        </Menu.Item> 
                    )}
                    {!isAuthenticated && (
                        <Menu.Item key="/authentication" icon={<UserOutlined />}>
                            <Link to="/authentication">
                                ??????????
                            </Link>
                        </Menu.Item>
                    )}
                    {collapsed || width < 992 ? <Menu.Divider /> : (
                        <Menu.Item key="divider">
                            <Divider plain>????????????</Divider>
                        </Menu.Item>   
                    )}
                    <Menu.Item key="/photobooks" icon={<BookFilled />}>
                        <Link to="/photobooks">??????????????????</Link> 
                    </Menu.Item>

                    <Menu.Item key="/photos" icon={<PictureFilled />}>
                        <Link to="/photos">????????????????????</Link> 
                    </Menu.Item>

                    <Menu.Item key="/print" icon={<PrinterOutlined />}>
                        <Link to="/print">?????????????????????? ????????????</Link> 
                    </Menu.Item>

                    <Menu.Item key="/souvenirs" icon={<FileImageFilled />}>
                        <Link to="/souvenirs">????????????????????????</Link> 
                    </Menu.Item>

                    <Menu.Item key="/calendars" icon={<CalendarFilled />}>
                        <Link to="/calendars">??????????????????</Link> 
                    </Menu.Item>
                </Menu> 
            </Layout.Sider>
    )
}

export default PageSideBar

