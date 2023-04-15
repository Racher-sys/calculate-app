import React, { Component } from 'react';
import Navbar from './navbar';
import { Route, Routes, Navigate} from 'react-router-dom';
import Home from './content/home';
import Calculate from './content/calculate';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notfound';
import $ from 'jquery';

class App extends Component {
    state = { 
        is_login: false,
        username: "hjn"
    }
    
    // 函数挂载之后会执行的步骤
    componentDidMount(){
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/get_status/",
            type: "get",
            success: resp => {
                console.log(resp);
                if (resp.result === "login"){
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    });
                }else {
                    this.setState({
                        is_login: true,
                    });
                }
            }
        });
    } 
    render() { 
        return (
            <React.Fragment>
                <Navbar is_login={this.state.is_login} username={this.state.username} />
                <div className='container'>
                    <Routes>
                        {/* 相当于把所有的链接都放在这个route里面 */}
                        <Route path='/calculator' element={<Home />}/>
                        <Route path='/calculator/home' element={<Home />}/>
                        <Route path='/calculator/calculate' element={this.state.is_login ? <Calculate /> : <Navigate  replace to="/calculator"/>}/>
                        <Route path='/calculator/login' element={this.state.is_login ? <Navigate  replace to="/calculator"/>:<Login />}/>
                        <Route path='/calculator/register' element={this.state.is_login ? <Navigate  replace to="/calculator"/>:<Register />}/>
                        <Route path='/calculator/404' element={<NotFound />}/>
                        <Route path='/calculator/*' element={<Navigate  replace to="/calculator/404"/>} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default App;

