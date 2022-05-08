import axios from 'axios'
import { UPDATE_CLIENT, UPDATE_CART } from './types'

const getConfig = token => ({
    headers: { 
        Authorization: `Bearer ${token}`,
    },
})

export const updateClient = payload => ({
    type: UPDATE_CLIENT,
    payload,
})

export const loginClient = token => async dispatch => {
    try {
        const { data } = await axios.get('/api/auth/client', getConfig(token))
        const { id, email, cartItems = [], isAdmin = false, orders = [] } = data.client

        dispatch({
            type: UPDATE_CLIENT,
            payload: { id, email, cartItems, isAdmin, orders }
        });
    } catch (err) {
      console.log(err)
    }
}

export const updateCart = cartItems => ({ 
    type: UPDATE_CART, 
    payload: cartItems,
})

export const fetchCart = token => async dispatch => {
    try {
        const { data } = await axios.get('/api/cart/fetch', getConfig(token))
        dispatch({ type: UPDATE_CART,  payload: data.cartItems })
    } catch (err) {
      console.log(err)
    }
}