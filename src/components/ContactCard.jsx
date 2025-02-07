import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";
const ContactCard = (props) => {
  let { name, email, id } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content" style={{ marginLeft: "10px" }}>
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          cursor: "pointer",
          position: "relative",
          left: "1100px",
          bottom: "18px",
        }}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link to={"/edit"} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon"
          style={{
            color: "green",
            cursor: "pointer",
            position: "relative",
            left: "1050px",
            bottom: "33px",
          }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
