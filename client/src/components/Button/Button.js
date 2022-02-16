import { Button as ButtonSUI } from 'semantic-ui-react'

import IconButton from './IconButton'

const Button = ({ label }) => {
    return (
        <ButtonSUI primary>
            {label}
        </ButtonSUI>
    )
}

Button.Icon = IconButton

export default Button

