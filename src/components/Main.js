import React, { Component } from "react";
import './Main.css';

import Form from './Form';
import Tarefas from "./Tarefas";


export default class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     novaTarefa: '',
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  // }
  state = {
    novaTarefa: '',
    index: -1,
    tarefas: []
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) return;
    this.setState({ tarefas })
  };

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim()

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: '',
      })
    }

  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value
    })
  }
  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novastarefas = [...tarefas];
    novastarefas.splice(index, 1);

    this.setState({ tarefas: [...novastarefas] })
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
    })

  }

  render() {
    const { novaTarefa, tarefas } = this.state
    return (
      <div className="main">
        <h1>Lista de tarefas</h1>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
