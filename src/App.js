import "./assets/styles/App.css";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { routes } from "./routes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
const { store, persistor } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route {...route} />
            ))}
            {/* <Navigate to="/" /> */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
