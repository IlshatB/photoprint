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
    PercentageOutlined,
    HomeOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from '@ant-design/icons'

import { ShoppingCartProvider } from '../../providers'
import { useCurrentClient } from '../../hooks'
import { exitClient } from '../../helpers'

import './pageSideBar.css'

const PageSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated } = useCurrentClient()
    const { cartItems } = useSelector(store => store.client)

    const amounts = useMemo(() => {
        let amount = 0
        cartItems.forEach(i => {
            amount += i.amount
        })
        return amount
    }, [cartItems])

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = value => {
        setCollapsed(value)

        const content = document.querySelector('main.ant-layout-content')
        const footer = document.querySelector('footer.ant-layout-footer')

        if (document.body.clientWidth < 600 && !value) {
            content.style.display = 'none';
            footer.style.display = 'none';
        }
        else {
            content.style.display = 'block';
            footer.style.display = 'block';    
        }
    }

    const handleExit = () => {
        exitClient()
        navigate('/home')
    }

    return (
            <Layout.Sider
                width={300}
                collapsible 
                collapsed={collapsed} 
                onCollapse={handleCollapse}
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
                            Главная
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/delivery" icon={<CarOutlined />}>
                        <Link to="/delivery">
                            Доставка
                        </Link>
                    </Menu.Item>
                    {isAuthenticated && (
                        <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
                            <Link to="/cart">
                                Корзина
                                <Badge count={amounts} overflowCount={99} size="small" offset={[15, 0]}>
                                    <span style={{ visibility: 'hidden'}}>|</span>
                                </Badge>
                            </Link>
                        </Menu.Item>    
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="/profile" icon={<ProfileOutlined />}>
                            <Link to="/profile">
                                Профиль
                            </Link>
                        </Menu.Item> 
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="/exit" danger id="ant-menu-item_exit" icon={<LogoutOutlined />} onClick={handleExit}>
                            Выйти
                        </Menu.Item> 
                    )}
                    {!isAuthenticated && (
                        <Menu.Item key="/authentication" icon={<UserOutlined />}>
                            <Link to="/authentication">
                                Войти
                            </Link>
                        </Menu.Item>
                    )}
                    {collapsed ? <Menu.Divider /> : (
                        <Menu.Item key="divider">
                            <Divider plain>УСЛУГИ</Divider>
                        </Menu.Item>   
                    )}
                    <Menu.SubMenu 
                        key="/photobooks" 
                        icon={<BookFilled />}
                        title="ФОТОКНИГИ"
                    >
                        <Menu.SubMenu
                            key="/photobooks_premium"
                            title="ПРЕМИУМ НА ФОТОБУМАГЕ"
                        >
                            <Menu.Item key="/premium_hard">
                                <Link to="/photobooks">
                                    Твердая обложка
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/premium_soft">
                                <Link to="/photobooks">
                                    Мягкая обложка
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/premium_graduation">
                                <Link to="/photobooks">
                                    Выпускные альбомы
                                </Link>                            
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="/fkprnb"
                            title="СТАНДАРТ"
                        >
                            <Menu.Item key="/standart_hard">
                                <Link to="/photobooks">
                                    Твердая обложка
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/standart_soft">
                                <Link to="/photobooks">
                                    Мягкая обложка
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="/photobook_vk">
                            <Link to="/photobooks">
                                Фотокнига Вконтакте
                            </Link>                      
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/photos" icon={<PictureFilled />} title="ФОТОГРАФИИ">
                        <Menu.SubMenu key="/photos_standart" title="СТАНДАРТНЫЕ" >
                            <Menu.Item key="/photos_standart_10x10_10x13-5_10x15">
                                <Link to="/photobooks">10x10; 10x13.5; 10x15</Link> 
                            </Menu.Item>
                            <Menu.Item key="/photos_standart_13x18">
                                <Link to="/photobooks">13x18</Link> 
                            </Menu.Item>
                            <Menu.Item key="/photos_standart_15x20">
                                <Link to="/photobooks">15x20</Link> 
                            </Menu.Item>
                            <Menu.Item key="/photos_standart_20x30_30x45">
                                <Link to="/photobooks">20x30; 30x45</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="/photos_premium" title="ПРЕМИУМ" >
                            <Menu.Item key="/premium_10x15">
                                <Link to="/photobooks">10x15</Link> 
                            </Menu.Item>
                            <Menu.Item key="/premium_15x20">
                                <Link to="/photobooks">15x20</Link> 
                            </Menu.Item>
                            <Menu.Item key="/premium_20x30_30x45">
                                <Link to="/photobooks">20x30; 30x45</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="/photos_other" title="ДРУГИЕ" >
                            <Menu.Item key="/other_with_subscribtion">
                                <Link to="/photobooks">С подписью</Link> 
                            </Menu.Item>
                            <Menu.Item key="/other_polaroid">
                                <Link to="/photobooks">Polaroid</Link> 
                            </Menu.Item>
                            <Menu.Item key="/other_poster">
                                <Link to="/photobooks">Постер</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/interernayapechat" icon={<PrinterOutlined />} title="ИНТЕРЬЕРНАЯ ПЕЧАТЬ">
                        <Menu.SubMenu key="/naholstah" title="НА ХОЛСТАХ" >
                            <Menu.Item key="/holsty">
                                <Link to="/photobooks">Холсты</Link> 
                            </Menu.Item>
                            <Menu.Item key="/holstypremium">
                                <Link to="/photobooks">Холсты Премиум</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/fotosuveniry" icon={<FileImageFilled />} title="ФОТОСУВЕНИРЫ">
                        <Menu.SubMenu key="/forhomeandoffice" title="ДЛЯ ДОМА И ОФИСА" >
                            <Menu.Item key="/per_standart">
                                <Link to="/photobooks">Стандарт</Link> 
                            </Menu.Item>
                            <Menu.Item key="/per_premium">
                                <Link to="/photobooks">Премиум</Link> 
                            </Menu.Item>
                            <Menu.Item key="/per_royal">
                                <Link to="/photobooks">Royal</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/calendars" icon={<CalendarFilled />} title="КАЛЕНДАРИ">
                        <Menu.SubMenu key="/perekidnoy" title="ПЕРЕКИДНОЙ">
                            <Menu.Item key="/perekidnoy_per_standart">
                                <Link to="/photobooks">Стандарт</Link> 
                            </Menu.Item>
                            <Menu.Item key="/perekidnoy_per_premium">
                                <Link to="/photobooks">Премиум</Link> 
                            </Menu.Item>
                            <Menu.Item key="/perekidnoy_per_royal">
                                <Link to="/photobooks">Royal</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="/plakat" title="ПЛАКАТ" >
                            <Menu.Item key="/pl_standart">
                                <Link to="/photobooks">Стандарт</Link> 
                            </Menu.Item>
                            <Menu.Item key="/pl_premium">
                                <Link to="/photobooks">Премиум</Link> 
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/akciiibonusy" icon={<PercentageOutlined />} title="АКЦИИ И БОНУСЫ">
                        <Menu.Item key="/9">
                            <Link to="/photobooks">option9</Link> 
                        </Menu.Item>
                        <Menu.Item key="/10">
                            <Link to="/photobooks">option10</Link> 
                        </Menu.Item>
                        <Menu.Item key="/11">
                            <Link to="/photobooks">option11</Link> 
                        </Menu.Item>
                        <Menu.Item key="/12">
                            <Link to="/photobooks">option12</Link> 
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu> 
            </Layout.Sider>
    )
}

export default PageSideBar

