import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Card, Typography, Descriptions, Image } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import fallback from '../../assets/images/fallback.png'

import './card.css'

const CartItem = ({ item, onAddItem, onRemoveItem }) => {
    const handleRemove = e => {
        e.preventDefault()
        onRemoveItem()
    }
    
    const handleAdd = e => {
        e.preventDefault()
        onAddItem()
    }

    const totalCost = useMemo(() => {
        let total = item?.good.price
        item.characteristics.forEach(c => {
            total += (c?.cost || 0)
        })

        return total
    }, [item])

    return (
        <Link to={`/${item?.good.category}/${item?.good._id}`}>
            <Card
                cover={(
                    <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                        <Image height={150} alt={item?.good.name} src={item?.good.images[0]?.url ?? fallback} preview={false} />                       
                    </div>)} 
                actions={[
                    <MinusOutlined key={`${item.good.name}-setting`} onClick={handleRemove} />,
                    <Typography.Paragraph type="primary">{`Кол-во: ${item.amount}`}</Typography.Paragraph>,
                    <PlusOutlined key={`${item.good.name}-ellipsis`} onClick={handleAdd} />,
                ]}
                style={{ height: "100%", display: 'flex', flexDirection: 'column' }}
            >
                <Card.Meta
                    title={item?.good.name}
                    description={`${getPriceWithSale(totalCost, item?.good.sale)} руб.`}
                />
                {!!item?.characteristics.length && (
                    <Descriptions column={1} size="small" style={{ marginTop: 16 }}>
                        {item?.characteristics.map(c => !!c?.value ? (
                        <Descriptions.Item key={c.title} label={getTitleDescription(c.title)}>{c.value}</Descriptions.Item>
                        ) : null )}
                    </Descriptions>
                )}
            </Card>
        </Link>
    )
}

export default CartItem

const getPriceWithSale = (price, sale) => {
    return sale ? price * (100 - sale) / 100 : price
}

const getTitleDescription = title => {
    switch (title) {
        case 'size':
            return 'Размер'
        case 'type':
            return 'Тип'
        default:
             return ''    
        }
}