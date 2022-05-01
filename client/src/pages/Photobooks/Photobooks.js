import { useMemo } from 'react'

import Goods from '../Goods/Goods'
import './photobooks.css'

const Photobooks = ({ goods = [], error = '', loading, moreLoading, onLoadMore }) => {
    const memoizedGoods = useMemo(() => goods, [goods])

    return (
        <Goods goods={memoizedGoods} loading={loading} moreLoading={moreLoading} onLoadMore={onLoadMore} />
    )
}

export default Photobooks