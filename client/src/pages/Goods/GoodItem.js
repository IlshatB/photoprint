import { Link } from 'react-router-dom'
import { Col, Card, Typography, Skeleton } from 'antd'

import { getTimeByString } from '../../helpers'

import './goodItems.css'

const styles = {
    card: { height: "100%", display: 'flex', flexDirection: 'column' },
    block: { display: 'flex', justifyContent: "space-between", marginTop: '16px' },
    img: { objectFit: 'contain', height: '180px', zIndex: 2 },
    imgBackground: { position: 'absolute', top: 0, width: '100%', height: '180px', objectFit: 'cover', opacity: 0.7, zIndex: 1 },
    backgroundContainer: { position: 'relative', backgroundColor: '#a6a6a6', display: 'flex', justifyContent: 'center' },
    price: { color: '#1890ff' }
}

const GoodItem = ({ good }) => {
    return (
        <Col sm={24} lg={12} xl={8}>
            <Link to={`/photobooks/${good?._id}`}>
                <Card
                    hoverable
                    cover={
                        <div style={styles.backgroundContainer}>
                            <img
                                style={styles.imgBackground}
                                alt={good?.name}
                                src={good?.images[0]?.url}
                            />
                            <img
                                style={styles.img}
                                alt={good?.name}
                                src={good?.images[0]?.url}
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
                                {`${getPriceWithSale(good?.price, good?.sale)} руб.`}
                            </Typography.Paragraph>
                            <Typography.Text type="secondary">
                                {good?.productionTime && `Срок изготовления: ${getTimeByString(good?.productionTime)}`}
                            </Typography.Text>
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
                        <Skeleton.Input active block size="small" style={{ width: '100%' }} />
                    </div>
                }
                style={styles.card} id="card-item"
            >
                <div style={{ flexGrow: 1 }}>
                    <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                    <Skeleton.Input active block size="small" style={{ width: '100%' }} />
                </div>
                <div style={styles.block}>
                    <div>
                        <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                        <Skeleton.Input active block size="small" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <Skeleton.Input active block size="small" style={{ width: '100%' }} />
                    </div>
                </div>
            </Card>
        </Col>
    )
}

GoodItem.Loading = Loading
export default GoodItem

const getPriceWithSale = (price, sale) => {
    return sale ? price * (100 - sale) / 100 : price
}