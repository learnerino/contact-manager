import React from 'react';
import './App.css';
import Header from "./components/layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Contacts from "./components/contacts/Contacts";
import {Provider} from "./Context";
import AddContact from "./components/contacts/AddContact";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import EditContact from "./components/contacts/EditContact";

class App extends React.Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div className="App">
                        <Header branding={"Contact Manager"}/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Contacts}/>
                                <Route exact path="/contact/add" component={AddContact}/>
                                <Route exact path="/contact/edit/:id" component={EditContact}/>
                                <Route exact path="/about" component={About}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
