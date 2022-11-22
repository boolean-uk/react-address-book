function Meetings(props) {

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      <h3 className='new-meeting-subheading'>New Meeting:</h3>
      <form className='form-stack meeting-form'>
        {/* name input */}
        <label>Name: </label>
        <input type="text"></input>

        {/* date input */}
        <label>Date: </label>
        <input type="date"></input>
        
        {/* time input */}
        <label>Time: </label>
        <input type="time"></input>

        {/* location input */}
        <label>Address: </label>
        <input type="text" className='meeting-form-address'></input>
      </form>

      <hr/>

      <h3 className='current-meeting-subheading'>Current Meetings:</h3>
      <ul>
        <li>Meeting 1</li>
      </ul>
    </>
  )
}

export default Meetings