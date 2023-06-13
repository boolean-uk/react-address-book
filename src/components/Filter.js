import { Link, useNavigate } from 'react-router-dom'

/*
    use a checkboxes
*/
export default function Filter({ name, typeFilter, params }) {
    const navigate = useNavigate()

    const filter = (e) => {
        if (!e.target.checked) navigate(removedFilter())
        else navigate(addedFilter())
    }

    const addedFilter = () =>
        params.size === 0 ?  
            `/?type=${typeFilter}` : 
            `/?${params}&type=${typeFilter}`

    const removedFilter = () => 
        '/?' + `${params}`.replace(`type=${typeFilter}`, '')
                        .split('&')
                        .filter(s => s)
                        .join('&')

    return (
        <span>
            <input type="checkbox" id={name} onClick={filter} />
            <label htmlFor={name}>{name}</label>
        </span>
    )
}

/*
    use a Link component
*/
function LinkFilter({ name, contactTypes }) {
    const searchParams = contactTypes.map(c => `type=${c}`).join('&')

    return <Link to={`/?${searchParams}`}>{name}</Link>
}