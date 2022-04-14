import jwt_decode from "jwt-decode"

const getCart = () => {
    const token = localStorage.getItem('authToken')
    const { cartItems = [] } = token ? jwt_decode(token) : {}

    return cartItems
}


const useCart = () => {
    const cartItems = getCart()

    // const [items, setItems] = useState(cart)
    // const [amounts, setAmounts] = useState(getAmounts(cart))

    // const onAdd = (id, amount) => {
    //     const item = { id, amount }

    //     const t = isInCart(items, id)
    //     const newItems = !t ? [...items, item] : items.map(i => i.id === id ? { id, amount: i.amount + amount} : i)
    //     setItems(newItems)
    //     setAmounts(getAmounts(newItems))

    //     addToCart(id, amount)
    // }

    // const onRemove = (id, amount) => {
    //     const t = isInCart(items, id)
    //     if (t) {
    //         const newItems = items.map(i => i.id === id ? { id, amount: i.amount - amount} : i).filter(i => i.amount > 0)
    //         setItems(newItems)
    //         setAmounts(getAmounts(newItems))
    //     }
  
    //     removeFromCart(id, amount)
    // }
    
    // return { items, amounts, onAdd, onRemove }

    return { cartItems }
}

export default useCart