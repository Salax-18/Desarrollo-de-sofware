import type { Contact } from '../App';

interface Props { contacts: Contact[]; onDelete:(id:number)=>void; }
export default function ContactList({ contacts, onDelete }: Props) {
  return (
    <section className="card">
      <div className="section-title"><h2>Mis contactos</h2><span>{contacts.length}</span></div>
      {contacts.length === 0 ? <p className="empty">No hay contactos para mostrar.</p> :
        contacts.map(contact => (
          <article className="contact" key={contact.id}>
            <div><strong>{contact.name}</strong><p>{contact.phone}</p></div>
            <button className="delete" onClick={()=>onDelete(contact.id)}>Eliminar</button>
          </article>
        ))}
    </section>
  );
}
