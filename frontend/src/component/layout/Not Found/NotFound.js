import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div><center><h1 className='mt-5'>Error-404</h1>
    <h4>Page Not Found!</h4>
    <Link to='/'><button className="btn btn-danger m-5">Back</button></Link></center>
    
    </div>
  )
}

export default NotFound