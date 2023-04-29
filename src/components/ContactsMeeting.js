import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"





function ContactsMeeting () {
    const [contactMeetings, setcontactMeetings] = useState([])
    const params = useParams()
    // console.log(params.id);

    useEffect(function (){
        fetch("http://localhost:4000/contacts")
        .then(res => res.json())
        .then(data => setcontactMeetings(data))



    }, [])

   
    
    
  
return(
    <>
    {
             
              <ul className="contacts-list">
              {
              
              contactMeetings.map((meeting, index) => {
                
            
                return (
                  <li className="contact" key={index}>
                    <span>
                      Location: {} 
                    </span>
                    <span>
                      Date: {} 
                    </span>
                    <span>
                      Time: {} 
                    </span>
                  </li>
                )
              })}
            </ul>
    }
    
    
    </>
    




)




}



export default ContactsMeeting