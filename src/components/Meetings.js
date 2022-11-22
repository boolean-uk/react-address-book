function Meetings(props) {

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      
      <form className='form-stack meeting-form'>
        <h3 className='meetings-subheadings'>New Meeting:</h3>
        {/* name input */}
        <label htmlFor='name'>Name: </label>
        <input 
          type="text" 
          id='name' 
          name='name' 
          placeholder='Project planning' 
          required 
          // onChange={handleChange} 
          // value={meetingData.name}
        />

        {/* date input */}
        <label htmlFor='date'>Date: </label>
        <input 
          type="date" 
          id='date' 
          name='date'  
          required 
          // onChange={handleChange} 
          // value={meetingData.date}>
        />
        
        {/* time input */}
        <label htmlFor='time'>Time: </label>
        <input 
          type="time" 
          id='time' 
          name='time'  
          required 
          // onChange={handleChange} 
          // value={meetingData.time}
        />

        {/* location input */}
        <label htmlFor='location'>Location: </label>
        <input 
          type="text" 
          id='location' 
          name='location' 
          placeholder='Zoom/Office room 3' 
          required 
          // onChange={handleChange} 
          // value={meetingData.location} 
          className='meeting-form-location'
        />
      </form>

      <hr className='meetings-hr'/>

      <h3 className='meetings-subheadings'>Current Meetings:</h3>
      <ul>
        <li>Meeting 1</li>
      </ul>
    </>
  )
}

export default Meetings