import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Typography, Button, Skeleton } from 'antd'

import { getTimeByString } from '../../helpers'

import fallback from '../../assets/images/fallback.png'
import './goodItems.css'

const styles = {
    card: { height: "100%", display: 'flex', flexDirection: 'column' },
    block: { display: 'flex', justifyContent:"space-between", marginTop: '16px' },
}

const GoodItem = ({ good, onAddItem }) => {
    const handleAddItem =  useCallback(e => {
        e.preventDefault()
        onAddItem(good)
    }, [onAddItem, good])

    return (
        <Col sm={24} lg={12} xl={8}>
            <Link to={`/photobooks/${good?._id}`}>
                <Card  
                    hoverable
                    cover={
                        <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                            <img
                                style={{ objectFit: 'contain' }}
                                alt={good?.name}
                                src={good?.image ?? fallback}
                            />                            
                        </div>
                    } 
                    style={styles.card} id="card-item"
                >
                    <div style={{ flexGrow: 1 }}>
                        <Card.Meta title={good?.name} description={good?.subDescription ?? ''} />
                    </div>
                    <div style={styles.block}>
                        <div>
                            <Typography.Paragraph type="primary">
                                {`${good?.price} руб`}
                            </Typography.Paragraph>
                            <Typography.Text type="secondary">
                                {good?.productionTime && `Срок изготовления: ${getTimeByString(good?.productionTime)}`}
                            </Typography.Text>
                        </div>
                        <div>
                            <Button type="primary" size="medium" onClick={handleAddItem} >
                                В корзину
                            </Button>
                        </div>
                    </div>
                </Card>              
            </Link>
        </Col>
    )
}

const Loading = () => {
    return (
        <Col sm={24} lg={12} xl={8}>
            <Card  
                hoverable
                    cover={
                        <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                            <Skeleton.Input active block size="small" style={{ width: '100%'}} />                  
                        </div>
                    } 
                    style={styles.card} id="card-item"
                >
                    <div style={{ flexGrow: 1 }}>
                        <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                        <Skeleton.Input active block size="small" style={{ width: '100%'}} />
                    </div>
                    <div style={styles.block}>
                        <div>
                            <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                            <Skeleton.Input active block size="small" style={{ width: '100%'}} />
                        </div>
                    <div>
                        <Skeleton.Input active block size="small" style={{ width: '100%'}} />
                    </div>
                </div>
            </Card> 
        </Col>
    )
}

GoodItem.Loading = Loading
export default GoodItem 
