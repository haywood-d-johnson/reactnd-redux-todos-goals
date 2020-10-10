import API from "goals-todos-api";

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

export function handleAddGoal(name, cb) {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal));
        cb();
      })
      .catch(() => {
        alert("There was an error. Try again");
      });
  };
}

export function handleDeleteGoal(goal) {
  return (dispatch) => {
    //optimistic updates... remove to todo item and then talk to the database so there's no delay for the user
    dispatch(removeGoalAction(goal.id));

    API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoalAction(goal));
      alert("An error occurred. Please try again");
    });
  };
}
