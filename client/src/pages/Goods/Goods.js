import { Row, Button } from 'antd'
import GoodItem from './GoodItem'

const Goods = ({ goods = [], loading = false, moreLoading = false, onLoadMore }) => {
    const gutters = { xs: 16, sm: 16, md: 32, lg: 32, xl: 32, xxl: 64 }
    return (
        <>
            <Row gutter={[gutters, gutters]} type="flex">
                {!loading 
                    ? goods.map(good => (
                        <GoodItem key={good._id} good={good} />
                    )) 
                    : Array.from(Array(6).keys()).map((_, id) => (
                        <GoodItem.Loading key={`loading-${id}`} />
                    )) 
                }
            </Row>
            {!loading && !!goods.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                    <Button type="primary" loading={moreLoading} onClick={onLoadMore}>Показать больше</Button>
                </div>
            )}
        </>
    )
}

export default Goods
