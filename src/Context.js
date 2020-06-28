import React, {Component} from 'react';
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.payload)
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts
                    .map(contact => contact.id === action.payload.id
                        ? contact = action.payload
                        : contact)
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [
            // {id: 1, name: 'John Does', email: 'jdoe@gmail.com', phone: '522-555-555'},
            // {id: 2, name: 'Karen Does', email: 'karen@gmail.com', phone: '555-555-555'},
            // {id: 3, name: 'Lilu Does', email: 'ldoe@gmail.com', phone: '335-555-555'}
        ],
        dispatch: action => this.setState(state => reducer(state, action))
    }


    componentDidMount = async () => {
        const res = await Axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({contacts: res.data})
    };

    render = () =>
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>;
}

export const Consumer = Context.Consumer;