import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

import { withLayout } from '../../hocs'
import { categories } from '../../helpers'
import NotFound from '../../components/NotFound/NotFound'

import Good from './Good'

const GoodContainer = () => {
    const { goodId } = useParams()
    const location = useLocation()

    const [good, setGood] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/goods/fetch/good/${goodId}`, { headers: { "Content-Type": "application/json" } })
            setGood(data.good)
            setTimeout(() => setLoading(false), 500)
        } catch (e) {
            setError(e.response.data)
        }
    }, [goodId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const category = location.pathname.split('/')[1]
    const categoryTitle = categories[category]
    const goodName = useMemo(() => good?.name ?? 'loading', [good])

    const paths = useMemo(() => {
        return [
            { value: 'Главная', url: '/home' },
            { value: categoryTitle, url: `/${category}` },
            { value: goodName, url: '' },
        ]
    }, [category, categoryTitle, goodName])

    const GoodWithLayout = withLayout(Good)
    return error ? <NotFound title={error} /> : <GoodWithLayout title={goodName} paths={paths} good={good} loading={loading} refetch={fetchData} />
}

export default GoodContainer
