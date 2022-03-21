// import { useState } from 'react'

import { Container, Dropdown, Menu, Icon, Segment } from 'semantic-ui-react'

const NavigationBar = ({ tab }) => {
    // const [activeTab, setActiveTab] = useState(tab)

    return (
        // <Segment inverted style={{ borderRadius: 0 }}></Segment>
        <Container fluid>
            <Menu inverted>
                <Menu.Item>Панель</Menu.Item>
                <Menu.Menu position="right">
                    <Dropdown text='ФОТОКНИГИ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='ПРЕМИУМ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Твердая обложка</Dropdown.Item>
                                        <Dropdown.Item>Мягкая обложка</Dropdown.Item>
                                        <Dropdown.Item>Выпускные альбомы</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ИДЕИ ФОТОКНИГ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Фотокнига Вконтакте</Dropdown.Item>
                                        <Dropdown.Item>Фотокнига Instagram</Dropdown.Item>
                                        <Dropdown.Item>Свадебные фотокниги</Dropdown.Item>
                                        <Dropdown.Item>Фотокниги о путешествиях</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ФОТОКНИГИ СТАНДАРТ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Твердая обложка</Dropdown.Item>
                                        <Dropdown.Item>Мягкая обложка</Dropdown.Item>
                                        <Dropdown.Item>Фотоброшюры</Dropdown.Item>
                                        <Dropdown.Item>Фотоальбом на пружине</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ФОТОКНИГА ROYAL'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Твердая обложка</Dropdown.Item>
                                        <Dropdown.Item>Выпускные альбомы ROYAL</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДОПОЛНИТЕЛЬНО'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Именная Ми-ми-мишная книга</Dropdown.Item>
                                        <Dropdown.Item>Детская именная книга</Dropdown.Item>
                                        <Dropdown.Item>Новогодняя именная книга</Dropdown.Item>
                                        <Dropdown.Item>Детские лабиринты</Dropdown.Item>
                                        <Dropdown.Item>Подарочный сертификат</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ЭТО ИНТЕРЕСНО'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Как напечатать макет из PDF</Dropdown.Item>
                                        <Dropdown.Item>Как конвертировать макет</Dropdown.Item>
                                        <Dropdown.Item>Что такое фотокнига Премиум</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='ФОТОГРАФИИ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='СТАНДАРТНЫЕ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>10x10; 10x13,5; 10x15</Dropdown.Item>
                                        <Dropdown.Item>13x18</Dropdown.Item>
                                        <Dropdown.Item>15x20</Dropdown.Item>
                                        <Dropdown.Item>20x30; 30x45</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ПРЕМИУМ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>10x15</Dropdown.Item>
                                        <Dropdown.Item>15x20</Dropdown.Item>
                                        <Dropdown.Item>20x30; 30x45</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='УСЛУГИ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Сканирование и проявка фотопленки</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='БОЛЬШОЙ ФОРМАТ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Фотографии большого формата</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДРУГИЕ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Фотографии с подписью</Dropdown.Item>
                                        <Dropdown.Item>Фотографии Polaroid</Dropdown.Item>
                                        <Dropdown.Item>Фотографии Instagram</Dropdown.Item>
                                        <Dropdown.Item>Постеры</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='ИНТЕРЬЕРНАЯ ПЕЧАТЬ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='ПЕЧАТЬ НА ХОЛСТАХ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Холсты</Dropdown.Item>
                                        <Dropdown.Item>Холсты Премиум</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ФОТОБОКСЫ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Фотобокс</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ПЕЧАТЬ НА ПЕНОКАРТОНЕ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Пенокартон</Dropdown.Item>
                                        <Dropdown.Item>Модульные картины</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ПЕЧАТЬ ПО ДЕРЕВУ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Печать по дереву</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ПЕЧАТЬ НА АКРИЛЕ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Акрил</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДОПОЛНИТЕЛЬНО'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Постеры</Dropdown.Item>
                                        <Dropdown.Item>Подарочный сертификат</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='ФОТОСУВЕНИРЫ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='ДЛЯ ДОМА И ОФИСА'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Кружки</Dropdown.Item>
                                        <Dropdown.Item>Магниты</Dropdown.Item>
                                        <Dropdown.Item>Постеры</Dropdown.Item>
                                        <Dropdown.Item>Настольный акрил</Dropdown.Item>
                                        <Dropdown.Item>Тетради и блокноты</Dropdown.Item>
                                        <Dropdown.Item>Наклейки</Dropdown.Item>
                                        <Dropdown.Item>Дипломы</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДЛЯ ДЕТЕЙ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Пазлы</Dropdown.Item>
                                        <Dropdown.Item>Тетради</Dropdown.Item>
                                        <Dropdown.Item>Наклейки на тетради</Dropdown.Item>
                                        <Dropdown.Item>Дипломы</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ОДЕЖДА И ТЕКСТИЛЬ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Футболки женские</Dropdown.Item>
                                        <Dropdown.Item>Футболки мужские</Dropdown.Item>
                                        <Dropdown.Item>Свитшоты</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДОПОЛНИТЕЛЬНО'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Instagram постер(плакат)</Dropdown.Item>
                                        <Dropdown.Item>Подарочный сертификат</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='КАЛЕНДАРИ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='КАЛЕНДАРЬ ПЕРЕКИДНОЙ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Стандарт</Dropdown.Item>
                                        <Dropdown.Item>Премиум</Dropdown.Item>
                                        <Dropdown.Item>Royal</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='КАЛЕНДАРЬ ПЛАКАТ'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Стандарт</Dropdown.Item>
                                        <Dropdown.Item>Премиум</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='ДОПОЛНИТЕЛЬНО'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Instagram календарь</Dropdown.Item>
                                        <Dropdown.Item>Магнитный календарь</Dropdown.Item>
                                        <Dropdown.Item>Календарь настольный</Dropdown.Item>
                                        <Dropdown.Item>Карманный календарик</Dropdown.Item>
                                        <Dropdown.Item>Ваш уникальный календарь</Dropdown.Item>
                                        <Dropdown.Item>Календари на 2022</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='АКЦИИ И БОНУСЫ' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Dropdown text='СЕГОДНЯ В ЭФИРЕ' >
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Третий сувенир в подарок</Dropdown.Item>
                                        <Dropdown.Item>Скидка 50% доп.развороты фотокниг</Dropdown.Item>
                                        <Dropdown.Item>20 больших фото в подарок</Dropdown.Item>
                                        <Dropdown.Item>Фотомарафон</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <Dropdown text='БОНУСНАЯ ПРОГРАММА'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Подарочный сертификат</Dropdown.Item>
                                        <Dropdown.Item>Все о бонусной программе</Dropdown.Item>
                                        <Dropdown.Item>Бонусные сертификаты</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item>УСЛУГИ И СЕРВИСЫ</Menu.Item>
                </Menu.Menu>
            </Menu>
        </Container>
    )
}

export default NavigationBar
