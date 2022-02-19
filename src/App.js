import PageRoutes from "./Routes/Routes";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Provider store={store}>
        <PageRoutes />
      </Provider>
    </div>
  );
}

export default App;
