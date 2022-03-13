import { useEffect, useState } from "react"

const useFetch = (url, dependences = null, setter, options = { method: 'GET' }) => {

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()
        fetch(url, options, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) throw Error('could not fetch the data from the source')
                return res.json()
            })
            .then(res => {
                setter(res)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                }
                else {
                    setIsPending(false)
                    setError(err.message)
                }
            })
        return () => abortCont.abort()
    }, [dependences])
    return { isPending, error }
}

export default useFetch;