export default function Testimonial() {
    return <>
       <section className="testimonial padding-top padding-bottom-style2 bg-color">
        <div className="container">
          <div className="section-header d-md-flex align-items-center justify-content-between">
            <div className="section-header__content">
              <h2 className="mb-10">connect with <span>our customers </span></h2>
              <p className="mb-0">Success Stories from Our Community</p>
            </div>
            <div className="section-header__action">
              <div className="swiper-nav">
                <button className="swiper-nav__btn testimonial__slider-prev"><i className="fa-solid fa-angle-left"></i></button>
                <button className="swiper-nav__btn testimonial__slider-next active"><i
                    className="fa-solid fa-angle-right"></i></button>
              </div>
            </div>
          </div>
          <div className="testimonial__wrapper" >
            <div className="testimonial__slider swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial__item testimonial__item--style1">
                    <div className="testimonial__item-inner">
                      <div className="testimonial__item-content">
                        <p className="mb-0">
                          The Uni Bank platform has transformed my financial outlook. The support and resources provided are excellent, and the earning potential is impressive.
                        </p>
                        <div className="testimonial__footer">
                          <div className="testimonial__author">
                            
                            <div className="testimonial__author-designation">
                              <h6>John Dave</h6>
                            </div>
                          </div>
                          <div className="testimonial__quote">
                            <span><i className="fa-solid fa-quote-right"></i></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__item testimonial__item--style1">
                    <div className="testimonial__item-inner">
                      <div className="testimonial__item-content">
                        <p className="mb-0">
                          I appreciate the flexibility and community Uni Bank offers. It’s not just about earning money; it’s about growing together and achieving financial goals.
                        </p>
                        <div className="testimonial__footer">
                          <div className="testimonial__author">
                            <div className="testimonial__author-designation">
                              <h6>Sarah Mathews</h6>
                            </div>
                          </div>
                          <div className="testimonial__quote">
                            <span><i className="fa-solid fa-quote-right"></i></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section> 
    </>
}