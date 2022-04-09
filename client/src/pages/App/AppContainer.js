import { BrowserRouter as Router } from 'react-router-dom'

import { ShoppingCartProvider } from '../../providers'

import App from './App'

export default function AppContainer() {
    return (
        <Router>
            <ShoppingCartProvider>
                <App />
            </ShoppingCartProvider>
        </Router>
    )
}