import { createContext } from "react";
import createStore from "../store";

const storeContext = createContext(createStore());

export default storeContext;
