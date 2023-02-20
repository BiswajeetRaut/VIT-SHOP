import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { NavLink, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
const Header = () => {
    const [{basket,user},dispatch]= useStateValue();
    console.log(user);
    var to="/";
    // const history = useHistory();
    const dispatchUser =()=>{
        dispatch({
            type:'SIGN_OUT',
            user:"user",
            basket: [],
        })
    }
  return (
    <div className='header'>
         <Link to="/">
        <img className='header__logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
         </Link>
        <div className="header__search">
            <input type="text" name="" id="" className='header__searchInput' />
            <SearchIcon className='header__searchIcon'></SearchIcon>
        </div>
        <div className="header__nav">
            <div className="header__option">
                <span className='header__optionLineOne'>Hello</span>
                <Link to="/login" onClick={dispatchUser}>
                <span className='header__optionLineTwo'>{user=="user" ? "SignIn" : "SignOut"}</span>
                </Link>
            </div>
            <div className="header__option">
            <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
            </div>
            <div className="header__option">
            <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>{user=="user" ?user : user.userinfo.email}</span>
            </div>
            <Link to="/checkout">
            <div className="header__optionBasket">
                <ShoppingBasketIcon></ShoppingBasketIcon>
                <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
            </div>
            </Link>
        </div>
    </div>
)
}

export default Header