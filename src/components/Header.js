import { useState } from 'react';
import Cookies from 'universal-cookie';

import errortrans from "../translate/error";

const Header = (props)=>{
    const cookies = new Cookies();
    const [convas,setConvas] = useState(0)
    const token=cookies.get('fiin-login');
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const logOff=()=>{
       cookies.remove('fiin-login',{ path: '/' });
       setTimeout(()=>(document.location.reload(),500))
    }
    return(
        <header className="main-header">
        <div className="container">
            <nav className="header-navbar">
                <a href="/" className="header-logo">
                    <img src="/img/logo-black.png" alt=""/></a>
                <button type="button" className="toggle-menu"
                    onClick={()=>setConvas(1)}><span></span></button>
                <div className={convas?"navbar-menu active-navbar-menu":"navbar-menu"}>
                    <span className="menu-close" onClick={()=>setConvas(0)}>
                        <span className="icon-close"></span></span>
                    <ul className="main-menu">
                        {token.level===2?<li><a href="/client/steps">Fill Data</a></li>:<></>}
                        {token.level>2?<li><a href="#">{errortrans.client[lang]}</a><span className="icon-arrow-bottom"></span>
                            <ul className="sub-menu">
                                <li><a href="/client/register">{errortrans.clientRegister[lang]}</a></li>
                                <li><a href="/client/list">{errortrans.clientList[lang]}</a></li>
                                {/*<li><a href="/upload">Carregar</a></li>*/}
                            </ul>
                        </li>:<></>}
                        {token.level>4?<li><a href="#">Consultores​</a><span className="icon-arrow-bottom"></span>
                            <ul className="sub-menu">
                                <li><a href="/consultant/register">Registo Consultores</a></li>
                                <li><a href="/consultant/list">Lista de Consultores</a></li>
                            </ul>
                        </li>:<></>}
                        {token.level>8?<li><a href="#">Agência</a><span className="icon-arrow-bottom"></span>
                            <ul className="sub-menu">
                                <li><a href="/agency/register">Registo Agência</a></li>
                                <li><a href="/agency/list">Lista de Agência</a></li>
                            </ul>
                        </li>:<></>}
                        <li><a href="#">Créditos​​​</a><span className="icon-arrow-bottom"></span>
                            <ul className="sub-menu">
                                <li><a href="/credit/list">Lista de Créditos</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="account-head ms-auto">
                    <button type="button" className="toggle-head-account">
                        <span className="icon-user"></span>
                        <span className="head-user-name">
                            {token&&token.name?token.name:token.username}
                        </span>
                    </button>
                    <ul>
                        <li><a href="/profile">Dados do utilizador</a></li>
                        <li><a href="/password">Password</a></li>
                        <li><a href="#" onClick={logOff}>Sair da Sessão</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    )
}
export default Header