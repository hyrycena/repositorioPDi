import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const buscaTask = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tarefas");
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  const createTask = async () => {
    try {
      const data = {
        name,
        descricao,
      };

      await axios.post("http://localhost:3000/tarefas", data);
      buscaTask();
      setDescricao("");
      setName("");
    } catch (error) {}
  };
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const DeletarVaga = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tarefas/${taskId}`);

      buscaTask();
      console.log(taskId);
    } catch (error) {}
  };

  useEffect(() => {
    buscaTask();
  }, []);

  const fezTudin = name && descricao;

  return (
    <div className="App">
      <header className="App-header">Todu do Rafaek</header>
      <main className="main-css">
        <div>
          <div>Novas tarefas</div>
          <div>Digite o nome para a tarefa </div>
          <input
            placeholder=" adicione um nome a sua tarefas"
            value={name}
            onChange={handleChange(setName)}
          ></input>
          <div>digite uma descrição </div>
          <input
            placeholder=" adicione uma descrição a sua tarefas"
            value={descricao}
            onChange={handleChange(setDescricao)}
          ></input>
          <div>
            <button
              className="botaoTask"
              onClick={createTask}
              disabled={!fezTudin}
            >
              Criar tarefa
            </button>
          </div>
        </div>
        <div>
          <p>tarefa abertas:</p>
          {tasks.map((tarefas) => (
            <div className="task">
              <div className="cards">
                <div>
                  <div>tarefa: {tarefas.name}</div>
                  <div>Descrição: {tarefas.descricao}</div>
                </div>
                <button
                  className="botaoDeletar"
                  onClick={() => {
                    DeletarVaga(tarefas.id);
                  }}
                >
                  Deletar task
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
