import { ActionType, State } from "./types";

export const initialState: State = {
  data: null,
  view: "loading",
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "loadTaskList": {
      const newState: State = {
        ...state,
        data: action.payload,
        view: "list",
      };
      return newState;
    }

    case "editTask": {
      return state;
    }

    case "deleteTask": {
      return state;
    }

    case "saveTask": {
      return state;
    }
    case "checkDone": {
      return state;
    }

    default:
      return state;
  }
};
