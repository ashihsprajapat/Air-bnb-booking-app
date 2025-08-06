
import  React from 'react';

import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
    
            <nav className="navbar navbar-expand-lg navbar-expand-md bg-body-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/body">air bnb your Home</Link>
                            <Link className="nav-link" to="#">Login</Link>
                            <Link className="nav-link " to-disabled="true">Disabled</Link>
                        </div>
                    </div>
                </div>
            </nav>

           
        </>

    );
}

export default NavBar;