import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import users from "./users";

export default combineReducers({ entities: entitiesReducer, users });
