import React from "react";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";

import "./App.css";
import { TaskList } from './pages/TaskList';

//import { fadeIn } from 'react-animations'


const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};

//let rand1=0;


export class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
    
    this.state = {
      notes: [],
    }

    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("data", (event/*: any*/) => {
      console.log(`assistant.on(data)`, event);
      // console.log(`assistant.on(data)`, event.action);
      // if(event.type==)
      const { action } = event
      
      this.dispatchAssistantAction(action);

      
      
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant () {
    console.log('getStateForAssistant: this.state:', this.state)
    const state = {
      item_selector: {
        items: this.state.notes.map(
          ({ id, title }, index) => ({
            number: index + 1,
            id,
            title,
          })
        ),
      },
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  randomeNubmer (){
    let rand1 = Math.floor(Math.random() * 4);
  }

  dispatchAssistantAction (action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_note':
          return this.add_note(action);

        case 'done_note':
          return this.done_note(action);
        case 'delete_note':
          return this.delete_note(action);
        case 'odin':
            return this.odin(action);
        case 'dva':
            return this.dva(action); 
        case 'tree':
            return this.tree(action);       

        default:
          throw new Error();
      }
    }
  }

  add_note (action) {
    console.log('add_note', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id:        Math.random().toString(36).substring(7),
          title:     action.note,
          completed: false,
        },
      ],
    })
  }

  odin (action) {
    console.log('ОДИН');
    let rand1 = Math.floor(Math.random() * 3);
    if(rand1==1){
      console.log('Верно!');
      alert('Верно!')
    }
    else{
      console.log('Не угадал(');
      alert(`Не угадал! Ответ:${rand1}`)
    }
  }
  dva (action) {
    console.log('ДВА');
    let rand1 = Math.floor(Math.random() * 3);
    if(rand1==2){
      console.log('Верно!');
    }
    else{
      console.log('Не угадал(');
    }
    
  }
  
  tree (action) {
    console.log('ТРИ');
    let rand1 = Math.floor(Math.random() * 3)
    ;
    if(rand1==3){
      console.log('Верно!');
    }
    else{
      console.log('Не угадал(');
    }
  }

  done_note (action) {
    console.log('done_note', action);
    this.setState({
      notes: this.state.notes.map((note) =>
        (note.id === action.id)
        ? { ...note, completed: !note.completed }
        : note
      ),
    })
  }

  delete_note (action) {
    console.log('delete_note', action);
    this.setState({
      notes: this.state.notes.filter(({ id }) => id !== action.id),
    })
  }
  
  render() {
    
      
    console.log('render');
    return (
      // <TaskList
      //   items  = {this.state.notes}
      //   onAdd  = {(note) => { this.add_note({ type: "add_note", note }); }}
      //   onDone = {(note) => { this.done_note({ type: "done_note", id: note.id }) }}
      // />
    <div>
    <p >
      <strong>{}</strong> Используйте голосовые команды <strong>вверх, вниз, влево, вправо</strong> чтобы двигать блоки. Когда два блока с одинаковым значением соприкасаются, они{" "}
      <strong>объединяются в один!</strong>
    </p>
    </div>
      
    )
  }


}

