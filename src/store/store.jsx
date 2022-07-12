import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
const { createStore } = require("redux");



export const store = createStore(composeWithDevTools());