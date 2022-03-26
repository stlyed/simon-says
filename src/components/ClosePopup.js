import { useEffect } from 'react'

/**
 *
 * @param ref - useRef() 
 * @param handler - useState()
 */
const ClosePopup = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            const el = ref?.current

            // @ts-ignore: Property 'contains' does not exist on type 'never'.
            if (!el || el.contains(event.target)) {
                return
            }
            
            // @ts-ignore: Type 'string' has no call signatures.
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}

export default ClosePopup