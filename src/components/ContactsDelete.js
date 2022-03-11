import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"


function ContactsDelete(props) {

    let navigate = useNavigate()
    const params = useParams()
    const { setContacts, contacts } = props


    function deleteItem(){
        const options = {

            method: 'DELETE'
    
            //A DELETE request has no request body - using REST, we identify we resource
            //we want to delete via the URL. So we don't need to specify the other options
            //here
        }
        setContacts(preVal => preVal.filter(contact => contact.id != params.id))
        //The URL in this case means to delete contact.id
    
        fetch(`http://localhost:4000/contacts/${params.id}`, options)
            .then(response => response.json())
            .then(response => {
                //log it out.
                console.log("Contact deleted", response)
                navigate('/')
            })
    }
    
    return (
        <div className="actions-section">
            <h3>Would you like to delete this contact?</h3>
            <button onClick={deleteItem}
                className="button delete" type="submit">
                Yes, please!
            </button>
            <button onClick={() => navigate('/')}
                className="button delete" type="submit">
                No, thank you!
            </button>
        </div>
    )
}

export default ContactsDelete