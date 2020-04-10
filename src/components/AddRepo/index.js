import React, { useState } from "react";
import api from "../../services/api";

export default function AddRepo() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  async function handleAddRepository(e) {
    e.preventDefault();

    const repo = {
      title,
      url,
      techs,
    };

    try {
      await api.post("repositories", repo);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={handleAddRepository}>
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
        <button type="submit">Adicionar</button>
      </form>
    </>
  );
}
