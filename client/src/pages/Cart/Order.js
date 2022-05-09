import { useEffect, useState, useReducer } from 'react'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

import { Button, Spin, Radio, Space, Input, Typography, List, Avatar } from 'antd'

import fallback from '../../assets/images/fallback.png'

const initialState = {
    progress: 0,
    delivery: null,
    country: '',
    city: '',
    street: '',
    zipCode: null,
    paymentType: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'progress':
            return { ...state, progress: action.payload}
        case 'delivery':
            return { ...state, delivery: action.payload}
        case 'country':
            return { ...state, country: action.payload}
        case 'city':
            return { ...state, city: action.payload}
        case 'street':
            return { ...state, street: action.payload}
        case 'zipCode':
            return { ...state, zipCode: action.payload}
        case 'paymentType':
            return { ...state, paymentType: action.payload}            
        default:
            throw new Error()
    }
}

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

const OrderContainer = ({ items = [], cost = 0, setProgress, omMakeOrder }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        const getSecret = async () => {
            try {
                const { data } = await axios.post('/api/cart/create-payment-intent', { cost: Math.round(cost) }, { headers: { "Content-Type": "application/json" } })
                setClientSecret(data.clientSecret)
            } catch (e) {
                console.log(e)
            }
        }

        getSecret()
    }, [cost])

    const stripeOptions = {
        clientSecret,
        appearance: {theme: 'stripe' },
        size: 'mobile',
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {clientSecret ? (
                <Elements options={stripeOptions} stripe={stripePromise}>
                    <Order
                        clientSecret={clientSecret}
                        items={items}
                        cost={cost}
                        state={state}
                        dispatch={dispatch}
                        omMakeOrder={omMakeOrder} 
                        setProgress={setProgress}
                    />
                </Elements>                
            ) : (
                <Spin size="large" />
            )}
        </div>
    )
}

const Order = ({ clientSecret, items, cost, state, dispatch, omMakeOrder, setProgress }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setIsLoading] = useState(false)
  
    const { progress, delivery, country, city, street, zipCode, paymentType } = state
  
    const handleMakeOrder = () => {
        const address = `${country} г. ${city} ул. ${street}, почтовый индекс: ${zipCode}`
        const variables = {
            delivery,
            address,
            paymentType,
        }
        omMakeOrder(variables)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!stripe || !elements) return
        setIsLoading(true)
  
        const { error } = await stripe.confirmCardPayment(clientSecret)
        setIsLoading(false)

        if (error.type === 'card_error' || error.type === 'validation_error') {
            console.log(error.message)
        }
        else handleMakeOrder()
    }
  
    const cardOptions = {
        hidePostalCode: true,
        style: {
            base: {
                fontSize: '14px',
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div style={{ width: '100%' }}>
                <List
                    dataSource={items}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta 
                                title={`${item.good.name} x ${item.amount}`} 
                                description={characteristicsToString(item.characteristics?.filter(c => !!c.value))} 
                                avatar={<Avatar src={item.good.images[0]?.url ?? fallback} />} 
                            />
                        </List.Item>
                        )}
                />
            </div>
             <Typography.Text strong>Сумма: {cost} руб.</Typography.Text>
             <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
                <Typography.Text strong style={{ marginBottom: 8 }}>Доставка</Typography.Text>
                <Radio.Group 
                    value={delivery}
                    onChange={e => {
                        dispatch({ type: 'delivery', payload: e.target.value })
                        if (progress < 10) {
                            dispatch({ type: 'progress', payload: 10 })
                            setProgress(10)
                        }
                    }} 
                >
                    <Space direction="vertical">
                        <Radio value="courier">Курьером</Radio>
                        <Radio value="post">Почтой</Radio>
                    </Space>
                </Radio.Group>
             </div>
             {!!delivery && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
                    <Typography.Text strong style={{ marginBottom: 8 }}>Адрес</Typography.Text>
                    <Input 
                        style={styles.input}
                        value={country} 
                        onChange={e => {
                            dispatch({ type: 'country', payload: e.target.value })
                            if (progress < 30) {
                                dispatch({ type: 'progress', payload: 30 })
                                setProgress(30)
                            }
                        }} 
                        placeholder="Страна" 
                    />
                    <Input
                        style={styles.input} 
                        value={city} 
                        onChange={e => {
                            dispatch({ type: 'city', payload: e.target.value })
                            if (progress < 50) {
                                dispatch({ type: 'progress', payload: 50 })
                                setProgress(50)
                            }
                        }} 
                        placeholder="Город" 
                    />
                    <Input
                        style={styles.input} 
                        value={street} 
                        onChange={e => {
                            dispatch({ type: 'street', payload: e.target.value })
                            if (progress < 70) {
                                dispatch({ type: 'progress', payload: 70 })
                                setProgress(70)
                            }
                        }} 
                        placeholder="Улица (полностью)" 
                    />
                    <Input
                        style={styles.input} 
                        value={zipCode} 
                        onChange={e => {
                            dispatch({ type: 'zipCode', payload: e.target.value })
                            if (progress < 90) {
                                dispatch({ type: 'progress', payload: 90 })
                                setProgress(90)
                            }
                        }} 
                        placeholder="Почтовый индекс" 
                    />                                        
                </div>
             )}
             {!!delivery && !!country && !!city && !!street && !!zipCode && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
                    <Typography.Text strong style={{ marginBottom: 8 }}>Оплата</Typography.Text>
                    <Radio.Group 
                        value={paymentType}
                        onChange={e => {
                            dispatch({ type: 'paymentType', payload: e.target.value })
                            if (progress < 100) {
                                dispatch({ type: 'progress', payload: 100 })
                                setProgress(100)
                            }
                        }} 
                    >
                        <Space direction="vertical">
                            {delivery === 'courier' && <Radio value="cash">Наличными</Radio>}
                            <Radio value="card">Картой</Radio>
                        </Space>
                    </Radio.Group>
                </div>
             )}
             {paymentType === 'cash' 
                && (<div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 8 }}>
                    <Button type="primary" onClick={handleMakeOrder}>Заказать</Button>
                </div>)
            }
             {!!delivery && !!country && !!city && !!street && !!zipCode && paymentType === 'card' && (
                   <form id="payment-form" style={{ width: '100%', marginTop: 16 }} onSubmit={handleSubmit}>
                        <div style={{ width: '100%',  backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8, marginBottom: 8  }}>
                            <CardElement options={cardOptions} />   
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit" disabled={isLoading || !stripe || !elements} id="submit">
                                <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner"></div> : `Оплатить ${cost} руб.`}
                                </span>
                            </Button>
                        </div>
                    </form>
             )}
        </div>
    )
  }

export default OrderContainer

const characteristicsToString = (characteristics) => {
    let description = ''
    characteristics?.forEach((c, id) => {
        description += c?.value ? `${c?.value}${id !== (characteristics.length - 1) ? '; ' : ''}` : ''
    })
    return description
}

const styles = {
    input: {
        marginBottom: 12, 
    }
}