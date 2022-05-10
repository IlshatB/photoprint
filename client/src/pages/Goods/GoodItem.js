import { Link } from 'react-router-dom'
import { Col, Card, Typography, Skeleton } from 'antd'

import { getTimeByString } from '../../helpers'

import fallback from '../../assets/images/fallback.png'

import './goods.css'

const styles = {
    col: { width: '100%' },
    card: { height: "100%", width: '100%', display: 'flex', flexDirection: 'column' },
    linkWrapper: { width: '100%' },
    block: { display: 'flex', justifyContent: "space-between", marginTop: '16px' },
    img: { objectFit: 'contain', height: '180px', width: '100%', zIndex: 2 },
    imgBackground: { position: 'absolute', top: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 },
    backgroundContainer: (noImage = false) => ({ 
        position: 'relative', 
        backgroundColor: '#a6a6a6', 
        display: 'flex', 
        justifyContent: 'center', 
        ...(noImage && { backgroundColor: '#F5F5F5' }) 
    }),
    price: { color: '#1890ff' }
}

const GoodItem = ({ good }) => {
    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} style={styles.col}>
            <Link to={good?._id} style={styles.linkWrapper}>
                <Card
                    hoverable
                    cover={
                        <div style={styles.backgroundContainer(!good?.images[0]?.url)}>
                            {good?.images[0] && (
                                <img
                                style={styles.imgBackground}
                                alt=""
                                src={good?.images[0]?.url}
                            />
                            )}
                            <img
                                style={styles.img}
                                alt={good?.name}
                                src={good?.images[0]?.url ?? fallback}
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
        <Col xs={24} sm={24} md={12} lg={12} xl={8} style={styles.col}>
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