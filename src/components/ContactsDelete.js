import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ContactsDelete () {
const params = useParams()
const navigate = useNavigate

fetch(`http://localhost:4000/tasks/${params.id}`), {
    method : 'DELETE',
      }

navigate('/')

}

export default ContactsDelete