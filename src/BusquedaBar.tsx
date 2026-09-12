import "./assets/BusquedaBar.css";

interface SearchBarProps {
  busqueda: string;
  setBusqueda: (valor: string) => void;
}

const SearchBar = ({
  busqueda,
  setBusqueda
}: SearchBarProps) => {

  return (

    <div className="busqueda-container">

      <input
        className="busqueda-input"
        placeholder="🔍 Buscar paciente..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
      />

    </div>

  );
};

export default SearchBar;
