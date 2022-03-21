import { Button } from 'semantic-ui-react'

export default function NotImplemented({ children }) {
    return (
        <div>
            <h1>Not implemented</h1>
            {children ?? ''}
        </div>
    )
}