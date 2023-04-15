import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTION from '../../redux/action';

class OperationButton extends Component {
    state = {  } 
    render() { 
        return (
            <button className='button-radus' onClick={() => this.props.choose_operation(this.props.operation)}>
                {this.props.operation}
            </button>
        );
    }
}

const mapDispatchToProps = {
    choose_operation: (operation) => {
        return {
            type: ACTION.CHOOSE_OPERATION,
            operation: operation,
        }
    }
}

export default connect(null, mapDispatchToProps)(OperationButton);