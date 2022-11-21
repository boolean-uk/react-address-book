import './spinner.css'

function Spinner() {
  return(
    <div className="spin-container">
      <div className="spin" id="loader"></div>
      <div className="spin" id="loader2"></div>
      <div className="spin" id="loader3"></div>
      <div className="spin" id="loader4"></div>
    </div>
  )
}

export default Spinner