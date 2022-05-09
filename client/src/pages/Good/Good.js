import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Typography, Skeleton, Carousel, Image, Tabs, Button, Radio, Descriptions, Form, Space, List, Comment, Rate } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import fallback from '../../assets/images/fallback.png'
import { getTimeByString, commentWord } from '../../helpers'
import useCart from '../Cart/useCart'
import CommentForm from '../Comments/CommentForm'

import styles from './goodStyles'


const Good = ({ good, loading = false, refetch }) => {
    const [form] = Form.useForm()
    const { cartItems } = useSelector(store => store.client)
    const { onAdd, onInsert } = useCart()

    const [selectedSize, setSelectedSize] = useState()
    const [selectedType, setSelectedType] = useState()

    const sizes = useMemo(() => {
        return good?.sizes.filter(s => !!s !== false) ?? []
    }, [good?.sizes])

    const types = useMemo(() => {
        return good?.types.filter(t => !!t !== false) ?? []
    }, [good?.types])

    const handleAddToCart = async () => {
        const variables = {
            good: good?._id,
            characteristics: [
                { title: 'size', value: good?.size ?? selectedSize },
                { title: 'type', value: good?.type ?? selectedType },
            ],
        }

        const found = cartItems.find(i => i.good._id === good?._id && i.characteristics.every((el, id) => el.title === variables.characteristics[id].title && el.value === variables.characteristics[id].value))

        if (!!found) {
            onAdd(found._id)
        }
        else {
            onInsert(variables)
        }

    }
    const hideCharacteristics = !Boolean(sizes.length) && !Boolean(good?.size) && !Boolean(types.length) && !Boolean(good?.type)
    const disableAddToCart = isSubmitDisabled(selectedSize, selectedType, sizes, types)
    return (
        <>
            <Card title={<CardTitle good={good} loading={loading} disableAddToCart={disableAddToCart} handleAddToCart={handleAddToCart} />} bordered={false}>
                <Form
                    form={form}
                    name='good_view_form'
                >
                    <CardImages images={good?.images ?? []} loading={loading} />
                    <Tabs defaultActiveKey="description" onChange={() => { }} type="card">
                        <Tabs.TabPane tab="Описание" key="description">
                            <Description description={good?.description ?? ''} loading={loading} />
                        </Tabs.TabPane>
                        {!hideCharacteristics && (
                            <Tabs.TabPane tab="Характеристики" key="features">
                                <Characteristics
                                    good={good}
                                    selectedSize={selectedSize}
                                    selectedType={selectedType}
                                    setSelectedSize={setSelectedSize}
                                    setSelectedType={setSelectedType}
                                />
                            </Tabs.TabPane>
                        )}
                    </Tabs>
                </Form>
            </Card>
            <CommentForm goodId={good?._id} refetch={refetch} />
            <CommentList comments={good?.comments} loading={loading} />
        </>
    )
}

const CommentList = ({ comments, loading }) => {
    return (
        !loading ? (
            <List
                className="comment-list"
                header={`${comments?.length} ${commentWord(comments?.length)}`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                    <div style={{ background: "white", marginTop: '20px', padding: '20px' }}>
                        <Rate disabled value={item.grade} />
                        <Comment
                            content={item.text}
                            datetime={dayjs(item.date).format('DD/MM/YYYY HH:mm')}

                        />
                    </div>
                )}
            />
        ) : (
            <Skeleton />
        )

    )

}
const CardTitle = ({ good, loading, disableAddToCart, handleAddToCart }) => {
    const client = useSelector(store => store.client)
    const isSale = !!good?.sale

    return (
        !loading ? (
            <div>
                <div style={styles.headerTitle}>
                    <Typography.Title level={3}>{good?.name}</Typography.Title>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Button type="primary" htmlType="submit" disabled={disableAddToCart} onClick={handleAddToCart}>В корзину</Button>
                            {client.isAdmin && (

                                <Link to="edit" style={{ marginLeft: 16 }}>
                                    <EditOutlined />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div style={styles.headerTitle}>
                    <div>
                        <Typography.Text style={styles.price}>от</Typography.Text>
                        <Typography.Text style={{ ...styles.price, ...styles.salePrice(isSale) }} type={isSale && 'secondary'} delete={isSale}>  {good?.price}  </Typography.Text>
                        <Typography.Text style={styles.price}>{getPriceWithSale(good?.price, good?.sale)}</Typography.Text>
                        <Typography.Text style={{ ...styles.price, marginLeft: 4 }}>&#8381;</Typography.Text>
                    </div>

                    {good?.productionTime && (
                        <Typography.Text style={{ fontSize: '0.9em' }} type="secondary">
                            {`Время изготовления: ${getTimeByString(good?.productionTime)}`}
                        </Typography.Text>
                    )}
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
        images?.length > 0 ? (
            <Carousel autoplay effect="fade">
                {images.map((image, id) => (
                    <div key={`image-${id + 1}`}>
                        <div style={styles.imageContent}>
                            <Image height='100%' alt={id} src={image.url} preview={false} />
                        </div>
                    </div>
                ))}
            </Carousel>
        ) : (
            <div style={{ width: '100%', backgroundColor: '#F5F5F5' }} align="center">
                <img
                    alt="fallback"
                    style={{ objectFit: 'contain' }}
                    src={fallback}
                />
            </div>
        )
    ) : (
        <div style={styles.skeleton}>
            {Array.from(Array(7).keys()).map((_, id) => (
                <Skeleton.Input key={`skeleton-${id}`} active block size="small" style={{ width: '100%' }} />
            ))}
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
            ))}
        </div>
    )
}

const Characteristics = ({
    good,
    selectedSize,
    selectedType,
    setSelectedSize,
    setSelectedType,
}) => {
    const sizes = useMemo(() => {
        return good?.sizes.filter(s => !!s !== false) ?? []
    }, [good?.sizes])

    const types = useMemo(() => {
        return good?.types.filter(t => !!t !== false) ?? []
    }, [good?.types])

    return (
        <div>
            <Typography.Title level={5}>Характеристики</Typography.Title>
            {!!sizes.length && (
                <Form.Item name="sizes" label="Размеры:">
                    <Radio.Group onChange={e => setSelectedSize(e.target.value)} value={selectedSize}>
                        <Space direction="vertical">
                            {sizes.map(s => (<Radio key={s} value={s}>{s}</Radio>))}
                        </Space>
                    </Radio.Group>
                </Form.Item>

            )}
            {!!good?.size && (
                <Descriptions>
                    <Descriptions.Item label="Размер">{good?.size}</Descriptions.Item>
                </Descriptions>
            )}
            {!!types.length && (
                <Form.Item name="types" label="Типы:">
                    <Radio.Group onChange={e => setSelectedType(e.target.value)} value={selectedType}>
                        <Space direction="vertical">
                            {types.map(p => <Radio key={p} value={p}>{p}</Radio>)}
                        </Space>
                    </Radio.Group>
                </Form.Item>

            )}
            {!!good?.type && (
                <Descriptions>
                    <Descriptions.Item label="Тип">{good?.type}</Descriptions.Item>
                </Descriptions>
            )}
        </div>
    )
}

const getPriceWithSale = (price, sale) => {
    return sale ? price * (100 - sale) / 100 : ''
}

const isSubmitDisabled = (selectedSize, selectedType, sizes, types) => {
    if (sizes.length > 0 && !selectedSize) {
        return true
    }

    if (types.length > 0 && !selectedType) {
        return true
    }
    return false
}

export default Good
