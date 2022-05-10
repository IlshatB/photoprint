
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Carousel, Image, Typography, Button, Row, Col, Card } from 'antd'
import { InstagramOutlined } from '@ant-design/icons'

import './main.css'

const contentStyle = {
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '300px',
    backgroundColor: '#E6F7FF'
  },
  saleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gridCellStyle: {
    width: '50%',
    minWidth: '120px',
    display: 'flex',
  },
};

const Main = () => {
  const [sales, setSales] = useState([])

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/goods/fetch/goodSale', { headers: { "Content-Type": "application/json" } })
      setSales(data.allSales)

    } catch (e) {
      console.error(e.response.data)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const gutters = { xs: 16, sm: 16, md: 32, lg: 32, xl: 32, xxl: 64 }

  const data = [
    { 
      title: 'Мы ценим каждого клиента!', 
      description: `Наша жизнь - это впечатления!
      Чтобы сохранить воспоминания обо всех трогательных событиях вашей жизни,
      был создан сервис PhotoPrint. Вы легко сможете прикоснуться к своим воспоминаниям:
      напечатать дорогие сердцу фотографии, оформить красивую фотокнигу.
      Воплощайте все свои идеи вместе с нами!`, 
    },
    { 
      title: 'Вы останетесь довольны!', 
      description: `Мы печатаем ваши изображения на бумаге премиального качества.
      Наши специалисты упаковывают заказы в плотные
      транспортные конверты, чтобы при доставке ничего не испортилось.
      Для нас важно, чтобы вы успели получить заказы вовремя, поэтому мы информируем
      вас на сайте о сроках на печать и доставку.`, 
    },
    { 
      title: 'Мы всегда с вами!', 
      description: `Если у вас возникают проблемы и вопросы
      по поводу ваших заказов, вы всегда можете обратиться к нам за помощью:
      позвонить в службу поддержки  или написать нам в социальных сетях.`, 
      extra: <Link to="" ><InstagramOutlined /></Link>
    },
  ]

  return (
    <>
      <Carousel autoplay effect="fade">
        {
          sales.map(good => {
            return (
              <div key={good._id} >
                <div style={contentStyle.mainContent}>
                    <Row style={{ width: '100%', height: '100%' }}>
                      <Col xs={0} sm={12} md={12} lg={14} xl={14}>
                        <div style={contentStyle.saleContainer}>
                          <Typography.Title level={4} type="secondary">
                            {good.name}
                          </Typography.Title>
                          <Typography.Title level={3} type="secondary">
                            Со скидкой {good.sale}%
                          </Typography.Title>
                          <Link to={`/${good.category}/${good._id}`}>
                            <Button type="primary" shape="round">Посмотреть</Button>
                          </Link>
                        </div>
                     </Col>
                      <Col xs={24} sm={12} md={12} lg={10} xl={10} style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'flex-end' }}>
                        <Image height={300} style={{ objectFit: 'cover', flexGrow: 1}} src={good?.images[0]?.url} preview={false} />
                      </Col>
                    </Row>
                </div>
              </div>
            )
          })
        }
      </Carousel >

        <Row gutter={[gutters, gutters]} style={{ marginTop: 32 }}>
          {data.map(d => <ContentCard key={d.title} title={d.title} description={d.description} extra={d.extra} /> )}
        </Row>
    </>
  )
}

const ContentCard = ({ title, description, extra = null }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
      <Card title={title} bordered={false} extra={extra} style={{ height: "100%" }}>
        <Card.Meta description={description}  />
      </Card>
    </Col>
  )
}

export default Main