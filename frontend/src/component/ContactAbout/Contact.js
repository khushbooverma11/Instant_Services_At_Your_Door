import React from 'react';
import './contact.css';
import { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FeedbackIcon from '@material-ui/icons/Feedback';

const contact = () => {
  return (
    <Fragment>
        <Link to='/'><button className="btn btn-danger m-5">Back</button></Link>
        <div className="container contact-block shadow-lg" >
        
        <Typography><h4>Follow us on</h4></Typography>
        <ul>
            <a href='#'><li>LinkedIn <LinkedInIcon/></li></a>
            <a href='#'><li>Facebook <FacebookIcon/></li></a>
            <a href='#'><li>twitter <TwitterIcon/></li></a>
        </ul>
        <Typography><h4 >Download our App</h4></Typography>
        <ul>
        <a href=''><li>Android</li></a>
        <a href=''> <li>IOS</li></a>
        </ul>
        <div className='Feedback-form'>
        <Typography><center><h3>Give us Feedback <FeedbackIcon/></h3></center></Typography>
        <form>
        <textarea className="form-control"></textarea>
        <button className="btn btn-primary mt-3">Submit</button>
        </form>
        </div>
        <br></br>
        <center><Typography><EmailIcon/> serviceathome2000@gmail.com</Typography></center>
        <div className="container">

        </div>
        
        
        </div>
    </Fragment>
  )
}

export default contact