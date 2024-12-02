import styles from './header.scss';
import logo from '../../assest/images/logo.png';
import cart from '../../assest/images/cartheader.png';
import { useState, useEffect } from 'react'
import {getMethod} from '../../services/request'
import React, { createContext, useContext } from 'react';

export const HeaderContext = createContext();


var token = localStorage.getItem("token");
function Header (){
    var [numCart, setNumCart] = useState(0);

    useEffect(()=>{
        const getNumCart = async() =>{
            const response = await getMethod('/api/gio-hang/count');
            if(response.status > 300){
                setNumCart(0);
                return;
            }
            var numc = await response.text();
            setNumCart(numc);
        };
        if(token != null){
            getNumCart();
        }
    }, []);
    

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace('login')
    }

    var token = localStorage.getItem('token');
    var authen =  <div class="itemiconheader">
                    <div class="icon">
                        <a href=''><i className='fa fa-sign-in'></i></a>
                    </div>
                    <a href="login" class="txtheader">
                        <span class="text-bg">Đăng nhập</span>
                    </a>
                </div>
    if(token != null){
        authen = <div class="itemiconheader">
        <div class="icon">
            <a href=''><i className='fa fa-user'></i></a>
        </div>
        <span class="nav-item dropdown txtheader">
            <a class="nav-link txtheader" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="text-bg">Tài khoản</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="taikhoan">Tài khoản</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#" onClick={()=>logout()}>Đăng xuất</a></li>
            </ul>
        </span>
    </div>
    }
    return(
    <div id="menumain">
        <div class="containercustom container">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                  <a class="navbar-brand tagaheadersdt" href="/"><img src={logo} className='logoheader'/><span class="sdtheader">0815.208.208 | 0818.215.215</span></a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 listheadermenu">
                        <form class="searchheader" action="product">
                            <input class="form-control" type="search" name="search" placeholder="Tìm kiếm sản phẩm" aria-label="Search"/>
                        </form>
                    </ul>
                    <div class="d-flex">
                        <div class="itemiconheader">
                            <div class="icon">
                                <a href=''><i className='fa fa-newspaper'></i></a>
                            </div>
                            <a href="baiviet" class="txtheader">
                                <span class="text-bg">Về chúng tôi</span>
                            </a>
                        </div>
                        <div class="itemiconheader">
                            <div class="icon">
                                <a href=''><i className='fa fa-search'></i></a>
                            </div>
                            <a href="product" class="txtheader">
                                <span class="text-bg">Sản phẩm</span>
                            </a>
                        </div>
                        <div class="itemiconheader">
                            <div class="icon">
                                <a href=''><i className='fa fa-shopping-bag iconshopping'></i></a>
                                <span class="quantitycartheader" id="totalcartheader">{numCart}</span>
                            </div>
                            <a href="giohang" class="txtheader">
                                <span class="text-bg">Giỏ hàng</span>
                            </a>
                        </div>
                        {authen}
                    </div>
                  </div>
                </div>
            </nav>
        </div>
    </div>
    );

    
}

export default Header;