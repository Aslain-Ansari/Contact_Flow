import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactCard = (props) => {
  let { name, email, id } = props.contact;

  return (
    <div className="item">
      <div className="ui grid">
        {/* Left Section: User Image & Details */}
        <div
          className="twelve wide column"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img className="ui avatar image" src={user} alt="user" />
          <div className="content" style={{ marginLeft: "10px" }}>
            <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
              <div className="header">{name}</div>
              <div>{email}</div>
            </Link>
          </div>
        </div>

        {/* Right Section: Icons */}
        <div
          className="four wide column"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <i
            className="trash alternate outline icon red large"
            style={{ cursor: "pointer", marginRight: "15px" }}
            onClick={() => props.clickHandler(id)}
          ></i>

          <Link to={"/edit"} state={{ contact: props.contact }}>
            <i
              className="edit alternate outline icon green large"
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
