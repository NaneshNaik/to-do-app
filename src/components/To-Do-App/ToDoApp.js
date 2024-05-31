import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useNotifications } from '../Notification/NotificationContext';
import './ToDoApp.css';
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const ToDoApp = () => {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("to-dos")) || []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const [descAddMode, setDescAddMode] = useState(false);
  const titleEditRef = useRef(null); // Ref for title input
  const descriptionEditRef = useRef(null); // Ref for description input

  const [showAll, setShowAll] = useState(true);

  const { addNotification } = useNotifications();

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(todo.map(({ editMode, ...rest }) => rest)));
  }, [todo]);

  useEffect(() => {
    if (editIndex !== null && titleEditRef.current) {
      titleEditRef.current.focus(); // Focus on title input
    }
  }, [editIndex]);


  const toDos = todo.map((todo, index) => {

    let todoItemClassNames = 'todo-item';

    if (todo.editMode) {
      todoItemClassNames += ' editMode';
    }

    if (todo.isCompleted) {
      todoItemClassNames += ' isCompleted';
    }

    if (todo.isCompleted && !showAll) {
      return null;
    }

    return (
      <li className={todoItemClassNames} key={index}>
        <div className="index" onClick={() => handleComplete(index)}>
          {
            todo.isCompleted ?
              <FaCircleXmark /> :
              <FaCheckCircle />
          }
        </div>
        <div className="todo-listItem">
          {
            todo.editMode ?
              <>
                <form className="todoEditForm" onSubmit={(e) => editSubmitHandler(e, index)}>
                  <div className="todo">
                    <div className="title">
                      <input ref={titleEditRef} name='titleEdit' defaultValue={todo.title} className='titleEdit' placeholder='title' type="text" required={true} />
                    </div>
                    <div className="description">
                      <input ref={descriptionEditRef} name='descriptionEdit' defaultValue={todo.description} className='descriptionEdit' placeholder='description' type="text" required={false} />
                    </div>
                  </div>
                  <div className="todo-button">
                    <button type='submit' aria-label="submit todo task edit" className='submit'><FaSave /></button>
                    <button className='delete' aria-label="delete todo task" onClick={(e) => deleteHandler(e, index)}><MdDelete /></button>
                  </div>
                </form>
              </> :
              <>
                <div className="todo">
                  <div className="title">
                    {todo.title}
                  </div>
                  {
                    todo.description ?
                      <div className="description">
                        {
                          todo.description
                        }
                      </div>
                      :
                      <></>
                  }
                </div>
                <div className="todo-button">
                  <button className='edit' aria-label="edit todo task" onClick={() => editHandler(index)}><FaEdit /></button>
                  <button className='delete' aria-label="delete todo task" onClick={(e) => deleteHandler(e, index)}><MdDelete /></button>
                </div>
              </>
          }
        </div>
      </li>
    )
  })
  const noToDos =
    <div className="noTodos">
      No To-Dos, Use input field above to add new To-Do
    </div>

  const submitHandler = (e) => {
    e.preventDefault();
    setTodo((prevTodo) => {
      return (
        [...prevTodo, {
          title: title,
          description: description,
          editMode: false
        }]
      )
    });
    setTitle('');
    setDescription('');
    addNotification(
      {
        text: "New Task Added",
        status: "success",
      }
    );
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const deleteHandler = (e, index) => {
    e.preventDefault();
    setTodo((prevTodo) => {
      const newTodo = [...prevTodo];
      newTodo.splice(index, 1);
      return (newTodo);
    });
    addNotification(
      {
        text: "Task Removed",
        status: "success",
        background: "#bf0000",
      }
    );
  }

  const editHandler = (index) => {
    const todoItem = todo[index];
    if (todoItem.isCompleted) {
      return;
    }
    setEditIndex(index);
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return { ...todo, editMode: true }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
  }

  const editSubmitHandler = (e, index) => {
    e.preventDefault();
    setEditIndex(null);
    const formData = new FormData(e.target);
    const titleEdit = formData.get('titleEdit');
    const descriptionEdit = formData.get('descriptionEdit') || "";
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return {
            ...todo,
            title: titleEdit,
            description: descriptionEdit,
            editMode: false
          }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
    addNotification(
      {
        text: "Task updated",
        status: "success",
        background: "green",
      }
    );
  }

  const handleComplete = (index) => {
    const todoItem = todo[index];
    if (todoItem.editMode) {
      return;
    }
    addNotification(
      {
        text: `${todoItem.isCompleted ? `Task marked as incomplete` : `Task completed`}`,
        status: "success",
        background: "purple",
      }
    );
    setTodo((prevTodo) => {
      const newTodo = prevTodo.map((todo, indx) => {
        if (index === indx) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          }
        }
        return todo;
      })
      // console.log("Hello");
      return (newTodo);
    });
  }

  const descAddModeHandler = () => {
    setDescAddMode(true);
  }

  const descRemoveModeHandler = () => {
    setDescAddMode(false);
  }

  const showAllHandler = (event) => {
    setShowAll(event.target.checked);
  }

  return (
    <>
      <div className="to-do-main">
        <div className="to-do">
          <form className={`todo-input ${descAddMode ? `descAddMode` : ``}`} onSubmit={(e) => submitHandler(e)}>
            <div className="input-field">
              <div className="title input-section">
                <input type="text" className={`titleInput ${title !== '' ? `valid` : ''}`} value={title} onChange={(e) => handleTitle(e)} required={true} />
                <span>Title</span>
                <i></i>
              </div>
              {
                descAddMode ?
                  <div className="description input-section">
                    <input type="text" className={`descInput ${description !== '' ? `valid` : ''}`} value={description} onChange={(e) => handleDescription(e)} required={false} />
                    <div className="removeDescButton" onClick={descRemoveModeHandler}><IoCloseCircle /></div>
                    <span>Description</span>
                    <i></i>
                  </div>
                  :
                  <>
                    <div className="addDescButton" onClick={descAddModeHandler}>
                      Add Description
                    </div>
                  </>
              }
            </div>
            <div className="button">
              <button type='submit' aria-label="submit">
                <FaPlusCircle size={25} />
              </button>
            </div>
          </form>
          <div className="line"></div>
          <div className={`todos ${todo.length !== 0 ? `haveTodos` : ``}`}>
            <div className="todos-text">
              <div className="text">My Todos</div>
              {
                todo.length !== 0 ?
                  <div className="checkbox">
                    <div className="checkbox-line"></div>
                    <div className="checkbox-text">
                      Show all
                    </div>
                    <div className="checkbox__1">
                      <input id="checkbox-1" type="checkbox" defaultChecked={true} onChange={(event) => showAllHandler(event)} />
                      <label htmlFor="checkbox-1">
                        <i className="material-icons">done</i>
                      </label>
                    </div>
                  </div>
                  :
                  <></>
              }
            </div>
            {toDos.length !== 0 ?
              <ul>
                {toDos}
              </ul>
              :
              noToDos}
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoApp