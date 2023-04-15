import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery'

class Login extends Component {
    state = { 
        error_message: "",
        username: "",
        password: ""
     } 
    handleClick = (e) => {
        e.preventDefault();
        if (this.state.username === ""){
            this.setState({error_message: "用户名不能为空"});
        }else if (this.state.password === ""){
            this.setState({error_message: "密码不能为空"});
        }else{
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/calculator/login/",
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: "json",
                success: resp => {
                    if (resp.result === "success"){
                         // 重定向网页
                        window.location.replace("/calculator");
                    }
                }
            });
        }


    }
    render() { 
        return (
            <Base>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input onChange={e => {this.setState({username: e.target.value})}} type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={e => {this.setState({password: e.target.value})}} type="password" className="form-control" id="password"/>
                            </div>
                            <div style={{height:"2rem", color:"red"}}>
                                {this.state.error_message}
                            </div>
                            <button onClick={this.handleClick} type="submit" className="btn btn-primary" style={{width:"100%"}}>Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
                
            </Base>
        );
    }
}
 
export default Login;