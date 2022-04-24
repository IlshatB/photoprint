import { Link } from 'react-router-dom'
import { Row, Col, Card, Typography, Button, notification } from 'antd'

import { useCurrentClient } from '../../hooks'
import { photoBooks, getTimeByString } from '../../helpers'

import './photobooks.css'

const gridCellStyles = {
  width: '50%',
  // height: '170px',
  // height: "100%",
  // display: 'flex',
}

const Photobooks = ({ onAddItem }) => {
    const { isAuthenticated } = useCurrentClient()

    const notificate = () => {
      notification['error']({
        message: 'Вы не авторизованы',
        description: 'Чтобы добавить товар в корзину, авторизуйтесь!',
        placement: 'top',
      });
    };

    const handleAddItem = id => {
      if (isAuthenticated) {
        onAddItem(id)
      }
      else {
        notificate()
      }
    }

    return (
        <Row gutter={[{ lg: 32,  xl: 32, xxl: 64 }, 64]} type="flex">
          {photoBooks.map(pb => (
            <Col sm={24} lg={12} xl={8} key={pb.id} >
              <Link to={pb.id}>
                <Card
                  hoverable
                  cover={<img alt={pb.title} src={pb.image} />}
                  style={{ height: "100%", display: 'flex', flexDirection: 'column' }}
                  id="card-item"
                >
                  <div style={{ flexGrow: 1 }}>
                    <Card.Meta title={pb.title} description={pb.description} />
                  </div>
                  <div style={{ display: 'flex', justifyContent:"space-between", marginTop: '16px'}}>
                    <div>
                      <Typography.Paragraph type="primary">
                        {`${pb.price} руб`}
                      </Typography.Paragraph>
                      <Typography.Text type="secondary">
                        {`Срок изготовления: ${getTimeByString(pb.productionTime)}`}
                      </Typography.Text>
                    </div>
                    <div>
                        <Button type="primary" size="medium" onClick={() => handleAddItem(pb.id)} >
                          В корзину
                        </Button>
                    </div>
                  </div>
              </Card>              
              </Link>
            </Col>
          ))}
        </Row>
    )
}

export default Photobooks