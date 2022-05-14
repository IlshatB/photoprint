import { createContext, useState } from 'react'

export const CartContext = createContext({ loading: false, setLoading: () => {}})

export const CartProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    return (
        <CartContext.Provider value={{ loading, setLoading }}>
            {children}
        </CartContext.Provider>
    )
}
