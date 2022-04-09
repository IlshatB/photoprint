import { Row, Col, Card, Typography, Button } from 'antd'

import { photoBooks, getTimeByString } from '../../helpers'

import photobook from '../../assets/photobooks/photoBook_1000x1000.jpg'

const gridCellStyles = {
  width: '50%',
  height: '170px',
}

const Photobooks = ({ onAddItem }) => {
    return (
      <>
        <Row gutter={[64, 64]} type="flex">
          {photoBooks.map(pb => (
            <Col sm={24} lg={12} xl={8} key={pb.id}>
              <Card
                hoverable
                cover={<img alt="example" src={photobook} />}
              >
                <Card.Grid style={{ width: '100%' }} hoverable={false}>
                  <Card.Meta title={pb.title} description={pb.description} />
                </Card.Grid>
                  <Card.Grid style={gridCellStyles}>
                    <Typography.Paragraph type="primary">
                      {`от ${pb.price} руб`}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">
                      {`Срок изготовления: ${getTimeByString(pb.productionTime)}`}
                    </Typography.Text>
                  </Card.Grid>
                  <Card.Grid style={{ ...gridCellStyles, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button type="primary" size="medium" onClick={() => onAddItem(pb.id)} >
                        В корзину
                      </Button>
                  </Card.Grid>
              </Card>
            </Col>
          ))}
        </Row>
      </>

)
}

export default Photobooks