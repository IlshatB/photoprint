const styles = {
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
    imageContent:{
        height: '300px',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        backgroundSize: 'cover',
    },
    salePrice: sale => ({
        ...(sale && { color: '#bfbfbf' }),
    }),
}

export default styles