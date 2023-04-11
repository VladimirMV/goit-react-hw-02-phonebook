import { Component } from 'react';
// import shortid from 'shortid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
// import Filter from './components/Filter/Filter';
// import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    // contacts: [
    //   { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
    //   { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
    //   { id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26' },
    // ],
    filter: '',
  };
  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert('Enter the correct number phone!');
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };
  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
      </Container>
    );
  }
}

export default App;
