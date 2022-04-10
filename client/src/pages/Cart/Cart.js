import { useMemo } from 'react' 

import { Row, Col, Card, Typography } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import { ShoppingCartProvider } from '../../providers'

/** заменить мок данные на бэк запрос */
import { allItems } from '../../helpers'

const Cart = () => {
    const { items, setItems } = ShoppingCartProvider.useContext()

    const detailedItems = useMemo(() => {
        return items.map(i => {
            const s = allItems.find(({ id }) => id === i.id)
            return { ...i, ...s }
        })
    }, [items])

    const handlRemoveItem = id => {
        setItems('remove', { id, amount: 1 })
    }

    const handlAddItem = id => {
        setItems('add', { id, amount: 1 })
    }

    return (
        <Row gutter={[32, 32]}>
            {!!detailedItems.length ? detailedItems.map(i => (
                <Col key={i.id} xs={24} sm={24} md={12} lg={8} xl={6} style={{ userSelect: 'none' }}>
                    <Card
                        cover={<img alt={i.title} src={i.image} />}
                        actions={[
                            <MinusOutlined key={`${i.title}-setting`} onClick={() => handlRemoveItem(i.id)} />,
                            (<Typography.Paragraph type="primary">{`Кол-во: ${i.amount}`}</Typography.Paragraph>),
                            <PlusOutlined key={`${i.title}-ellipsis`} onClick={() => handlAddItem(i.id)} />,
                        ]}
                    >
                        <Card.Meta
                            title={i.title}
                            description={`${i.price} руб`}
                        />
                    </Card>
                </Col>
            )) : (
                <div style={{ textAlign: 'center', width: '100%' }}>
                     <Typography.Text>Ваша корзина пуста</Typography.Text>
                </div>
            )}
        </Row>
    )
}

export default Cart