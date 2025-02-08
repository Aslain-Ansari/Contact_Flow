import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "./api/contacts";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //! Retrieve contacts from json-server
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    let { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />

        {/* ✅ Responsive Grid Layout */}
        <div className="ui stackable doubling grid">
          <div className="row centered">
            <div className="sixteen wide column">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ContactList
                      contacts={
                        searchTerm.length < 1 ? contacts : searchResults
                      }
                      getContactId={removeContactHandler}
                      term={searchTerm}
                      searchHandler={searchHandler}
                    />
                  }
                />
                <Route
                  path="/add"
                  element={<AddContact addContactHandler={addContactHandler} />}
                />
                <Route
                  path="/edit"
                  element={
                    <EditContact updateContactHandler={updateContactHandler} />
                  }
                />
                <Route path="/contact/:id" element={<ContactDetail />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
