import { UPDATE_CLIENT, UPDATE_CART } from './types'

const INITIAL_STATE = {
    id: '',
    email: '',
    cartItems: [],
    orders: [],
    isAdmin: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CLIENT:
        const { payload } = action
        const { id, email, cartItems, isAdmin = false } = payload
        return { 
          ...state, 
          id, 
          email,
          cartItems,
          isAdmin,
        }
    case UPDATE_CART:
        return { ...state, cartItems: action.payload.cartItems }
    default:
        return state
  }
};