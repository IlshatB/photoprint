import photobook from '../assets/photobooks/photoBook_1000x1000.jpg'

export const photoBooks = [
    {
        id: '1',
        title: 'Фотокниги 30х30',
        description: 'Солидные фотокниги на плотной премиальной фотобумаге в твердой ламинированной обложке, в которую можно добавить от 10 до 480 фотографий.',
        price: 5000,
        productionTime: '1d',
        image: photobook,
    },
    {
        id: '2',
        title: 'Фотокниги 28x20',
        description: 'Солидные фотокниги на плотной премиальной фотобумаге в твердой ламинированной обложке, в которую можно добавить от 10 до 480 фотографий.',
        price: 3000,
        productionTime: '10h',
        image: photobook,        
    },
    {
        id: '3',
        title: 'Фотокниги 25x25',
        description: 'Солидные фотокниги на плотной премиальной фотобумаге в твердой ламинированной обложке, в которую можно добавить от 10 до 480 фотографий.',
        price: 4000,
        productionTime: '3d',
        image: photobook,        
    },
    {
        id: '4',
        title: 'товар 4',
        description: 'описание товара 4',
        price: 3000,
        productionTime: '40m',
        image: photobook,        
    },
    {
        id: '5',
        title: 'товар 5',
        description: 'описание товара 5',
        price: 4000,
        productionTime: '2h',
        image: photobook,        
    },
]

/** allItems mock */
export const allItems = [...photoBooks]