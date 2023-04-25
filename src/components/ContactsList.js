import { Link , useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react"
import bcase from '../assets/briefcase.svg'
import personal from '../assets/personal.svg'
import React from "react"

function ContactsList({setContacts, contacts, deleteContact, setEditContact}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState({
    Work:false,
    Personal:false
  })
  
  const handleDelete = (contactId) => {
    deleteContact(contactId)
  }

  const handleEdit = (contact) => {
    setEditContact(contact)
  }

  const handleFilter = (e) => {
    const {name , checked} = e.target
    setFilter({...filter, [name] : checked })
  }
  
  useEffect(() => {
    if (filter.Work && filter.Personal) {
      setSearchParams({type:['Work','Personal']})
    } else if (filter.Work) {
      setSearchParams({type:['Work']})
    } else if (filter.Personal) {
      setSearchParams({type:['Personal']})
    } else {
      searchParams.delete('type')
      setSearchParams(searchParams)
    }

    const type = searchParams.get('type')


  },[filter])

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <div className="filters">
        <div>
          <label htmlFor="work-filter">Work contacts filter: </label>
          <input onChange={handleFilter} type="checkbox" id="work-filter" name="Work" ></input>
        </div>
        <div>
          <input onChange={handleFilter} type="checkbox" id="personal-filter" name="Personal" ></input>
          <label htmlFor="personal-filter"> :Personal contacts filter</label>
        </div>
      </div>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, type } = contact
          return (
            <li className="contact" key={index}>
              <div className="grid-two">
                <div>{type === "Work" ? <img className="imgType" src={bcase}></img> : <img className="imgType" src={personal}></img> } </div>
                <div>{firstName} {lastName}</div>
              </div>
              <p>
                <span className="link">
                  <Link to={`/contacts/${contact.id}`}>
                    View
                  </Link>
                </span>
                <span className="link">
                  <Link onClick={() => handleEdit(contact)} to={'/contacts/edit'}>
                    Edit
                  </Link>
                </span>
                <span className="link">
                  <Link onClick={() => handleDelete(contact.id)} to={'/'}>
                    Delete
                  </Link>
                </span>
              </p>
              <p>
                <Link to={`/contacts/${contact.id}/meetings`}>
                  Meetings
                </Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
