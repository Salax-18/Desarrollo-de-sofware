import { FormEvent, useState } from 'react';

interface Props { onAdd: (name: string, phone: string) => void; }

export default function ContactForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onAdd(name.trim(), phone.trim());
    setName('');
    setPhone('');
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Nuevo contacto</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" />
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Teléfono" />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}
