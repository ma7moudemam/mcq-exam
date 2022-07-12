import React from 'react'
import classes from './Header.module.css'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className={`bg-danger ${classes.header} text-light`}>

        <div className={classes.logo}>
        <h1>فاينل </h1>
        <i className="fas fa-graduation-cap"></i>
        </div>
        <div>
            <ul>
                <Link to="/register"><li>تسجيل</li></Link>
                <Link to="/login"><li>دخول</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Header