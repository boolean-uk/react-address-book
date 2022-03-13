import { useEffect, useState } from "react"

const useFetch = (url, dependences = null, setter, options = { method: 'GET' }) => {

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url, options)
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
                setIsPending(false)
                setError(err.message)
            })
    }, [dependences])
    return { isPending, error }
}

export default useFetch;