export default function Cta() {
    return <>
        <section className="cta padding-top padding-bottom  bg-color">
        <div className="container">
          <div className="cta__wrapper">
            <div className="cta__newsletter justify-content-center">
              <div className="cta__newsletter-inner" >
                <div className="cta__thumb">
                  <img src="/assets/images/cta/3.png" alt="cta-thumb" />
                </div>
                <div className="cta__subscribe">
                  <h2> <span>Join Us Today </span><br/>Become Part of Our Growing Community</h2> 
                  <p>
                    Ready to take control of your financial future? Join Uni Bank today and start your journey towards financial independence. Our community is here to support you every step of the way.
                  </p>
                </div>
              </div>
            </div>
            <div className="cta__shape">
              <span className="cta__shape-item cta__shape-item--1"><img src="/assets/images/cta/2.png" alt="shape icon"/></span>
              <span className="cta__shape-item cta__shape-item--2"><img src="/assets/images/cta/4.png" alt="shape icon"/></span>
              <span className="cta__shape-item cta__shape-item--3"><img src="/assets/images/cta/5.png" alt="shape icon"/></span>
            </div>
          </div>
        </div>
      </section>
    </>
}