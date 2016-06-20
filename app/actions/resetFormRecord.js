import {actions} from "react-redux-form";
import {formModel} from "utils/Util";

export function resetFormRecord(entity) {
  return (dispatch, getState) => {
    const state = getState();
    const record = state[entity]['record'];
    dispatch(actions.load(formModel(entity), record));
  }
}