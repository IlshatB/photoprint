import { Card, Typography } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import fallback from '../../assets/images/fallback.png'


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
                <MinusOutlined key={`${item.title}-setting`} onClick={onRemoveItem} />,
                <Typography.Paragraph type="primary">{`Кол-во: ${item.amount}`}</Typography.Paragraph>,
                <PlusOutlined key={`${item.title}-ellipsis`} onClick={onAddItem} />,
            ]}
        >
            <Card.Meta
                title={item?.name}
                description={`${item?.price} руб.`}
            />
        </Card>
    )
}

export default CartItem