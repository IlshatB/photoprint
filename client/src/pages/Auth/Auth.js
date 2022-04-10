import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Tabs, Row, Col } from 'antd';

/** Remove after BE implementation */
import sign from 'jwt-encode'

import { setUser } from '../../helpers'

import Login from './components/Login';
import Signup from './components/Signup';

import styles from './AuthStyles'

const Auth = () => {
    const [key, setkey] = useState('login')

    const navigate = useNavigate()

    const handleLogin = values => {
        //** Replace with logic for BE */
        const jwt = sign(values, 'secret')

        setUser(jwt)
        navigate('/home')
    }

    return (
        <section style={styles.container}>
                <Row style={{ width: '100%' }}>
                    <Col xs={1} sm={2} md={4} lg={8} />
                    <Col xs={22} sm={20} md={16} lg={8}>
                        <Tabs defaultActiveKey={key} activeKey={key} onChange={setkey}>
                            <Tabs.TabPane tab="Авторизация" key="login">
                                <Login toSignUp={() => setkey('signup')} onFinish={handleLogin}  />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Регистрация" key="signup">
                                <Signup toLogIn={() => setkey('login')} />
                            </Tabs.TabPane>
                        </Tabs>                
                    </Col>
                    <Col xs={2} sm={2} md={4} lg={8} />
                </Row>
        </section>
        
    )
}

export default Auth