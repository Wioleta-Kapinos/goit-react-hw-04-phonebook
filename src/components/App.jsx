import React, { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export const App = () =>{
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
   
  useEffect(() => {
    const contactsInStorage = localStorage.getItem("contacts");
    const parsedContactsInStorage = JSON.parse(contactsInStorage);
      if (parsedContactsInStorage) {
        setContacts(parsedContactsInStorage);
      }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filterValue = event => {
    setFilter(event.currentTarget.value);
  }

  const filterContacts = () => {
      return contacts.filter(contact => 
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
  }

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
      
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    } 
    setContacts([...contacts, { id: nanoid(), name, number }]);
    form.reset();
  }

    const deleteContact = (id) => {
      setContacts(prevState => prevState.filter((contact) => contact.id !== id)
      );
    }

   const filteredContacts = filterContacts();

      return (
        <div className="App">
          <h1>Phonebook</h1>
            <ContactForm handleSubmit={handleSubmit}/>
          <h2>Contacts</h2>
            <Filter 
          value={filter}
          onChange={filterValue}
          filteredContacts={filteredContacts}/>
            <ContactList 
          contacts={filteredContacts}
          deleteContact={deleteContact}/>
        </div>
      )
}