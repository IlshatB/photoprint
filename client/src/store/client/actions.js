import axios from 'axios'
import { UPDATE_CLIENT, UPDATE_CART } from './types'

export const updateClient = (payload) => ({
    type: UPDATE_CLIENT,
    payload,
})

export const loginClient = token => async dispatch => {
    try {
        const { data } = await axios.get('/api/auth/client', { headers: { Authorization: `Bearer ${token}` } })
        const { id, email, cartItems = [], isAdmin = false } = data.client
        const items = cartItems.map(i => ({ ...i, ...i.good, good: undefined }))

        dispatch({
            type: UPDATE_CLIENT,
            payload: { id, email, cartItems: items, isAdmin }
        });
    } catch (err) {
      console.log(err)
    }
}

export const updateCart = cartItems => ({ 
    type: UPDATE_CART, 
    payload: { 
        cartItems 
    },
})
