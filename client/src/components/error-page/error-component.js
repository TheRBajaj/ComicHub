import React from 'react';
import { Link }  from 'react-router-dom';


const ErrorPage = () => {
    return(
        <div>
            404 Page not found
            <div>
                <Link to='/' style={{ textDecoration: "none" }}>
                    click here to go back to home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage