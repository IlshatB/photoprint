import { BrowserRouter as Router } from 'react-router-dom'

// import { MenuProvider } from '../../providers'

import App from './App'

export default function AppContainer() {
    return (
        <Router>
            {/* <MenuProvider> */}
                <App />
            {/* </MenuProvider> */}
        </Router>
    )
}