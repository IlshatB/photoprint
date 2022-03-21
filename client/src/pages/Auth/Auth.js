import { Row, Col } from 'antd';

import Login from './components/Login';
import Signup from './components/Signup';

import styles from './AuthStyles'

const Auth = () => {
    return (
        <section style={styles.container}>
            <Row wrap>
                <Col span={12}>
                    <Signup />
                </Col>
                <Col span={12}>
                    {/* <Login /> */}
                </Col>
            </Row>
        </section>
        
    )
}

export default Auth