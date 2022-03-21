import { Segment } from 'semantic-ui-react'

import { LoginForm, RegistrationForm } from './components'
import styles from './AuthenticationStyles'

const Authentication = ({ onRegister, onLogin }) => {
    return (
        <section style={styles.container}>
            <Segment secondary style={styles.forms}>
                <RegistrationForm onRegister={onRegister} />
                <LoginForm onLogin={onLogin} />
            </Segment>
        </section>
    )
}

export default Authentication