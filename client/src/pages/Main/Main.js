
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel, Image, Typography } from 'antd';
import { geekblue } from '@ant-design/colors'
import { Link } from 'react-router-dom'


const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: geekblue[0],
  imageContent: {
    height: '400px',
    textAlign: 'center',
  },
  saleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'end',
    alignItems: 'center'
  },
};

const Main = () => {
  const [sales, setSales] = useState([])
  const urlArray = []
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/api/goods/fetch/goodSale', { headers: { "Content-Type": "application/json" } })
        sales.map(good => urlArray.push(good.images[0].url))
        setSales(data.allSales)
      } catch (e) {
        console.error(e.response.data)
      }
    }
    fetchData()
  })
  return (
    <Carousel autoplay effect="fade">
      {
        sales.map(good => {
          const link = '/' + good.category + '/' + good._id
          return (
            <div>
              <div style={contentStyle.saleContainer}>
                <Typography.Title level={3} style={{ color: 'black', margin: '10px 20px' }}>
                  {good.name}
                </Typography.Title>
                <Typography.Title level={3} style={{ color: 'white', backgroundColor: 'red', borderRadius: '10px', padding: '10px', margin: 0 }}>
                  Скидка {good.sale}% {' ' + good.price - good.price * 0.01 * good.sale}₽
                </Typography.Title>
              </div>
              <div style={contentStyle.imageContent}>
                <Link to={link}>
                  <Image height={400} src={good.images[0].url} preview={false} />
                </Link>
              </div>

            </div>
          )
        })
      }
    </Carousel>
  )
}

export default Main