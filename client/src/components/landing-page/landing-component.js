import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Video from '../../videos/comic_moving_text_box.mov';
import Logo from '../../assets/logo.png';
import '../../styles/landing-page.css';


const LandingPage = () =>{
    return(
        <div className="landing-page-body">
            <header className="v-header container">
                <div className="video-container">
                    <video src={Video} type="video/mov" autoPlay loop muted></video>
                </div>
                <div className="header-overlay"></div>
                <div className="header-content">
                    <img src={Logo} alt={"ComicHub-Logo"}></img>
                    <p>Welcome to ComicHub👋 Made with ❤️ by Rahul</p>
                    <Link to='/1' style={{ textDecoration: "none" }}>
                        <Button variant="danger" size="lg" block>
                            Explore ComicHub Collection
                        </Button>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default LandingPage