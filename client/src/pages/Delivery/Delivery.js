import { useState } from 'react'
import { Row, Col, Card, Collapse, Typography, Image, Avatar } from 'antd'
import { ClockCircleOutlined, DropboxOutlined } from '@ant-design/icons'
import { orange, cyan } from '@ant-design/colors'

import courier from '../../assets//delivery/courier.png'
import pochtaros from '../../assets//delivery/pochta.ros.png'
import deliv from '../../assets//delivery/deliv.png'

const gridCellStyle = {
    width: '50%',
    minWidth: '120px',
    display: 'flex',
};

const CollapsePayments = ({ header, payments }) => {
    const [key, setKey] = useState()

    return (
        <Collapse defaultActiveKey={key} activeKey={key} onChange={setKey} ghost style={{ wordBreak: 'break-word'}}>
            <Collapse.Panel header={header} key={header}>
                {payments.map(p => (
                    <p key={p}>
                        <Typography.Text type="secondary">{p}</Typography.Text>
                    </p>
                ))}
            </Collapse.Panel>
        </Collapse>
    )
}

const Delivery = () => {
    return (
       <>
        <Row gutter={[16, 16]} wrap align="middle" justify="center">
            <Col md={24} lg={16} xl={8} style={{ width: '100%' }}>
                <Card title="Курьер" bordered={false} extra={<Image width={100} src={courier} preview={false} />} hoverable>
                    <Row gutter={[16, 16]} wrap align="stretch" justify="center">
                        <Col xs={24}>
                            <Card.Meta 
                                title="Способы оплаты:" 
                                description=
                                {<CollapsePayments 
                                    header="Предоплата или постоплата" 
                                    payments={[ 'Наличные', 'Банковские карты', 'Online-платежи' ]} 
                                />} 
                            />          
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: cyan[5], minWidth: '24px', marginRight: 8 }} icon={<ClockCircleOutlined />} />
                            <Card.Meta title="Срок доставки" description="от 2 дней" />
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: orange[5], minWidth: '24px', marginRight: 8 }} icon={<DropboxOutlined />} />
                            <Card.Meta title="Срок хранения" description="3 дня" />
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col md={24} lg={16} xl={8} style={{ width: '100%' }}>
                <Card title="Почта России" bordered={false} extra={<Image width={100} src={pochtaros} preview={false} />} hoverable>
                     <Row gutter={[16, 16]} wrap align="stretch" justify="center">
                        <Col xs={24}>
                            <Card.Meta 
                                title="Способы оплаты:" 
                                description=
                                {<CollapsePayments 
                                    header="Предоплата" 
                                    payments={[ 'Банковские карты', 'Online-платежи' ]} 
                                />} 
                            />
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: cyan[5], minWidth: '24px', marginRight: 8 }} icon={<ClockCircleOutlined />} />
                            <Card.Meta title="Срок доставки" description="от 7 дней" />
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: orange[5], minWidth: '24px', marginRight: 8 }} icon={<DropboxOutlined />} />
                            <Card.Meta title="Срок хранения" description="15 дней" />
                        </Col>
                    </Row >
                </Card>
            </Col>
            <Col md={24} lg={16} xl={8} style={{ width: '100%' }}>
                <Card title="Доставка по СНГ" bordered={false} extra={<Image width={100} height={100} src={deliv} preview={false} />} hoverable>
                    <Row gutter={[16, 16]} wrap align="stretch" justify="center">
                        <Col xs={24}>
                            <Card.Meta 
                                title="Способы оплаты:" 
                                description=
                                {<CollapsePayments 
                                    header="Предоплата или наложенный платёж" 
                                    payments={[ 'Банковские карты', 'Online-платежи' ]} 
                                />} 
                            />                        
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: cyan[5], minWidth: '24px', marginRight: 8 }} icon={<ClockCircleOutlined />} />
                            <Card.Meta title="Срок доставки" description="от 8 дней" />
                        </Col>
                        <Col xs={24} lg={24} xl={18} xll={12} style={gridCellStyle}>
                            <Avatar gap={16} size="small" style={{ backgroundColor: orange[5], minWidth: '24px', marginRight: 8 }} icon={<DropboxOutlined />} />
                            <Card.Meta title="Срок хранения" description="15 дней" />
                        </Col>
                    </Row >
                </Card>
            </Col>
        </Row>
       </>
    )
}

export default Delivery