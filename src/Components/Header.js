import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div>

            <div className='nav-bar'>
                <ul>
                    <h4><li><Link to="/">Home</Link></li></h4>
                    <h4><li><Link to="/Find">Find Question</Link></li></h4>
                </ul>
            </div>

        </div>
    )
}
export default Header;