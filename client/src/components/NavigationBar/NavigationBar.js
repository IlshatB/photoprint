// import { useState } from 'react'

import { Dropdown, Menu, Icon, Segment } from 'semantic-ui-react'

const NavigationBar = ({ tab }) => {
    // const [activeTab, setActiveTab] = useState(tab)

    return (
       <Segment inverted style={{ borderRadius: 0}}>
            <Menu inverted>
                <Menu.Item>Панель</Menu.Item>
                <Menu.Menu position="right">
                    <Dropdown text='ФОТОКНИГИ' pointing className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Header>ПРЕМИУМ</Dropdown.Header>
                        <Dropdown.Item>Твердая обложка</Dropdown.Item>
                        <Dropdown.Item>Мягкая обложка</Dropdown.Item>
                        <Dropdown.Item>Выпускные альбомы</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>ИДЕИ ФОТОКНИГ</Dropdown.Header>
                        <Dropdown.Item>Фотокнига ВКонтакте</Dropdown.Item>
                        <Dropdown.Item>Фотокнига Instagram</Dropdown.Item>
                        <Dropdown.Item>Свадебные фотокниги</Dropdown.Item>
                        <Dropdown.Item>Фотокниги о путешествиях</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item>ФОТОГРАФИИ</Menu.Item>
                    <Menu.Item>ИНТЕРЬЕРНАЯ ПЕЧАТЬ</Menu.Item>
                    <Menu.Item>ФОТОСУВЕНИРЫ</Menu.Item>
                    <Menu.Item>КАЛЕНДАРИ</Menu.Item>
                    <Menu.Item>АКЦИИ И БОНУСЫ</Menu.Item>
                    <Menu.Item>УСЛУГИ И СЕРВИСЫ</Menu.Item>
                </Menu.Menu>
            </Menu>
       </Segment>
    )
}

export default NavigationBar
