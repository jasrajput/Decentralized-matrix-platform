export default function Footer() {
    return <>
        <footer className="footer ">
        <div className="container">
          <div className="footer__wrapper">
            
            <div className="footer__bottom">
              <div className="footer__end">
                <div className="footer__end-copyright">
                  <p className=" mb-0">© 2024 All Rights Reserved</p>
                </div>
                <div>
                  <ul className="social">
                    <li className="social__item">
                      <a href="#" className="social__link social__link--style22"><i className="fab fa-facebook-f"></i></a>
                    </li>
                    <li className="social__item">
                      <a href="#" className="social__link social__link--style22 "><i className="fab fa-instagram"></i></a>
                    </li>
                    <li className="social__item">
                      <a href="#" className="social__link social__link--style22"><i className="fa-brands fa-linkedin-in"></i></a>
                    </li>
                    <li className="social__item">
                      <a href="#" className="social__link social__link--style22"><i className="fab fa-youtube"></i></a>
                    </li>
                    <li className="social__item">
                      <a href="#" className="social__link social__link--style22 "><i className="fab fa-twitter"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__shape">
          <span className="footer__shape-item footer__shape-item--1"><img src="/assets/images/footer/1.png"
              alt="shape icon" /></span>
          <span className="footer__shape-item footer__shape-item--2"> <span></span> </span>
        </div>
      </footer>

      <a href="#" className="scrollToTop scrollToTop--style1"><i className="fa-solid fa-arrow-up-from-bracket"></i></a>
    </>
}