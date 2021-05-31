import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Entryform from './pages/entryform';
import Suspect from './pages/suspect';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import {useState} from 'react'





function App() {

  const [show,setShow] = useState(false);

  const setVisible = ()=>{
    setShow(true);

  }

  return (
    <div className="App">
    <Navigation show={window.location.pathname === "/" ? false:true} ></Navigation>
      <Router>
        <Switch>
          <Route exact path="/"  component={ () => <Login visible={setVisible} /> }></Route>
          <Route path="/dashboard" component={() => <Dashboard on={show} />} ></Route>
          <Route path="/entryform" component={() => <Entryform on={show} />} ></Route>
          <Route path="/suspect" component={() => <Suspect on={show} />} ></Route>
          
         
        </Switch>
      </Router>


    </div>

    
  );
}

export default App;
