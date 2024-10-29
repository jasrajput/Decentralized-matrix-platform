export default function About() {
    return <>
        <section className="about about--style1 " id="about">
        <div className="container">
          <div className="about__wrapper">
            <div className="row gx-5  gy-4 gy-sm-0  align-items-center">
              <div className="col-lg-6">
                <div className="about__thumb pe-lg-5" >
                  <div className="about__thumb-inner">
                    <div className="about__thumb-image floating-content">
                      <img className="dark" src="/assets/images/about/1.png" alt="about-image" /> 
                      <div className="floating-content__top-left" >
                        <div className="floating-content__item">
                          <h3> <span className="purecounter" data-purecounter-start="0" data-purecounter-end="1">1</span>
                            Years
                          </h3>
                          <p>Experience</p>
                        </div>
                      </div>
                      <div className="floating-content__bottom-right" >
                        <div className="floating-content__item">
                          <h3> <span className="purecounter" data-purecounter-start="0" data-purecounter-end="1">1</span>K+
                          </h3>
                          <p>Satisfied Customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__content" >
                  <div className="about__content-inner">
                    <h2>Building <span>Financial Empowerment</span> Through Innovation</h2>

                    <p className="mb-0">
                      At Uni Bank, our mission is to transform financial empowerment through our unique matrix-based crowdfunding platform. We are dedicated to providing individuals with a straightforward and effective system to achieve their financial goals. Our approach combines the power of a 2x2 matrix and a gifting system to create opportunities for both personal and collective success.
                    </p>
                    <p className="mt-2">
                      Uni Bank operates on a 2x2 matrix system, which is designed to maximize earning potential through a clear and simple structure. Participants start at the top of the matrix, with two positions directly beneath them. As new participants join and positions are filled, the matrix cycles through, providing gifting payments to those who have completed their matrix.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
}