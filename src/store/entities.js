import { combineReducers } from "redux";
import audio from "./audio";
import books from "./books";
// import users from "./users";

export default combineReducers({ books, audio });
