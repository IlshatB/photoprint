import { useEffect, useState } from 'react'
import axios from 'axios'
import { withLayout } from '../../hocs'

import Goods from '../Goods/Goods'

const paths = [
    { value: 'Главная', url: '/home' },
    { value: 'Фотосувениры', url: '/souvenirs' },
]

const SouvenirsContainer = () => {
    const [limit, setLimit] = useState(6)
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState()
    const [moreLoading, setMoreLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {
            if (!moreLoading) setLoading(true)

            try {
                const { data } = await axios.get(`/api/goods/fetch/goods/souvenirs&${limit}`, { headers: { "Content-Type": "application/json" } })
                setGoods(data.goods)

                setTimeout(() => {
                    setLoading(false)
                    setMoreLoading(false)
                }, !moreLoading ? 250 : 750)
            } catch (e) {
                setError(e.response.data)
            }
        }

        fetchData(limit)
    }, [limit, moreLoading])

    const handleOnLoadMore = () => {
      setLimit(limit => limit + 6)
      setMoreLoading(true)
    }

    const SouvenirsWithLayout = withLayout(Souvenirs)
    return (
        <SouvenirsWithLayout
          title="Фотосувениры"
          paths={paths}
          goods={goods}
          error={error} 
          loading={loading}
          moreLoading={moreLoading}
          onLoadMore={handleOnLoadMore} 
        />
    )
}

const Souvenirs = ({ goods = [], loading, moreLoading, onLoadMore }) => {
    return (
        <Goods goods={goods} loading={loading} moreLoading={moreLoading} onLoadMore={onLoadMore} />
    )
}

export default SouvenirsContainer