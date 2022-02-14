import './App.css';
import { useEffect,useState } from 'react';
import React from 'react';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import { BrowserRouter as Router,Route ,Switch} from 'react-router-dom';
import WebFont from "webfontloader";
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
import UpdateProfile  from"./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Book from "./component/Book/Book";
import Appointing from "./component/Book/Appointing.js";
import ConfirmAppointment from './component/Book/ConfirmAppointment';
import Payment from './component/Book/Payment';
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import AppointmentSuccess from "./component/Book/AppointmentSuccess";
import MyAppointments from "./component/Appointment/MyAppointments";
import AppointmentDetails from "./component/Appointment/AppointmentDetails";
import Dashboard from "./component/Admin/Dashboard";
import EmployeeList from "./component/Admin/EmployeeList";
import NewEmployee from "./component/Admin/NewEmployee";
import UpdateEmployee from"./component/Admin/UpdateEmployee";
import AppointmentList from './component/Admin/AppointmentList';
import ProcessAppointment from './component/Admin/ProcessAppointment';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import EmployeeReviews from './component/Admin/EmployeeReviews';
import Contact from './component/ContactAbout/Contact';
import About from './component/ContactAbout/About';
import NotFound from './component/layout/Not Found/NotFound';
function App() {
  
  const{isAuthenticated,user}=useSelector(state=>state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApikey() {

    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  //For setting web fonts before loading
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApikey();

    }, []);
   
    window.addEventListener("contextmenu", (e)=>e.preventDefault());
  return (
    <Router>
      
      <Header isAuthenticated={isAuthenticated}user={user}/>
      {isAuthenticated&&<UserOptions user={user}/>}
      
      {stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute exact path="/process/payment" component={Payment} />
       </Elements>
    )}


   <Switch>
   <Route  exact path="/" component={Home}/>
    <Route  exact path="/Employee/:id" component={EmployeeDetails}/>
    <Route exact path="/Employees" component={Employees}/>
    <Route  path="/Employees/:keyword" component={Employees}/>
    <Route exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account"component={Profile}/>
    <ProtectedRoute exact path="/me/update"component={UpdateProfile}/>
    <ProtectedRoute exact path="/password/update"omponent={UpdatePassword}/>
    <Route exact path="/password/forgot" component={ForgotPassword} />
    <Route exact path="/password/reset/:token" component={ResetPassword} />
    <Route exact path="/login" component={LoginSignUp}/>
    <Route exact path="/book" component={Book} />
    <Route exact path="/contact" component={Contact}/> 
    <Route exact path="/about" component={About}/> 
    <ProtectedRoute exact path="/appointing" component={Appointing} />
   <ProtectedRoute exact path="/success" component={AppointmentSuccess} />
   <ProtectedRoute exact path="/appointments" component={MyAppointments} />

   <ProtectedRoute exact path="/appointment/confirm" component={ConfirmAppointment} />
   <ProtectedRoute exact path="/appointment/:id" component={AppointmentDetails} />
    
   <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/employees"
          isAdmin={true}
          component={EmployeeList}
        />
        <ProtectedRoute
          exact
          path="/admin/employee"
          isAdmin={true}
          component={NewEmployee}
        />
        <ProtectedRoute
          exact
          path="/admin/employee/:id"
          isAdmin={true}
          component={UpdateEmployee}
        />

        <ProtectedRoute
          exact
          path="/admin/appointments"
          isAdmin={true}
          component={AppointmentList}
        />

       <ProtectedRoute
          exact
          path="/admin/appointment/:id"
          isAdmin={true}
          component={ProcessAppointment}
        />

        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

      <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

      <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={EmployeeReviews}
        />

        <Route
          component={window.location.pathname === '/process/payment' ? null: NotFound
        }
        />
   </Switch>
   
      <Footer/>

      </Router>
  )
}

export default App;
