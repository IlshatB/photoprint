import { Button, Icon } from 'semantic-ui-react'

const IconButton = ({ label, icon }) => {
    return (
        <Button as='div' labelPosition='left'>
            {label ?? ''}
            <Icon name={icon} />
        </Button>
    )
}

export default IconButton