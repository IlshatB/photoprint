import { Segment } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const styles = { 
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    forms: {
        display: 'flex',
        justifyContent: 'center',
    }
}

const Authentication = () => {
    return (
        <div style={styles.container}>
            <Segment secondary style={styles.forms}>
                <RegistrationForm />
                <LoginForm />
            </Segment>
        </div>
    )
}

export default Authentication