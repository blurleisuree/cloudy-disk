import classes from "./App.module.css";

import { BrowserRouter } from "react-router";
import useAuthCheck from "../shared/hooks/useAuthCheck.js";

import Message from "../shared/components/Message/Message.jsx";
import Loader from "../shared/components/UI/Loader/Loader.jsx";
import Modal from "../shared/components/Modal/Modal.jsx";
import Router from "./components/Router/Router.jsx";

function App() {
  const { loading } = useAuthCheck();

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className={classes.App}>
      <Message />
      <Modal />
      <Router />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
