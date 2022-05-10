import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { fetchCart } from '../../store/client/actions'
import { useCurrentClient, useConfig } from '../../hooks'

const useCart = () => {
    const dispatch = useDispatch()    
    const config = useConfig()
    const { token } = useCurrentClient()

    const handleInsert = useCallback(async ({ good, characteristics = [] }) => {
        try {
            await axios.put(`/api/cart/item/insert`, { good, characteristics }, config)
            dispatch(fetchCart(token))
        } catch(e) {
            console.log(e)
        }
    }, [token, dispatch, config])

    const handleAdd = useCallback(async id => {
        try {
            await axios.patch(`/api/cart/item/add/${id}`, {}, config)
            dispatch(fetchCart(token))
        } catch(e) {
            console.log(e)
        }
    }, [token, dispatch, config])

    const handleRemove = useCallback(async id => {
        try {
            await axios.patch(`/api/cart/item/remove/${id}`, {}, config)
            dispatch(fetchCart(token))
        } catch(e) {
            console.log(e)
        }
    }, [token, dispatch, config])

    return {
        onInsert: handleInsert,
        onAdd: handleAdd,
        onRemove: handleRemove,
    }
}

export default useCart