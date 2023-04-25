import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/spinner.css"
function Spinner() {


  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
  )
}

export default Spinner