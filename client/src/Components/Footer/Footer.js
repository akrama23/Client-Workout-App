import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className="main-footer">
            <p className="col-sm">
                &copy;{new Date().getFullYear()} WEIGHTROOM INC | All Rights Reserved | Term Of Service | Privacy | 
            <a href="https://github.com/akrama23"> Akram Alam</a>
            </p>
        </div>
    )
}

export default Footer;
