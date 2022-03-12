import React from 'react'
import { Bars } from 'react-loader-spinner'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function Meetings() {
  const params = useParams()
  const [meeting, setMeeting] = useState(false)
  console.log(params)

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then((res) => res.json())
    .then((data) => setMeeting(data.meetings))
  }, [params])

  if (!meeting) {
    return (<Bars/>)
  }
console.log("THE",meeting)


  return (
    <>
    <Link to={`/contact/${params.id}/meetings/addMeeting`}>Add Meeting</Link>
    <br></br>
    <h4>CURRENT MEETINGS:</h4>
    <br></br>
    {meeting.map((meeting) => (
      <>
      <p>Date: {meeting.date}</p> 
      <p>Time: {meeting.time} </p>
      <p>Location: {meeting.location}</p>
      <br></br>
</>
    ))}
    </>
  )
}
