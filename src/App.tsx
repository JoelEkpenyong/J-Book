import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import TextEditor from "./components/TextEditor";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      {/* <CodeCell /> */}
      <TextEditor />
    </Provider>
  );
};

export default App;
