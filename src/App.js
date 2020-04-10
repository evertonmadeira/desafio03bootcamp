import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";
import AddRepo from "./components/AddRepo";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((error) => console.log(error));
  }, [repositories]);

  async function handleRemoveRepository(id) {
    try {
      const res = await api.delete("repositories/" + id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="container-h1">
        <h1>Desafio 03 - Conceitos ReactJS</h1>
        <p>
          Consiste em desenvolver uma aplicação para armazenar repositórios na
          API desenvolvida no Desafio 02.
        </p>
      </div>
      <div>
        <AddRepo />
        <ul data-testid="repository-list">
          <h1>Projetos</h1>
          {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
