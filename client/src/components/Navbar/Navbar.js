import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import { 
    HomeOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';

const Navbar = () => {
    return (
        <>
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/home">
                    Главная
                </Link>
            </Menu.Item>
            <Menu.Item key="delivery" icon={<CarOutlined />}>
                <Link to="/delivery">
                    Доставка
                </Link>
            </Menu.Item>
            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    Корзина
                </Link>
            </Menu.Item>
            <Menu.Item key="authentication" icon={<UserOutlined />}>
                <Link to="/authentication">
                    Войти
                </Link>
            </Menu.Item>
        </>
    )
}

export default Navbar

