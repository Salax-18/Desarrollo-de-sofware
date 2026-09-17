import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Laura Méndez', phone: '300 456 7890' },
  { id: 2, name: 'Mateo Rojas', phone: '315 222 1188' },
  { id: 3, name: 'Sofía Torres', phone: '310 678 9034' }
];

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addContact = (name: string, phone: string) => {
    setContacts(prev => [...prev, { id: Date.now(), name, phone }]);
  };

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.phone.includes(search)
  );

  return (
    <main className="app">
      <section className="hero"> <img className="hero-image" src="\contactos.jpg" alt="Ilustración de contactos" />
        
        <h1>Contactos</h1>
        <p>Organiza tus contactos de forma sencilla.</p>
      </section>

      {loading ? (
        <div className="loader-card"><div className="loader"></div><p>Cargando contactos...</p></div>
      ) : (
        <>
          <ContactForm onAdd={addContact} />
          <SearchBar value={search} onChange={setSearch} />
          <ContactList contacts={filteredContacts} onDelete={deleteContact} />
        </>
      )}
    </main>
  );
}
