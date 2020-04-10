import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((error) => console.log(error));
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const repo = {
      title,
      url,
      techs,
    };

    try {
      const res = await api.post("repositories", repo);
      setRepositories([...repositories, res.data]);
    } catch (error) {
      console.log(error);
    }
    setTitle();
    setUrl();
    setTechs();
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container-h1">
        <h1>Desafio 03 - Conceitos ReactJS</h1>
        <p>
          Consiste em desenvolver uma aplicação para armazenar repositórios na
          API desenvolvida no Desafio 02.
        </p>
      </div>
      <div className="container">
        <form>
          <h1>Novo Projeto</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Techs, techs, techs"
            value={techs}
            onChange={(e) => setTechs(e.target.value)}
          />
          <button type="button" onClick={handleAddRepository}>
            Adicionar
          </button>
        </form>

        <div className="list-projects">
          <h1 style={{ marginBottom: "5px" }}>Projetos</h1>
          <ul data-testid="repository-list">
            {repositories.map((repository) => (
              <li key={repository.id}>
                {repository.title}
                <button
                  // type="button"
                  onClick={() => handleRemoveRepository(repository.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
