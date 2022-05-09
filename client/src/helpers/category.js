export const getCategoryTitle = category => {
    let title = ''
    switch (category) {
        case 'photobooks':
            title = 'Фотокниги' 
            break;
        default:
            break;
    }

    return title
}

export const categories = {
    photobooks: 'Фотокниги',
    photos: 'Фотографии',
    print: 'Интерьерная печать',
    souvenirs: 'Фотосувениры',
    calendars: 'Календари',
}

export const categoriesList = Object.keys(categories).map((key) => ({ value: key, title: categories[key] }))