import { UPDATE_CLIENT, UPDATE_CART } from './types'

const INITIAL_STATE = {
    id: '',
    email: '',
    cartItems: [],
    orders: [],
    isAdmin: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CLIENT:
        const { payload } = action
        const { id, email, cartItems, isAdmin = false, orders = [] } = payload
        return { 
          ...state, 
          id, 
          email,
          cartItems,
          isAdmin,
          orders,
        }
    case UPDATE_CART:
        return { ...state, cartItems: action.payload }
    default:
        return state
  }
}

export default reducer