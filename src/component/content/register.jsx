import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery';

class Register extends Component {
    state = { 
        error_message: "",
        username: "",
        password: "",
        password_confirmed: "",
     } 
    handleClick = (e) => {
        e.preventDefault();
        if (this.state.username === ""){
            this.setState({error_message: "用户名不能为空"});
        }else if (this.state.password === ""){
            this.setState({error_message: "密码不能为空"});
        }else if (this.state.password_confirmed === ""){
            this.setState({error_message: "确认密码不能为空"});
        }else if (this.state.password !== this.state.password_confirmed){
            this.setState({error_message: "前后两次密码不一致"});
        }else{
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/calculator/register/",
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    // 注意这边的参数需要跟后端的参数一致。
                    password_confirm: this.state.password_confirmed,
                },
                dataType: "json",
                success: resp => {
                    console.log(resp)
                    if (resp.result === "success"){
                         // 重定向网页
                        window.location.replace("/calculator");
                    }else{
                        this.setState({error_message: resp.result})
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
                            <div className="mb-3">
                                <label htmlFor="password_confirmed" className="form-label">Password Confirm</label>
                                <input onChange={e => {this.setState({password_confirmed: e.target.value})}} type="password" className="form-control" id="password_confirmed"/>
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
 
export default Register;