import { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import NotFound from '../../components/NotFound/NotFound'

import Good from './Good'

const GoodContainer = () => {
    const { goodId } = useParams()
    const location = useLocation()

    const [good, setGood] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`/api/goods/fetch/good/${goodId}`, { headers: { "Content-Type": "application/json" } })
                console.log(data)
                setGood(data.good)
            } catch (e) {
                setError(e.response.data)
            }
        }
        fetchData()
    }, [goodId])

    const category = location.pathname.split('/')[1]
    const categoryTitle = getTitle(category)

    const paths = useMemo(() => {
        return [
            { value: 'Главная', url: '/home' },
            { value: categoryTitle, url: `/${category}` },
            { value: good?.name ?? '', url: '' },
        ]
    }, [category, categoryTitle]) 

    const GoodWithLayout = withLayout(Good)
    return error ? <NotFound title={error} /> : <GoodWithLayout title="Профиль" paths={paths} />
}

export default GoodContainer

const getTitle = category => {
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