import './App.css';
import { useEffect } from 'react';
import React from 'react';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import { BrowserRouter as Router,Route ,Switch} from 'react-router-dom';
import WebFont from "webfontloader";
import Loader from './component/layout/Loader/Loader';
import EmployeeDetails from "./component/Employee/EmployeeDetails.js";
import Employees from "./component/Employee/Employees";
import Search from "./component/Employee/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import  UpdateProfile  from"./component/User/UpdateProfile.js";

function App() {
  
  const{isAuthenticated,user}=useSelector(state=>state.user)


  //For setting web fonts before loading
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    }, []);

  return (
    <Router>
      
      <Header/>
      {isAuthenticated&&<UserOptions user={user}/>}
    <Route  exact path="/" component={Home}/>
    <Route  exact path="/Employee/:id" component={EmployeeDetails}/>
    <Route exact path="/Employees" component={Employees}/>
    <Route  path="/Employees/:keyword" component={Employees}/>
    <Route exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account"component={Profile}/>
    <ProtectedRoute exact path="/me/update"component={UpdateProfile}/>
    <Route exact path="/login" component={LoginSignUp}/>
      
      <Footer/>

      </Router>
  )
}

export default App;
