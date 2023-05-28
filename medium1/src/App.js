import "./App.css";
import RenderComponent from "./RenderComponent";

const obj = {
  text: "this is a sample string",
  samppleobj: {
    string1: "Just taste the orange",
    obj1: {
      string2: "Just taste the orange"
    },
    obj2: {
      string3: "Just taste the orange",
      obj3: {
        string4: "Just taste the orange"
      }
    }
  }
};

function App() {
  return (
    <div className='App'>
      <RenderComponent obj={obj} />
    </div>
  );
}

export default App;
