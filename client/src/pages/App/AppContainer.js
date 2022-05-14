import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { CartProvider } from '../../providers'
import store from '../../store'

import App from './App'

export default function AppContainer() {
    return (
        <Router>
            <CartProvider>
                <ReduxProvider store={store}>
                    <App />
                </ReduxProvider>
            </CartProvider>
        </Router>
    )
}