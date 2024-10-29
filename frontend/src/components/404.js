import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
    return <>
        <div className="error padding-top padding-bottom sec-bg-color2">
            <div className="container">
                <div className="error__wrapper">
                    <div className="error__inner" data-aos="s-up" data-aos-duration="800">
                    <div className="error__thumb text-center">
                        <img src="assets/images/others/error.png" alt="404 image" />
                    </div>
                    <div className="error__content text-center">
                        <h2><span>ooops!</span> page not found</h2>
                        <p>Oops! It looks like you're lost. The page you were looking for couldn't be found. Don't worry, it happens
                        to the best of us.</p>
                        <Link to="/dashboard" className="trk-btn trk-btn--border trk-btn--primary">Back to home</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}