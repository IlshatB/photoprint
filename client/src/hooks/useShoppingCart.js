import { useState } from "react"

const isInCart = (items, id) => {
    return items.some(i => i.id === id)
}

const getAmounts = items => {
    let counter = 0
    items.forEach(i => counter += (i.amount || 0))
    return counter
}

const getCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

    return cartItems
}

const addToCart = (id, amount) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const item = { id, amount }

    const t = isInCart(cartItems, id)
    const items = !t ? [...cartItems, item] : cartItems.map(i => i.id === id ? { id, amount: i.amount + amount} : i)

    if (items.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(items))
    }

}

const removeFromCart = (id, amount) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

    const t = isInCart(cartItems, id)
    if (t) {
        const items = cartItems.map(i => i.id === id ? { id, amount: i.amount - amount} : i).filter(i => i.amount > 0)
        localStorage.setItem('cartItems', JSON.stringify(items))
    }

}

const useShoppingCart = () => {
    const cart = getCart()

    const [items, setItems] = useState(cart)
    const [amounts, setAmounts] = useState(getAmounts(cart))

    const onAdd = (id, amount) => {
        const item = { id, amount }

        const t = isInCart(items, id)
        const newItems = !t ? [...items, item] : items.map(i => i.id === id ? { id, amount: i.amount + amount} : i)
        setItems(newItems)
        setAmounts(getAmounts(newItems))

        addToCart(id, amount)
    }

    const onRemove = (id, amount) => {
        const t = isInCart(items, id)
        if (t) {
            const newItems = items.map(i => i.id === id ? { id, amount: i.amount - amount} : i).filter(i => i.amount > 0)
            setItems(newItems)
            setAmounts(getAmounts(newItems))
        }
  
        removeFromCart(id, amount)
    }
    
    return { items, amounts, onAdd, onRemove }
}

export default useShoppingCart