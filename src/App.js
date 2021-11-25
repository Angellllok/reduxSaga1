import React from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const store = useSelector(store => store);
    const dispatch = useDispatch();

    console.log((store));
  return (
    <div className="App">
redux
        <button
            onClick={() => dispatch({type: 'LOAD_DATA'})}
            >
            Click Me
        </button>
    </div>
  );
}

export default App;
