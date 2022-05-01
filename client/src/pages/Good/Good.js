import { Link } from 'react-router-dom'
import { Card, Typography, Skeleton, Carousel, Image, Tabs, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { cyan} from '@ant-design/colors'

import { useCurrentClient } from '../../hooks'
import Admin from '../Admin/AdminContainer'

import fallback from '../../assets/images/fallback.png'
import styles from './goodStyles'

const Good = ({ good, loading = false }) => {
    return (
        <Card title={<CardTitle good={good} loading={loading} />}bordered={false}>
            <CardImages images={good?.images ?? []} loading={loading} />
            <Tabs defaultActiveKey="description" onChange={() => {}} type="card">
                <Tabs.TabPane tab="Описание" key="description">
                    <Description description={good?.description ?? ''} loading={loading} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Характеристики" key="features">
                    <Features loading={loading} />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    )
}

const CardTitle = ({ good, loading }) => {
    const isSale = !!good?.sale
    return (
        !loading ? (
            <div>
                <div style={styles.headerTitle}>
                    <Typography.Title level={3}>{good?.name}</Typography.Title>
                        <Link to={`edit`}>
                            <Button shape="circle" icon={<EditOutlined />} size="small" onClick={e => e.stopPropagation()} />
                        </Link>
                </div>
                <div>
                    <Typography.Text style={styles.price}>от</Typography.Text>
                    <Typography.Text style={{ ...styles.price, ...styles.salePrice(isSale) }} type={isSale && 'secondary'} delete={isSale}>  {good?.price}  </Typography.Text>
                    <Typography.Text style={styles.price}>{getPriceWithSale(good?.price, good?.sale)}</Typography.Text>
                </div>
            </div>   
        ) : (
            <div style={styles.skeleton}>
                <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                <Skeleton.Input active block size="small" style={{ width: '100%', marginBottom: 8 }} />
                <Skeleton.Input active block size="small" style={{ width: '100%' }} />
            </div>
        )
    )
}

const CardImages = ({ images, loading }) => {
    return !loading ? (    
        images.length > 0 ? (
            <Carousel autoplay effect="fade">
                {images.map(image => (
                    <div>
                    <div style={styles.imageContent}>
                        <Image height={300} src={image} preview={false} />
                    </div>
                </div>
                ))}
            </Carousel>
        ) : (
            <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                <img
                    style={{ objectFit: 'contain' }}
                    src={fallback}
                />                            
            </div>
        )
    ) : (
        <div style={styles.skeleton}>
            {Array.from(Array(7).keys()).map((_, id) => (
                <Skeleton.Input key={`skeleton-${id}`} active block size="small" style={{ width: '100%' }} />
            )) }
        </div> 
    )
}

const Description = ({ description, loading }) => {
    return !loading ? (
        <div style={{ padding: '0 8px' }}>
            <Typography.Text>{description}</Typography.Text>
        </div>
    ) : (
        <div style={styles.skeleton}>
            {Array.from(Array(3).keys()).map((_, id) => (
                <Skeleton.Input key={`skeleton-${id}`} active block size="small" style={{ width: '100%', marginBottom: 8 }} />
            )) }
        </div> 
    )
}

const Features = () => {
    return <div>Характеристики</div>
}

const getPriceWithSale = (price, sale) => {
    return sale ? price * sale / 100 : ''
}

export default Good

