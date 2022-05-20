import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return(
        // <div className='topnav'>
        //     <div className='logo'>
        //         LOTR S
        //     </div>
        //     <nav className='item'>
        //         <ul className='ul'>
        //             <li>
        //                 <Link to='/'>Home</Link>
        //             </li>
        //             <li>
        //                 <Link to='/admin'>Admin</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
        <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="/admin">Admin</a>
  {/* <a href="#contact">Contact</a>
  <a href="#about">About</a> */}
</div>
    )
}

export default Navbar;