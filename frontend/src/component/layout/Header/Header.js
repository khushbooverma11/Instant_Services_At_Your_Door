import React, { Fragment } from "react";
import { Link ,NavLink} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Header = ({isAuthenticated,user}) => {
  console.log(isAuthenticated);
  console.log(user);
  return <Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <NavLink to="/" className="navbar-brand ms-4" >Instant Services</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse mx-auto" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
        <li className="nav-item m-2">
        <NavLink to="/" className="navlink">
          <div className="text"> Home</div>
        </NavLink>
        </li>
        <li className="nav-item m-2">
        <NavLink to="/Employees" className="navlink">
          <div className="text"> Services</div>
        </NavLink>
        </li>
        <li className="nav-item m-2">
        <NavLink to="/contact" className="navlink">
          <div className="text"> Contact Us</div>
        </NavLink>
        </li>
        <li className="nav-item m-2">
        <NavLink to="/about" className="navlink">
          <div className="text">About Us</div>
        </NavLink>
        </li>
      </ul>
      
  
      <Link to="/search"><button type="button"  className=" btn btn-light me-5"><SearchIcon/></button></Link>
      

      {isAuthenticated === true ? <></>:
                <> <Link to="/login" ><button className="btn btn-outline-primary">Login</button></Link>
                  </> }
    </div>
  </div>
</nav>
  </Fragment>
};

export default Header;
