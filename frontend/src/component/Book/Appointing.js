import React, { Fragment, useState } from "react";
import "./Appointing.css";
import { useSelector, useDispatch } from "react-redux";
import { saveAppointingInfo } from "../../actions/bookAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Book/CheckoutSteps";

const Appointing = ({history}) => {
  

  const dispatch = useDispatch();
  const alert = useAlert();
  const { appointingInfo } = useSelector((state) => state.book);

  const [address, setAddress] = useState(appointingInfo.address);
  const [city, setCity] = useState(appointingInfo.city);
  const [state, setState] = useState(appointingInfo.state);
  const [country, setCountry] = useState(appointingInfo.country);
  const [pinCode, setPinCode] = useState(appointingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(appointingInfo.phoneNo);

  const appointingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveAppointingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/appointment/confirm");
  };

    return <Fragment>
        <MetaData title="Booking Address Details" />
        <CheckoutSteps activeStep={0} />
         <div className="appointingContainer">
        <div className="appointingBox">
          <h2 className="appointingHeading">Booking Details</h2>

          <form
            className="appointingForm"
            encType="multipart/form-data"
            onSubmit={appointingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="appointingBtn"
              
            />
          </form>
        </div>
      </div>
    </Fragment> 
};

export default Appointing;
