import React, { Component } from 'react';
import ACTION from '../../redux/action';
import { connect } from 'react-redux';


class DigitButton extends Component {
    state = {  }
    render() { 
        return (<button className='button-radus' onClick={() => this.props.add_digit(this.props.digit)}>
            {this.props.digit}
        </button>);
    }
}


// mapDispatchToProps是一个对象
const mapDispatchToProps = {
    // add_digit这个可以类组件自己调用的
    add_digit: (digit) => {
        return {
            type: ACTION.ADD_DIGIT,
            digit: digit,
        }
    }
}
 
export default connect(null, mapDispatchToProps)(DigitButton);