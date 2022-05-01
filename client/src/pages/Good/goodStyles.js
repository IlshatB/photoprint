export default {
    headerTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#1890ff',
    },
    skeleton: {
        display: 'flex',
        flexDirection: 'column',   
    },
    imageContent: {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    },
    salePrice: sale => ({
        ...(sale && { color: '#bfbfbf' }),
    }),
}