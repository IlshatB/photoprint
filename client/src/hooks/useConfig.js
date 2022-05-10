import { useMemo } from "react"

import useCurrentClient from './useCurrentClient'

const useConfig = () => {
    const { token } = useCurrentClient()

    const config = useMemo(() => ({
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }), [token])

    return config
}

export default useConfig