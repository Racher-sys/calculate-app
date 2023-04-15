import ACTION from "./action";

const evaluate = (state) => {
    // 解构函数
    let {currentOperand, lastOperand, operation}  = state;
    let last = parseFloat(lastOperand);
    let curr = parseFloat(currentOperand);
    let res = "";
    switch(operation){
        case '+':
            res = last + curr;
            break;
        case '-':
            res = last - curr;
            break;
        case '*':
            res = last * curr;
            break;
        case '/':
            res = last / curr;
            break;
    }
    return res.toString();
}


const reducer = (state = {
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false,
}, action) => {
    switch(action.type){
        case ACTION.ADD_DIGIT:
            if (state.overwrite){
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            };
        case ACTION.CHOOSE_OPERATION:
            if(state.currentOperand === "" && state.lastOperand === ""){
                return state;
            }
            if(state.lastOperand === ""){
                return{
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "",
                };
            }
            if(state.currentOperand === ""){
                return{
                    ...state,
                    operation: action.operation,
                };
            }
            // 如果上下都不为空，那么就需要先计算出当前的操作
            return {
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: ""
            };
        case ACTION.CLEAR: 
            return {
                ...state,
                currentOperand: "",
                lastOperand: "",
                operation: ""
            };
        case ACTION.DELETE_DIGIT:
            if (state.overwrite){
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            }
            if (state.currentOperand === ""){
                return state;
            }
            return {
                ...state,
                // 这边有一个细节问题，就是slice切片的内容是默认为string，因此在等号计算之后需要将数字转换成string
                currentOperand: state.currentOperand.slice(0,-1),
            };
        case ACTION.EVALUATE:
            if (state.lastOperand === "" || state.operation === "" || state.currentOperand === "") {
                return state;
            }
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                overwrite: true,
            };
        default: 
            return state;
    }
}

export default reducer;