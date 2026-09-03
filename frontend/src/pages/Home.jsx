import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>KOTHTHU GUYS</h1>
      <p>Simple Notes Management Application</p>

      <button onClick={() => navigate("/notes")}>
        View Notes
      </button>
    </div>
  );
}

export default Home;