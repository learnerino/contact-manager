import React, {Component} from 'react';
import {Consumer} from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = response.data;

        const {phone, email, name} = contact;
        this.setState({
            name,
            email,
            phone
        })
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;
        const errors = {};
        //checkForErrors
        if (name === '') errors.name = 'Name is required';
        if (phone === '') errors.phone = 'Phone is required';
        if (email === '') errors.email = 'Email is required';

        if (name === '' || phone === '' || email === '') {
            this.setState({errors});
            return;
        }

        const {id} = this.props.match.params;

        const updateContact = {
            name,
            email,
            phone
        }
        const res = await Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,
            updateContact);

        dispatch({
            type:'UPDATE_CONTACT',
            payload: res.data
        })

            this.setState({
                name: '',
                email: '',
                phone: '',
                errors: {}
            });

        this.props.history.push('/');
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render = () => {
        const {name, email, phone, errors} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (<div>
                        <div className="card mb-3">
                            <div className="card-header"> Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup label={"Name"}
                                                    name={"name"}
                                                    value={name}
                                                    onChange={this.onChange}
                                                    placeholder={"Enter Name..."}
                                                    error={errors.name}/>
                                    <TextInputGroup label={"Email"}
                                                    name={"email"}
                                                    value={email}
                                                    onChange={this.onChange}
                                                    placeholder={"Enter Email..."}
                                                    type={"email"}
                                                    error={errors.email}/>
                                    <TextInputGroup label={"Phone"}
                                                    name={"phone"}
                                                    value={phone}
                                                    onChange={this.onChange}
                                                    placeholder={"Enter Phone..."}
                                                    error={errors.phone}/>
                                    <input type="submit" value="Update Contact"
                                           className={"btn btn-block btn-light"}/>
                                </form>
                            </div>
                        </div>
                    </div>)
                }}
            </Consumer>
        );
    };
}

export default EditContact;