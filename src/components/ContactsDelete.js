import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function ContactsDelete ({contacts, setContacts}) {
    const navigate = useNavigate()
    const params = useParams()

    const handleDelete = async () => {
        console.log(params.id)

        const res = await fetch(`http://localhost:4000/contacts/${params.id}`, {
        method: 'DELETE'
        })

        const filteredContact = contacts.filter(item => item.id !== params.id)
        setContacts(filteredContact)

        navigate('/')
        window.location.reload()
  }


    return (<button onClick={handleDelete}>Confirm Delete</button>)
}