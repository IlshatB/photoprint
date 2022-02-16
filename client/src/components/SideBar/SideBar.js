import { useState } from 'react'
import { Sidebar, Segment, Menu, Icon, Image, Header } from 'semantic-ui-react'

const SideBar = () => {
    const [visible, setVisible] = useState(true)

    return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
        <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='/images/wireframe/paragraph.png' alt="test" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      )
}

export default SideBar