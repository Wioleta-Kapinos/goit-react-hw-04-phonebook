import React, { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export class App extends Component{
    state = {
      contacts: [],
      filter: "",
    }
    componentDidMount() {
      const contactsInStorage = localStorage.getItem("contacts");
      const parsedContactsInStorage = JSON.parse(contactsInStorage);
      if (parsedContactsInStorage) {
        this.setState ({
          contacts: parsedContactsInStorage,
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
      }
    }

    handleSubmit = event => {
      event.preventDefault();
      const form = event.currentTarget;
      const name = form.elements.name.value;
      const number = form.elements.number.value;
      
      let contactExists = false;
      this.state.contacts.forEach(contact => {
        if (contact.name.toLowerCase() === name.toLowerCase()) {
          alert(`${contact.name} is already in contacts.`)
          contactExists = true;
        }
      });

      if(!contactExists) {
          this.setState(state => {
            return {
              contacts: [...this.state.contacts, { id: nanoid(), name, number }],
            }
          });
      };
      form.reset();
    }

    deleteContact = (id) => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter((contact) => contact.id !== id)
      }));
    }

    filter = event => {
      this.setState({
        filter: event.currentTarget.value,
      });
    }

    filterContacts = () => {
      const { contacts, filter } = this.state;
        return contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    render() {
      const value = this.state.filter;
      return (
        <div className="App">
          <h1>Phonebook</h1>
            <ContactForm handleSubmit={this.handleSubmit}/>
          <h2>Contacts</h2>
            <Filter 
          value={value}
          onChange={this.filter}
          filteredContacts={this.filterContacts()}/>
            <ContactList 
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}/>
        </div>
      )
    };
}