import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, getContactId, term, searchHandler }) => {
  const inputEl = useRef();
  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    // console.log(inputEl.current.value);
    searchHandler(inputEl.current.value);
  };
  return (
    <div className="main" style={{ marginTop: "60px" }}>
      <h2 className="ui header">
        Contact List
        <Link to={"/add"}>
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            name="search"
            id="search"
            placeholder="Search contact"
            className="prompt"
            value={term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Found!"}
      </div>
    </div>
  );
};

export default ContactList;
