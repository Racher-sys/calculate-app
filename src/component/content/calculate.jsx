import React, { Component } from 'react';
import Base from './base';
import { connect } from 'react-redux';
import DigitButton from './calculator/digitButton';
import OperationButton from './calculator/operationButton';
import ACTION from '../redux/action';

class Calculate extends Component {
    state = { 
        formater: Intl.NumberFormat('en-us'),
    } 

    formate = number => {
        if (number === "") return "";
        const [integer, decimal] = number.split('.');
        if (decimal === undefined) {
            return this.state.formater.format(number);
        }
        else{
            return `${this.state.formater.format(integer)}.${decimal}`;
        }
    }
    render() { 
        return (
            <Base>
               <div className="calculator">
                <div className="output">
                    <div className="last-output">{this.formate(this.props.lastOperand)}{this.props.operation}</div>
                    <div className="current-output">{this.formate(this.props.currentOperand)}</div>
                </div>
                <button className='button-ac' onClick={this.props.clear}>AC</button>
                <button onClick={this.props.delete}>Del</button>
                <OperationButton operation={"/"} />

                <DigitButton digit={"7"} />
                <DigitButton digit={"8"} />
                <DigitButton digit={"9"} />
                <OperationButton operation={"*"} />

                <DigitButton digit={"4"} />
                <DigitButton digit={"5"} />
                <DigitButton digit={"6"} />
                <OperationButton operation={"-"} />

                <DigitButton digit={"1"} />
                <DigitButton digit={"2"} />
                <DigitButton digit={"3"} />
                <OperationButton operation={"+"} />

                <DigitButton style={{borderBottomLeftRadius: "20px"}} digit={"0"} />
                <DigitButton digit={"."} />
                <button className='button-equal' onClick={this.props.evaluate}>=</button>
               </div>
            </Base>
        );
    }
}

// 访问redux中的state
const mapStateToProps = (state, props) => {
    return {
        currentOperand: state.currentOperand,
        lastOperand: state.lastOperand,
        operation: state.operation,
    }

}

// 更新redux中的state

const mapDispatchToProps = {
    clear: () => {
        return {
            type: ACTION.CLEAR,
        }
    },
    delete: (digit) => {
        return {
            type: ACTION.DELETE_DIGIT,
            digit: digit,
        }
    },
    evaluate: () => {
        return {
            type: ACTION.EVALUATE,
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Calculate);