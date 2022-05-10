import { useState, useLayoutEffect } from 'react'

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize)
        updateSize()

        return () => window.removeEventListener('resize', updateSize)
    }, [])
        
    return { width }
}

  export default useWindowWidth