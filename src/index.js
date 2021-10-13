import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './inc/Navbar';
import Videopage from './Videopage';



const router = 
<Router>
  <Navbar/>
  <Route path="/" exact component={App}></Route>    
  <Route path="/videopage/:id"  component={Videopage}></Route> 
</Router>

ReactDOM.render(router,document.getElementById('root'));


reportWebVitals();
