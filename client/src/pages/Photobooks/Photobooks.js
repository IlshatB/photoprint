// import { useShoppingCart } from '../../hooks'
import { ShoppingCartProvider } from '../../providers'

const Photobooks = () => {
  const { setItems } = ShoppingCartProvider.useContext()

  // const { onAdd } = useShoppingCart()

  //   const handleAddItem = id => {
  //     onAdd(id, 1)
  //   }

  const handleAddItem = id => {
    setItems('add', { id, amount: 1 })
  }

    return (
      <>
        <div>
            <button onClick={() => handleAddItem('1')}>Добавить в корзину товар 1</button>
        </div>
        <div>
            <button onClick={() => handleAddItem('2')}>Добавить в корзину товар 2</button>
        </div>
      </>

)
}

export default Photobooks