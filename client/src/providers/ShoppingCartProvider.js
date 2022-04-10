import { createContext, useContext } from 'react'

import { useShoppingCart } from '../hooks'

const ShoppingCartContext = createContext({ amounts: [], items: [], setItems: () => {}})

const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext)
}

const ShoppingCartProvider = ({ children }) => {
    const { amounts, items, onAdd, onRemove } = useShoppingCart() 

    const handleChangeItems = (type, item) => {
        const { id, amount } = item
        // console.log(item)
        if (type === 'add') {
            onAdd(id, amount)
        }
        else if (type === 'remove') {
            onRemove(id, amount)
        }
    }

    return (
        <ShoppingCartContext.Provider value={{ amounts, items, setItems: handleChangeItems }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

ShoppingCartProvider.Context = ShoppingCartContext
ShoppingCartProvider.useContext = useShoppingCartContext

export default ShoppingCartProvider