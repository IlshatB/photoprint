import { useShoppingCart } from '../../hooks'

const Photobooks = () => {
  const { onAdd } = useShoppingCart()

    const handleAddItem = id => {
      onAdd(id, 1)
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