import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { history } from "./store";
import { ConnectedRouter } from "connected-react-router/immutable";
import { Provider } from "react-redux";
import Demo from "./components/Demo";
import Homework from "./components/Homework";
import StudentDetails from "./components/StudentDetails";
import AddStudent from "./components/AddStudent";
import NotificationProvider from "./components/NotificationProvider";

ReactDOM.render(
  <Provider store={store}>
    <NotificationProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/demo">
            <Demo />
          </Route>
          <Route path="/homework/:id">
            <StudentDetails />
          </Route>
          <Route path="/homework">
            <Homework />
          </Route>
          <Route path="/add_student">
            <AddStudent />
          </Route>

          <Route path="/">
            <App />
          </Route>
        </Switch>
      </ConnectedRouter>
    </NotificationProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
