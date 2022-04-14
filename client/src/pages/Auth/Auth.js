import { useState } from 'react';
import { Tabs, Row, Col } from 'antd';

import Login from './components/Login';
import Signup from './components/Signup';

import styles from './AuthStyles'

const Auth = ({ onLogin, onSignup }) => {
    const [key, setkey] = useState('login')

    return (
        <section style={styles.container}>
                <Row style={{ width: '100%' }}>
                    <Col xs={1} sm={2} md={4} lg={8} />
                    <Col xs={22} sm={20} md={16} lg={8}>
                        <Tabs defaultActiveKey={key} activeKey={key} onChange={setkey}>
                            <Tabs.TabPane tab="Авторизация" key="login">
                                <Login toSignUp={() => setkey('signup')} onLogin={onLogin}  />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Регистрация" key="signup">
                                <Signup toLogIn={() => setkey('login')} onSignup={onSignup} />
                            </Tabs.TabPane>
                        </Tabs>                
                    </Col>
                    <Col xs={2} sm={2} md={4} lg={8} />
                </Row>
        </section>
        
    )
}

export default Auth