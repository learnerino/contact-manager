import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Consumer} from "../../Context";
import Axios from "axios";
import {Link} from "react-router-dom";

// import './Contact.css'

class Contact extends Component {
    state = {
        showContactInfo: false
    };
    // static propTypes = {
    //     name: PropTypes.string.isRequired,
    //     email: PropTypes.string.isRequired,
    //     phone: PropTypes.string.isRequired
    // }
    onShowClick = () => {
        this.setState({showContactInfo: !this.state.showContactInfo});
    }

    onDeleteClick = async (id, dispatch) => {
        try {
            await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        } finally {
            dispatch({
                type: 'DELETE_CONTACT',
                payload: id
            });
        }
    };


    render = () => {
        const {id, phone, email, name} = this.props.contact;
        const {showContactInfo} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className={'card card-body mb-3'}>
                            <h4>{name}
                                <i onClick={this.onShowClick}
                                   className="fa fa-sort-down"
                                   style={{cursor: 'pointer'}}/>
                                <i className="fa fa-times"
                                   style={{
                                       cursor: 'pointer',
                                       float: 'right',
                                       color: 'red'
                                   }}
                                   onClick={() => this.onDeleteClick(id, dispatch)}/>
                            <Link to={`contact/edit/${id}`}>
                                <i className="fa fa-pencil"
                                style={{cursor:'pointer',
                                float: 'right',
                                color:'black',
                                marginRight: '1rem'}}/>
                            </Link>
                            </h4>
                            {showContactInfo ?
                                <ul className={"list-group"}>
                                    <li className={"list-group-item"}>Email: {email}</li>
                                    <li className={"list-group-item"}>Phone: {phone}</li>
                                </ul>
                                : null}
                        </div>)
                }}

            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default Contact;