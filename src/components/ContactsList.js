import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  const { contacts, setContacts } = props
  let [searchParams, setSearchParams] = useSearchParams()
  const [filterType, setFilterType] = useState(contacts)

  function deleteContact(event) {
    const options = {
      method: "DELETE",
    }
    fetch(`http://localhost:4000/contacts/${event.id}`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        const contactArr = [...contacts]
        for (let i = 0; i < contactArr.length; i++) {
          if (event.id === contactArr[i].id) {
            contactArr.splice(i, 1)
            setContacts(contactArr)
          }
        }
      })
       
  }
  function handleType(event) {
    const inputValue = event.target.value
    setSearchParams({type: inputValue})
    console.log(inputValue)
    if (inputValue === 'Work') {
      filterTypeWork()
    } if(inputValue === 'Personal') {
      filterTypePersonal()
    } if (inputValue === 'Choose') {
      setFilterType(contacts)
    }
  }
  function filterTypeWork () {
    const workArr = contacts.filter(item => item.contactType === 'work')
    setFilterType(workArr)
  }
  function filterTypePersonal () {
    const personalArr = contacts.filter(item => item.contactType === 'personal')
    setFilterType(personalArr)
  }


  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
         <label>Filter: 
          <select
          id="filter"
          name="filter"
          type="radio"
          onChange={handleType}
        >
           <option filterType='choose'>Choose</option>
          <option filterType='work'>Work</option>
          <option filterType='personal'>Personal</option>
        </select>
      </label> 
      <ul className="contacts-list">
        {filterType.map((contact, index) => {
          const { firstName, lastName, contactType } = contact
          let type = ''
          if(contactType === "work") {
            type = '💼'
          } if(contactType === "personal") {
            type = '😎'
          }
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName} {type}
              </p>
              <Link to={`/contacts/${contact.id}`}>
                <p>View</p>
              </Link>
              <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
              <button onClick={() => deleteContact(contact)}>delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
