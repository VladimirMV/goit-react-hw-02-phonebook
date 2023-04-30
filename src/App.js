import { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
      { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
      { id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    const nameExist = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    const numberExist = contacts.find(c => c.number === number);
    const isNameOrNumberEmpty = name.trim() === '' || number.trim() === '';
    const isIncorrectNumber = !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);

    if (nameExist) {
      alert(`${name} is already in contacts.`);
    } else if (numberExist) {
      alert(`${number} is already in contacts.`);
    } else if (isNameOrNumberEmpty) {
      alert("Enter the contact's name and number phone!");
    } else if (isIncorrectNumber) {
      alert('Enter the correct number phone!');
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const isContactsNotEmpty = contacts.length > 0;

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length <= 1 ? null : (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        {isContactsNotEmpty ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </Container>
    );
  }
}

export default App;

// This code is a React component called "App" that represents a simple phonebook application.
// It imports necessary components from respective files and libraries,
// that are then used to render contacts in a container with a filter feature.

// The initial state of "App" component includes an array of contacts with their respective IDs,
// names and phone numbers, and an empty filter property.

// The component has several functions such as addContact, deleteContact, changeFilter,
// and getVisibleContacts that manipulate state based on user input or data changes.

// The render function uses the state and variables with their respective values
// to conditionally render UI elements.This includes a few headings, a contact form,
// a filtered search bar, and a contact list that display contacts added by users.

// The rendered UI elements allow users to view, add, filter, and delete contacts
// in the application.
