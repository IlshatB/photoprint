import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { updateCart } from '../../store/client/actions'

const useCart = () => {
    const dispatch = useDispatch()

    const handleRemoveItem = useCallback((item, cartItems) => {
        const items = cartItems.map(i => i._id === item._id ? ({ ...item, amount: i.amount - 1 }) : i).filter(i => i.amount > 0)
        dispatch(updateCart(items))
    }, [dispatch])

    const handleAddItem = useCallback((item, cartItems) => {
        const isFound = cartItems.find(i => i._id === item._id)
        const items = isFound ? cartItems.map(i => i._id === item._id ? ({ ...item, amount: i.amount + 1}) : i) : [ ...cartItems, { ...item, amount: 1 }]
        dispatch(updateCart(items))
    }, [dispatch])
    
    const handleSaveCart = useCallback(async (cartItems, clientId) => {
        try {
            const items = cartItems.map(i => ({ good: i._id, amount: i.amount }))
            await axios.patch(`/api/goods/save/cart/${clientId}`, { items }, { headers: { "Content-Type": "application/json" } })
        } catch(e) {
            console.log(e)
        }
    }, [dispatch])

    return {
        onAdd: handleAddItem,
        onRemove: handleRemoveItem,
        onSave: handleSaveCart,
    }
}

export default useCart