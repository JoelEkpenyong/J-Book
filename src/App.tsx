import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import CellList from "./components/CellList";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

export default App;
