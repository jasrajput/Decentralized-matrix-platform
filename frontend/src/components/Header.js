import Connect from './Connect';
export default function Header() {
    return <>
        <header className="header-section header-section--style2">
        <div className="header-bottom">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo">
                <a href="index">
                  <img className="light" src="/logo.png" style={{height: '100px'}} alt="" />
                </a>
              </div>
              <div className="menu-area">
                <ul className="menu menu--style1">
                  <li><a href="#heroSection">Home </a></li>
                  <li><a href="#dashboard">Dashboard </a></li>
                  <li><a href="#about">About </a></li>
                  <li><a href="#benefits">Benefits </a></li>
                  <li><a href="#pricing">Pricing </a></li>
                  <li><a href="#faq">FAQ </a></li>
                </ul>

              </div>
              <div className="header-action">
                <div className="menu-area">
                  <div className="header-btn">
                      <span><Connect /></span>
                  </div>

                  <div className="header-bar d-lg-none header-bar--style1">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
}