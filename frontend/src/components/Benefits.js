export default function Benefits() {
    return <>
        <section className="feature feature--style1 padding-bottom padding-top bg-color" id="benefits">
        <div className="container">
          <div className="feature__wrapper">
            <div className="row g-5 align-items-center justify-content-between">
              <div className="col-md-6 col-lg-5">
                <div className="feature__content" >
                  <div className="feature__content-inner">
                    <div className="section-header">
                      <h2 className="mb-10 mt-minus-5"> <span>benefits </span>you get</h2>
                      <p className="mb-0">
                        Join Us and Prosper Together in a Supportive Community.
                      </p>
                    </div>

                    <div className="feature__nav">
                      <div className="nav nav--feature flex-column nav-pills" id="feat-pills-tab" role="tablist"
                        aria-orientation="vertical">
                        <div className="nav-link active" id="feat-pills-one-tab" data-bs-toggle="pill"
                          data-bs-target="#feat-pills-one" role="tab" aria-controls="feat-pills-one" aria-selected="true">
                          <div className="feature__item">
                            <div className="feature__item-inner">
                              <div className="feature__item-content">
                                <h6><strong>Direct Financial Gains</strong></h6>
                                <p>Earn substantial rewards through our efficient 2x2 matrix system.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nav-link" id="feat-pills-two-tab" data-bs-toggle="pill" data-bs-target="#feat-pills-two"
                          role="tab" aria-controls="feat-pills-two" aria-selected="false">
                          <div className="feature__item">
                            <div className="feature__item-inner">
                              <div className="feature__item-content">
                                <h6><strong>Community Support</strong></h6>
                                <p>Benefit from a network of like-minded individuals dedicated to mutual success.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="nav-link" id="feat-pills-three-tab" data-bs-toggle="pill"
                          data-bs-target="#feat-pills-three" role="tab" aria-controls="feat-pills-three"
                          aria-selected="false">
                          <div className="feature__item">
                            <div className="feature__item-inner">
                              <div className="feature__item-content">
                                <h6><strong>Flexible Participation</strong></h6>
                                <p>Enjoy a straightforward and accessible crowdfunding model with clear earning paths.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nav-link" id="feat-pills-four-tab" data-bs-toggle="pill"
                          data-bs-target="#feat-pills-four" role="tab" aria-controls="feat-pills-four"
                          aria-selected="false">
                          <div className="feature__item">
                            <div className="feature__item-inner">
                              <div className="feature__item-content">
                                <h6><strong>Ongoing Resources</strong></h6>
                                <p>Access training and support to maximize your potential and achieve financial goals.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="feature__thumb pt-5 pt-md-0" >
                  <div className="feature__thumb-inner">
                    <div className="tab-content" id="feat-pills-tabContent">
                      <div className="tab-pane fade show active" id="feat-pills-one" role="tabpanel"
                        aria-labelledby="feat-pills-one-tab" >
                        <div className="feature__image floating-content">
                          <img src="/assets/images/feature/1.png" alt="Feature image" />
                        </div>
                      </div>
                      <div className="tab-pane fade" id="feat-pills-two" role="tabpanel" aria-labelledby="feat-pills-two-tab"
                        >
                        <div className="feature__image floating-content">
                          <img src="/assets/images/feature/2.png" alt="Feature image" />
                        </div>
                      </div>
                      <div className="tab-pane fade" id="feat-pills-three" role="tabpanel"
                        aria-labelledby="feat-pills-three-tab" >
                        <div className="feature__image floating-content">
                          <img src="/assets/images/feature/1.png" alt="Feature image" />
                        </div>
                      </div>
                      <div className="tab-pane fade" id="feat-pills-four" role="tabpanel" aria-labelledby="feat-pills-four-tab"
                        >
                        <div className="feature__image floating-content">
                          <img src="/assets/images/feature/2.png" alt="Feature image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feature__shape">
          <span className="feature__shape-item feature__shape-item--1"><img src="/assets/images/feature/shape/1.png"
              alt="shape-icon" /></span>
          <span className="feature__shape-item feature__shape-item--2"> <span></span> </span>
        </div>
      </section>
    </>
}