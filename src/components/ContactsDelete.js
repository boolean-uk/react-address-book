// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";

// function ContactsDelete({ setContacts, contacts }) {
//   // setContacts and contacts must be passed as props
//   // to this component so new contacts can be added to the
//   const [newContact, setNewContact] = useState();
//   // state
//   // const { setContacts, contacts } = props

//   //TODO: Implement controlled form
//   //send POST to json server on form submit
//   // console.log(setContacts);
//   const { id } = useParams();
//   useEffect(() => {
//     console.log(contacts);
//     contacts.forEach((contact) => {
//       if (contact.id === +id) {
//         setNewContact(contact);
//       }
//     });
//   }, []);

//   const navigate = useNavigate();

//   );
// }

// export default ContactsDelete;
