import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';


class Navbar extends Component {
    state = {  } 

    handleClick = () => {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/logout/",
            type: "get",
            success: resp => {
                console.log(resp);
                if (resp.result === "success"){
                    window.location.replace("/calculator");
                }
            }
        });
    }

    render_Calulator = () => {
        if (this.props.is_login){
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/calculator/calculate">Calculate</Link>
                </li>
            )
        }else{
            return "";
        }
    }

    render_user = () => {
        if (this.props.is_login){
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" style={{cursor: "pointer"}}>{this.props.username}</a>
                    </li>
                    <li className="nav-item">
                    <a onClick={this.handleClick} className="nav-link" style={{cursor: "pointer"}}>Logout</a>
                    </li>
                </ul >
            )
        }else{
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" to="/calculator/login">Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/calculator/register">Register</Link>
                    </li>
                </ul >
            )
        }
    }
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <Link className="navbar-brand" to="/calculator">Web</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className="nav-link active" to="/calculator/home">Home</Link>
                            </li>
                            {this.render_Calulator()}
                        </ul >
                        {this.render_user()}
                    </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default Navbar;