export default function HeroSection() {
    return <>
        <section className="banner banner--style1" id='heroSection'>
        <div className="banner__bg">
          <div className="banner__bg-element">
            <img src="/assets/images/banner/home1/bg-dark.png" alt="section-bg-element" className="dark d-none d-lg-block" />
            <span className="bg-color d-lg-none"></span>
          </div>
        </div>
        <div className="container">
          <div className="banner__wrapper">
            <div className="row gy-5 gx-4">
              <div className="col-lg-6 col-md-7">
                <div className="banner__content" >
                  <div className="banner__content-coin">
                    <img src="/assets/images/banner/home1/3.png" alt="coin icon" />
                  </div>
                  <h1 className="banner__content-heading">Empowering Financial Unity
                    with <span>Uni Bank </span></h1> 
                  <p className="banner__content-moto">At Uni Bank, we offer a unique opportunity to achieve financial independence through our innovative crowdfunding system.


                  </p>
                  <div className="banner__btn-group btn-group">
                    <a href="#invest" className="trk-btn trk-btn--primary trk-btn--arrow">Invest now
                      <span><i className="fa-solid fa-arrow-down"></i></span> </a>

                      <a href="#"
                        className="trk-btn trk-btn--outline22" data-fslightbox>
                        <span className="style1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1397_814)">
                              <path
                                d="M10.5547 7.03647C9.89015 6.59343 9 7.06982 9 7.86852V16.1315C9 16.9302 9.89015 17.4066 10.5547 16.9635L16.7519 12.8321C17.3457 12.4362 17.3457 11.5638 16.7519 11.1679L10.5547 7.03647Z"
                                stroke="#A4FD5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <rect x="-0.75" y="0.75" width="22.5" height="22.5" rx="11.25" transform="matrix(-1 0 0 1 22.5 0)"
                              stroke="#A4FD5" strokeWidth="1.5" />
                            <defs>
                              <clipPath id="clip0_1397_814">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span> 
                        Watch Video
                      </a>

                  </div>
                  <div className="banner__content-social">
                    <p>Follow Us</p>
                    <ul className="social">
                      <li className="social__item">
                        <a href="#" className="social__link social__link--style1 active"><i className="fab fa-facebook-f"></i></a>
                      </li>
                      <li className="social__item">
                        <a href="#" className="social__link social__link--style1"><i className="fab fa-linkedin-in"></i></a>
                      </li>
                      <li className="social__item">
                        <a href="#" className="social__link social__link--style1"><i className="fab fa-instagram"></i></a>
                      </li>
                      <li className="social__item">
                        <a href="#" className="social__link social__link--style1"><i className="fab fa-youtube"></i></a>
                      </li>
                      <li className="social__item">
                        <a href="signin.html" className="social__link social__link--style1"><i className="fab fa-twitter"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="banner__thumb" >
                  <img src="/assets/images/banner/home1/1.png" alt="banner-thumb" className="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner__shape">
          <span className="banner__shape-item banner__shape-item--1"><img src="/assets/images/banner/home1/4.png"
              alt="shape icon" /></span>
        </div>

      </section>
    </>
}