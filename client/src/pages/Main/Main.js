
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel, Image, Typography, Button, Row, Col, Card } from 'antd';
import { geekblue } from '@ant-design/colors'
import { InstagramOutlined } from '@ant-design/icons'


const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: geekblue[0],
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '300px',
    background: '#85CD96'
  },
  saleContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    alignItems: 'center'
  },
  gridCellStyle: {
    width: '50%',
    minWidth: '120px',
    display: 'flex',
  }
};

const Main = () => {
  const [sales, setSales] = useState([])
  const urlArray = []
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/api/goods/fetch/goodSale', { headers: { "Content-Type": "application/json" } })
        sales.map(good => urlArray.push(good?.images[0]?.url))
        setSales(data.allSales)
      } catch (e) {
        console.error(e.response.data)
      }
    }
    fetchData()
  })
  return (
    <>
      <Carousel autoplay effect="fade">
        {
          sales.map(good => {
            const link = '/' + good.category + '/' + good._id
            return (
              <div key={good._id} >
                <div style={contentStyle.mainContent}>
                  <div style={contentStyle.saleContainer}>
                    <Typography.Text style={{ color: 'white', fontSize: '40px' }} >
                      {good.name}
                    </Typography.Text>
                    <Typography.Text style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }} >
                      Со скидкой {good.sale}%
                    </Typography.Text>
                    <Button type='primary' href={link} style={{marginTop: '20px'}}>
                      Посмотреть
                    </Button>
                  </div>
                  <Image height={300} src={good?.images[0]?.url} preview={false} />
                </div>
              </div>
            )
          })
        }
      </Carousel >
      <div style={{ marginTop: '50px' }}>
        <Row gutter={[16,16]} >
          <Col md={24} lg={16} xl={8} style={{ display: 'flex' }}>
            <Card title="Мы ценим каждого клиента" bordered={false} style={{ flexGrow: 1 }}>
              <Card.Meta
                description='Наша жизнь - это впечатления!
              Чтобы сохранить воспоминания обо всех трогательных событиях вашей жизни,
              был создан сервис PhotoPrint. Вы легко сможете прикоснуться к своим воспоминаниям:
              напечатать дорогие сердцу фотографии, оформить красивую фотокнигу.
              Воплощайте все свои идеи вместе с нами!'
              />
            </Card>
          </Col>
          <Col md={24} lg={16} xl={8} style={{ display: 'flex' }}>
            <Card title="Вы останетесь довольны" bordered={false} style={{ flexGrow: 1 }}>
              <Card.Meta
                description='Мы печатаем ваши изображения на бумаге премиального качества.
            Наши специалисты упаковывают заказы в плотные
            транспортные конверты, чтобы при доставке ничего не испортилось.
            Для нас важно, чтобы вы успели получить заказы вовремя, поэтому мы информируем
            вас на сайте о сроках на печать и доставку.'
              />
            </Card>
          </Col>
          <Col md={24} lg={16} xl={8} style={{ display: 'flex' }}>
            <Card
              title="Мы всегда с вами"
              bordered={false}
              style={{ flexGrow: 1 }}
              extra={<a href='/' ><InstagramOutlined /></a>}
            >
              <Card.Meta
                description='Если у вас возникают проблемы и вопросы
              по поводу ваших заказов, вы всегда можете обратиться к нам за помощью:
              позвонить в службу поддержки  или написать нам в социальных сетях.'
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Main