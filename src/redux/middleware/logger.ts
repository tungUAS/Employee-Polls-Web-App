import { Dispatch,Store } from "redux";

const logger:any = (store: Store) => (next: Dispatch) => (action: {
    type: string;
}) => {
    console.group(action.type);
    console.log("The action: ", action);
    const returnValue = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return returnValue;
  };
  
  export default logger;