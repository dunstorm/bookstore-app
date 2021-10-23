import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";

import AddBook from "./pages/AddBook";
import EditPage from "./pages/EditPage";

import NotifyContainer from "./components/NotifyContainer";

import { Switch, Route } from "react-router-dom";

function App() {
  const history = useHistory();
  const [token, setToken] = useState("");
  const [messageData, setMessageData] = useState([]);

  const localToken = window.localStorage.getItem("jwt");
  if (localToken) {
    if (token === "") {
      setToken(localToken)
    }
  }

  const unsetToken = () => {
    setToken("");
    window.localStorage.removeItem("jwt");
    history.push("/");
  }

  useEffect(() => {
    console.log("JWT: " + token);
  }, [token])

  const notifyMessage = (severity, message) => {
    const newElement = {
      id: Math.random().toString(),
      severity: severity,
      message: message
    }
    setMessageData(messageData => [...messageData, newElement]);
  }

  return (
    <div className="min-h-screen p-8 bg-yellow-100">
      <Header token={token} unsetToken={unsetToken}></Header>
      <Navbar></Navbar>
      <NotifyContainer messageData={messageData} setMessageData={setMessageData}></NotifyContainer>
      <Switch>
        <Route path="/book/add">
          <AddBook token={token} notifyMessage={notifyMessage}></AddBook>
        </Route>
        <Route path="/book/:id/edit">
          <EditPage token={token} notifyMessage={notifyMessage}></EditPage>
        </Route>
        <Route path="/book/:id">
          <Detail token={token}></Detail>
        </Route>
        <Route path="/dashboard">
          <Dashboard token={token} notifyMessage={notifyMessage}></Dashboard>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/login">
          <Login token={token} setToken={setToken} notifyMessage={notifyMessage}></Login>
        </Route>
        <Route path="/">
          <Homepage token={token}></Homepage>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
