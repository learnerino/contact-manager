import React, {Component} from 'react';

class Test extends Component {

    componentDidMount = () => {
        console.log('componentDidMount');
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate");
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
    }

    render() {
        return (
            <div>
                <h1>Test Component</h1>
            </div>
        );
    }
}

export default Test;