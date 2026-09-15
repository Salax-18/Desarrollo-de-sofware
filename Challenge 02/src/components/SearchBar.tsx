interface Props { value: string; onChange: (value:string)=>void; }
export default function SearchBar({ value, onChange }: Props) {
  return <div className="search"><input value={value} onChange={e=>onChange(e.target.value)} placeholder="Buscar por nombre o teléfono..." /></div>;
}
