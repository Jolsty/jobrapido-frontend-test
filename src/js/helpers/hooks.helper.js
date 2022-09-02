import { useEffect } from 'react'

export const useOutsideAlerter = (ref, cb) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event?.target)) {
        if (cb && typeof cb === 'function') {
          cb()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
