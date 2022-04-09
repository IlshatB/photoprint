import React from 'react'
import { ShoppingCartProvider } from '../../providers'

const Cart = () => {
    const { items, setItems } = ShoppingCartProvider.useContext()

    const handlRemoveItem = id => {
        setItems('remove', { id, amount: 1 })
    }

    return (
        <div>
            {items.map(i => (
                <div key={i.id}>
                    <h1>{i.id}</h1>
                    <p>{i.amount}</p>
                    <button onClick={() => handlRemoveItem(i.id)}>удалить 1 шт.</button>
                </div>
            ))}
        </div>
    )
}

export default Cart