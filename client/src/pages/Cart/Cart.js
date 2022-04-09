import React from 'react'
import { useShoppingCart } from '../../hooks'

const Cart = () => {
    const { items, onRemove } = useShoppingCart()

    return (
        <div>
            {items.map(i => (
                <div key={i.id}>
                    <h1>{i.id}</h1>
                    <p>{i.amount}</p>
                    <button onClick={() => onRemove(i.id, 1)}>удалить 1 шт.</button>
                </div>
            ))}
        </div>
    )
}

export default Cart