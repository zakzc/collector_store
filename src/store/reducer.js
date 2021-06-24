import { combineReducers } from "redux";
import context from "./context";
import medias from "./medias";
import users from "./users";

export default combineReducers({ medias, users, context });
