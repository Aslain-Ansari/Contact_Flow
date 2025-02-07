import React from "react";
import { useLocation, Link } from "react-router-dom";
import userIcon from "../images/userIcon.jpg";
const ContactDetail = (props) => {
  const location = useLocation();
  console.log(location);
  const { contact } = location.state || {};
  if (!contact) return <h2>No contact details available</h2>;
  return (
    <div className="main" style={{ marginTop: "70px" }}>
      <div className="ui card centered">
        <div className="image">
          <img src={userIcon} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
      </div>
      <div className="center-div" style={{ textAlign: "center" }}>
        <Link to={"/"}>
          <button className="ui button blue center">Back to contacts</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
