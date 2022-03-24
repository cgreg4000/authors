import './App.css';
import AllAuthors from './components/AllAuthors';
import AddAuthor from './components/AddAuthor';
import EditAuthor from './components/EditAuthor';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Switch>
          <Route exact path='/'>
            <AllAuthors></AllAuthors>
          </Route>
          <Route exact path='/new'>
            <AddAuthor></AddAuthor>
          </Route>
          <Route exact path='/edit/:_id'>
            <EditAuthor></EditAuthor>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
