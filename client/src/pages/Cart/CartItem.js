import { Card, Typography, Descriptions } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import fallback from '../../assets/images/fallback.png'

import './card.css'

const CartItem = ({ item, onAddItem, onRemoveItem }) => {
    return (
        <Card
            cover={
                 Boolean(item?.image) 
                    ? <img alt={item?.name} src={item?.image ?? fallback} />                            
                    : (
                        <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                            <img alt={item?.name} src={item?.image ?? fallback} />                          
                        </div>
                    )
                } 
            actions={[
                <MinusOutlined key={`${item.good.name}-setting`} onClick={onRemoveItem} />,
                <Typography.Paragraph type="primary">{`Кол-во: ${item.amount}`}</Typography.Paragraph>,
                <PlusOutlined key={`${item.good.name}-ellipsis`} onClick={onAddItem} />,
            ]}
            style={{ height: "100%", display: 'flex', flexDirection: 'column' }}
        >
            <Card.Meta
                title={item?.good.name}
                description={`${getPriceWithSale(item?.good.price, item?.good.sale)} руб`}
            />
            {!!item?.characteristics.length && (
                <Descriptions column={1} size="small" style={{ marginTop: 16 }}>
                    {item?.characteristics.map(c => !!c?.value ? (
                    <Descriptions.Item key={c.title} label={getTitleDescription(c.title)}>{c.value}</Descriptions.Item>
                    ) : null )}
                </Descriptions>
            )}
        </Card>
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