import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    try {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddRepository() {
    api
      .post("repositories", {
        title: `Novo desafio ${Date.now()}`,
        url: "https://github.com/brunosf/desafio-conceitos-node",
        techs: ["Nodejs"],
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      })
      .catch((error) => console.log(error));
  }

  function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then((response) => {
        setRepositories(repositories.filter((project) => project.id !== id));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((project, index) => (
          <li key={index}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
