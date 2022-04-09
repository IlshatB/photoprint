import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
} from '@ant-design/icons';

import { isAuthenticated } from '../../helpers'

import { ShoppingCartProvider } from '../../providers'

const Sidebar = () => {
    const location = useLocation()
    const { amounts } = ShoppingCartProvider.useContext()

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
                    {isAuthenticated() && (
                        <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
                            <Link to="/cart">
                                Корзина
                                <Badge count={amounts} overflowCount={9} size="small" offset={[15, 0]}>
                                    <span style={{ visibility: 'hidden'}}>|</span>
                                </Badge>
                            </Link>
                        </Menu.Item>    
                    )}
                    {isAuthenticated() && (
                        <Menu.Item key="/authentication" icon={<ProfileOutlined />}>
                            <Link to="/profile">
                                Профиль
                            </Link>
                        </Menu.Item> 
                    )}
                    {!isAuthenticated() && (
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
                    <Menu.SubMenu
                        key="/photos" 
                        icon={<PictureFilled />}
                        title="ФОТОГРАФИИ"
                    >
                        <Menu.SubMenu 
                            key="/photos_standart" 
                            title="СТАНДАРТНЫЕ"
                        >
                            <Menu.Item key="/photos_standart_10x10_10x13-5_10x15">10x10; 10x13.5; 10x15</Menu.Item>
                            <Menu.Item key="/photos_standart_13x18">13x18</Menu.Item>
                            <Menu.Item key="/photos_standart_15x20">15x20</Menu.Item>
                            <Menu.Item key="/photos_standart_20x30_30x45">20x30; 30x45</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu 
                            key="/photos_premium" 
                            title="ПРЕМИУМ"
                        >
                            <Menu.Item key="/premium_10x15">10x15</Menu.Item>
                            <Menu.Item key="/premium_15x20">15x20</Menu.Item>
                            <Menu.Item key="/premium_20x30_30x45">20x30; 30x45</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu 
                            key="/photos_other" 
                            title="ДРУГИЕ"
                        >
                            <Menu.Item key="/other_with_subscribtion">С подписью</Menu.Item>
                            <Menu.Item key="/other_polaroid">Polaroid</Menu.Item>
                            <Menu.Item key="/other_poster">Постер</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu
                        key="/interernayapechat" 
                        icon={<PrinterOutlined />} 
                        title="ИНТЕРЬЕРНАЯ ПЕЧАТЬ"
                    >
                        <Menu.SubMenu
                            key="/naholstah" 
                            title="НА ХОЛСТАХ"
                        >
                            <Menu.Item key="/holsty">Холсты</Menu.Item>
                            <Menu.Item key="/holstypremium">Холсты Премиум</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu
                        key="/fotosuveniry" 
                        icon={<FileImageFilled />}
                        title="ФОТОСУВЕНИРЫ"
                    >
                        <Menu.SubMenu
                            key="/forhomeandoffice"
                            title="ДЛЯ ДОМА И ОФИСА"
                        >
                            <Menu.Item key="/per_standart">Стандарт</Menu.Item>
                            <Menu.Item key="/per_premium">Премиум</Menu.Item>
                            <Menu.Item key="/per_royal">Royal</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="/calendars" 
                        icon={<CalendarFilled />}
                        title="КАЛЕНДАРИ"
                    >
                        <Menu.SubMenu
                            key="/perekidnoy"
                            title="ПЕРЕКИДНОЙ"
                        >
                            <Menu.Item key="/perekidnoy_per_standart">Стандарт</Menu.Item>
                            <Menu.Item key="/perekidnoy_per_premium">Премиум</Menu.Item>
                            <Menu.Item key="/perekidnoy_per_royal">Royal</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="/plakat"
                            title="ПЛАКАТ"
                        >
                            <Menu.Item key="/pl_standart">Стандарт</Menu.Item>
                            <Menu.Item key="/pl_premium">Премиум</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        key="/akciiibonusy" 
                        icon={<PercentageOutlined />} 
                        title="АКЦИИ И БОНУСЫ"
                    >
                        <Menu.Item key="/9">option9</Menu.Item>
                        <Menu.Item key="/10">option10</Menu.Item>
                        <Menu.Item key="/11">option11</Menu.Item>
                        <Menu.Item key="/12">option12</Menu.Item>
                    </Menu.SubMenu>
                </Menu> 
            </Layout.Sider>
    )
}

export default Sidebar

