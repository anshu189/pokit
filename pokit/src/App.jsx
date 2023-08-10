import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NewJoin from "./component/Join/NewJoin.js";
import NewChat from "./component/Chat/NewChat.js";
import "./index.css";

function App() {

  return (
      <div className="App">
          <Router>
            <Routes>
              <Route exact path='/' element={<NewJoin/>}></Route>  
              <Route exact path="/chat" element={<NewChat/>}/>
            </Routes>
          </Router>
        
      </div>
  );
}

export default App;
