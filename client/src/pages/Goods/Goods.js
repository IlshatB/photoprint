import { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Row, Button, notification } from 'antd'

import { useCurrentClient } from '../../hooks'
import useCart from '../Cart/useCart'
import GoodItem from './GoodItem'

const Goods = ({ goods = [], loading = false, moreLoading = false, onLoadMore }) => {
    const { cartItems } = useSelector(store => store.client)
    const { onAdd } = useCart()

    const { isAuthenticated } = useCurrentClient()

    const memoizedCartItems = useMemo(() => cartItems, [cartItems])

    const handleAddItem = useCallback(good => {
        const item = { _id: good._id, name: good.name, subDescription: good.subDescription ?? '', price: good.price }
        if (isAuthenticated) {  
            onAdd(item, memoizedCartItems)
        }
        else notificate()
    }, [isAuthenticated, memoizedCartItems, onAdd])

    return (
        <>
            <Row gutter={[{ lg: 32,  xl: 32, xxl: 64 }, 64]} type="flex">
                {!loading 
                    ? goods.map(good => (
                        <GoodItem key={good._id} good={good} onAddItem={handleAddItem} />
                    )) 
                    : Array.from(Array(6).keys()).map((_, id) => (
                        <GoodItem.Loading key={`loading-${id}`} />
                    )) 
                }
            </Row>
            {!loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                    <Button type="primary" loading={moreLoading} onClick={onLoadMore}>Показать больше</Button>
                </div>
            )}
        </>
    )
}

export default Goods 

const notificate = () => {
    notification['error']({
        message: 'Вы не авторизованы',
        description: 'Чтобы добавить товар в корзину, авторизуйтесь!',
        placement: 'top',
    })
}