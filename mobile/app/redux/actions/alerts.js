import {v4 as uuid} from "uuid";

const setAlert = (msg, type, timeout = 5000) => {
  return (dispatch) => {
    const id = uuid();
    console.log(id)
    dispatch({
      type: "ALERT_SET",
      payload: {msg, type, id},
    });
    setTimeout(() => dispatch({type: "ALERT_REMOVE", payload: id}), timeout);
  };
};

export default setAlert;
