import React, { useReducer } from "react";
import "./App.less";

import { useAppContext } from "./AppProvider";

import { useRef } from "react";

import { ToDoList } from "./feature/ToDoList";
import { initialState, reducer } from "./business/reducer";
import { Preloader } from "./component/Preloader";
import { createPortal } from "react-dom";
import { Task } from "./component/Task";
import { useFireBase } from "./effect";

const BUTTON_TEXT = "Add Task";

export function Main() {
  const { state, dispatch } = useAppContext();

  const getView = () => {
    switch (state.view) {
      case "loading": {
        return <Preloader />;
      }
      case "list": {
        return (
          <div className="todo-list" id="test">
            <div className="app-logo">TODO</div>
            {/*     <input ref={textInput} type="text" defaultValue="" /> */}
            <button className="app-create-task" onClick={(e) => createTask(e)}>
              {BUTTON_TEXT}
            </button>
            <ToDoList list={state.data} />
          </div>
        );
      }
      case "card": {
        const parentForCard = document.getElementById("test") as HTMLElement;
        const cardPortal = createPortal(<Task />, parentForCard);
        /*      return cardPortal;
         */
        return (
          <div className="todo-list">
            <div className="app-logo">TODO</div>
            {/*     <input ref={textInput} type="text" defaultValue="" /> */}
            <button className="app-create-task" onClick={(e) => createTask(e)}>
              {BUTTON_TEXT}
            </button>
            {cardPortal}
            <ToDoList list={state.data} />
          </div>
        );
      }
    }
  };

  const createTask = (e: any) => {
    e.stopPropagation();
    console.log("открыть модалку");
    dispatch({ type: "changeView" });
  };

  /* Закрыть модалку */
  // const closeModal = (e: MouseEvent) => {
  //   console.log("закрыть модалку");
  //   const container = document.getElementById("taskContainer");
  //   console.log("container", container, e?.target);
  //   if (e?.target !== container && state.view === "card") {
  //     dispatch({ type: "changeView" });
  //   }
  // };

  // document.addEventListener("click", closeModal);

  // useEffect(() => {
  //   if (state.view === "card") {
  //     console.log("подписка");
  //     document.addEventListener("click", closeModal);
  //     /*     return document.removeEventListener("click", closeModal); */
  //   }
  // }, [state.view]);

  useFireBase();

  return (
    <div
      className={
        state.view == "card"
          ? "app-container app-container-blur"
          : " app-container "
      }
    >
      {getView()}
    </div>
  );
}
