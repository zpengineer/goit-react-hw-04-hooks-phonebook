import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from '../hooks/localStorage';
import Container from './Container';
import ContactsList from './ContactsList';
import Phonebook from './Phonebook';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onFormSubmit = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalazeName = name.toLowerCase();

    const hasName = contacts.find(contact =>
      contact.name.toLowerCase().includes(normalazeName)
    );

    hasName
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const normalazeFilter = filter.toLowerCase();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalazeFilter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>

      <Phonebook onSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
