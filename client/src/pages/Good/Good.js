import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { Card, Typography, Skeleton, Carousel, Image, Tabs, Button, Radio, Descriptions, Form, Space, List, Comment, Rate } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { useWindowWidth } from '../../hooks'
import { getTimeByString, commentWord } from '../../helpers'

import useCart from '../Cart/useCart'
import CommentForm from '../Comments/CommentForm'
import AttachmentsModal from './AttachmentsModal'

import styles from './goodStyles'

import fallback from '../../assets/images/fallback.png'

const Good = ({ good, loading = false, refetch }) => {
    const { width } = useWindowWidth()
    const { cartItems, orders } = useSelector(store => store.client)

    const [form] = Form.useForm()
    const { onAdd, onInsert } = useCart()

    const [selectedSize, setSelectedSize] = useState()
    const [selectedType, setSelectedType] = useState()

    const [open, setOpen] = useState(false)

    const sizes = useMemo(() => {
        return good?.sizes.filter(s => !!s.value !== false) ?? []
    }, [good?.sizes])

    const types = useMemo(() => {
        return good?.types.filter(t => !!t.value !== false) ?? []
    }, [good?.types])

    const finalCost = useMemo(() => {
        const cost = (good?.price || 0) + (sizes.find(s => s.value === selectedSize)?.cost || 0) + (types.find(t => t.value === selectedType)?.cost || 0)
        return cost
    }, [good, sizes, types, selectedSize, selectedType])

    const handleAddToCart = async (attachments = []) => {
        const variables = {
            good: good?._id,
            characteristics: [
                { title: 'size', value: good?.size ?? selectedSize, cost: good?.sizes[good?.sizes.findIndex(s => s.value === selectedSize)]?.cost  },
                { title: 'type', value: good?.type ?? selectedType, cost: good?.types[good?.types.findIndex(t => t.value === selectedSize)]?.cost  },
            ],
            attachments,
        }

        const found = cartItems.find(
            i => i.good._id === good?._id 
                && i.characteristics.every((el, id) => el.title === variables.characteristics[id].title && el.value === variables.characteristics[id].value)
                && (i.good?.allowAttach ? i.attachments.map(a => a.name).sort().join(' ') === variables.attachments.map(a => a.name).sort().join(' ') : true)
        )
        if (!!found) onAdd(found._id)
        else onInsert(variables)
    }

    const handleClickAddToCart = () => {
        if (good?.allowAttach) setOpen(true)
        else handleAddToCart()
    }

    const showCommentsForm = useMemo(() => {
        const isFound = orders.find(o => o.items.find(i => i.good._id === good?._id) && o.status === 'delivered')

        return !!isFound
    }, [orders, good?._id])

    const hideCharacteristics = !Boolean(sizes.length) && !Boolean(good?.size) && !Boolean(types.length) && !Boolean(good?.type)
    const disableAddToCart = isSubmitDisabled(selectedSize, selectedType, sizes, types)
  
    return (
        <>
            <Card 
                title={
                    <CardTitle
                        good={good}
                        loading={loading}
                        finalCost={finalCost}
                        disableAddToCart={disableAddToCart}
                        onAddToCart={handleClickAddToCart}
                    />
                } 
                bordered={false}
            >
                <Form
                    form={form}
                    name='good_view_form'
                >
                    <CardImages images={good?.images ?? []} loading={loading} width={width} />
                    <Tabs defaultActiveKey="description" onChange={() => {}} type="card">
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
            {showCommentsForm && <CommentForm goodId={good?._id} refetch={refetch} />}
            {good?.comments.length === 0 ? [] : <CommentList comments={good?.comments} loading={loading} />}
            <AttachmentsModal good={good} open={open} setOpen={setOpen} onOk={handleAddToCart} />
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
                            author={item.client.email}
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
const CardTitle = ({ good, loading, disableAddToCart, onAddToCart, finalCost }) => {
    const client = useSelector(store => store.client)
    const isSale = !!good?.sale

    return (
        !loading ? (
            <div>
                <div style={styles.headerTitle}>
                    <Typography.Title level={3} style={{ whiteSpace: 'break-spaces'}}>{good?.name}</Typography.Title>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Button type="primary" htmlType="submit" disabled={disableAddToCart} onClick={onAddToCart}>В корзину</Button>
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
                        <Typography.Text style={{ ...styles.price, ...styles.salePrice(isSale) }} type={isSale && 'secondary'} delete={isSale}>  {finalCost}  </Typography.Text>
                        <Typography.Text style={styles.price}>{getPriceWithSale(finalCost, good?.sale)}</Typography.Text>
                        <Typography.Text style={{ ...styles.price, marginLeft: 4 }}>&#8381;</Typography.Text>
                    </div>

                    {good?.productionTime && (
                        <Typography.Text style={{ fontSize: '0.9em', whiteSpace: 'break-spaces' }}  type="secondary">
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

const CardImages = ({ images, loading, width }) => {
    return !loading ? (
        images?.length > 0 ? (
            <Carousel autoplay effect="fade">
                {images.map((image, id) => (
                    <div key={`image-${id + 1}`}>
                        <div style={styles.imageContent(!!(width < 451))}>
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
        return good?.sizes.filter(s => !!s.value !== false) ?? []
    }, [good?.sizes])

    const types = useMemo(() => {
        return good?.types.filter(t => !!t.value !== false) ?? []
    }, [good?.types])

    return (
        <div>
            <Typography.Title level={5}>Характеристики</Typography.Title>
            {!!sizes.length && (
                <Form.Item name="sizes" label="Размеры:">
                    <Radio.Group onChange={e => setSelectedSize(e.target.value)} value={selectedSize}>
                        <Space direction="vertical">
                            {sizes.map(s => (
                                <Radio key={s.value} value={s.value}>
                                    {s.value} <Typography.Text type="secondary">+{s.cost} &#8381;</Typography.Text>
                                </Radio>
                            ))}
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
                            {types.map(p => <Radio key={p.value} value={p.value}>{p.value}</Radio>)}
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
