import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"

const Meetings = props => {
    const [meetings,setMeetings] = useState([])
    const params = useParams()

    function getMeetings(meetings){
        console.log(meetings)
        const meetingsArr = []
        for(let i=0;i<meetings.date.length;i++){
            meetingsArr.push({})
            for (const key in meetings){
                if (key === 'id') continue;
                meetingsArr[i] = {...meetingsArr[i], [key]:meetings[key][i]}
            }
        }
        return meetingsArr
    }

    useEffect(()=>params && fetch(`http://localhost:4000/meetings/${params.id}`)
            .then(res => res.json())
            .then(json => setMeetings(() => getMeetings(json)))
            ,[params])


    return <ul>
        {meetings && meetings.map(meeting => {
            const {date,time,location} = meeting;
            return <li>{`${date} ${time} ${location}`}</li>
        })}
    </ul>
}

export default Meetings