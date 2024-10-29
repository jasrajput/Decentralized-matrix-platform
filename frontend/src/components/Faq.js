export default function Faq() {
    return <>
        <section className="faq padding-top padding-bottom of-hidden" id="faq">
        <div className="section-header section-header--max65">
          <h2 className="mb-10 mt-minus-5"><span>Frequently</span> Asked questions</h2>
          <p>Hey there! Got questions? We've got answers. Check out our FAQ page for all the deets. Still not satisfied? Hit
            us up.</p>
        </div>
        <div className="container">
          <div className="faq__wrapper">
            <div className="row g-5 align-items-center justify-content-between">
              <div className="col-lg-6">
                <div className="accordion accordion--style1" id="faqAccordion1" >
                  <div className="row">
                    <div className="col-12">
                      <div className="accordion__item accordion-item">
                        <div className="accordion__header accordion-header" id="faq1">
                          <button className="accordion__button accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faqBody1" aria-expanded="false" aria-controls="faqBody1">
                            <span className="accordion__button-content">What is Uni Bank?</span>
                          </button>
                        </div>
                        <div id="faqBody1" className="accordion-collapse collapse show" aria-labelledby="faq1"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15">
                              Uni Bank is a 2x2 matrix-based crowdfunding platform built on Binance Smart Chain (BSC), designed to facilitate secure and efficient fund transfers and financial growth.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="accordion__item accordion-item">
                        <div className="accordion__header accordion-header" id="faq2">
                          <button className="accordion-button accordion__button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#faqBody2" aria-expanded="true"
                            aria-controls="faqBody2">
                            <span className=" accordion__button-content">How does the 2x2 matrix system work?</span>
                          </button>
                        </div>
                        <div id="faqBody2" className="accordion-collapse collapse" aria-labelledby="faq2"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15">
                              The 2x2 matrix system places you at the top of a matrix with two positions directly below you. Each of these positions splits into two more, creating a total of six positions. As new participants join and positions are filled, the matrix cycles, and you receive gifting payments.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="accordion__item accordion-item">
                        <div className="accordion__header accordion-header" id="faq3">
                          <button className="accordion-button accordion__button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#faqBody3" aria-expanded="false"
                            aria-controls="faqBody3">
                            <span className="accordion__button-content">How can I join Uni Bank?</span>
                          </button>
                        </div>
                        <div id="faqBody3" className="accordion-collapse collapse" aria-labelledby="faq3"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15"> 
                              Joining Uni Bank is free, but participation in the crowdfunding opportunity requires a minimum gifting payment. The total cost to fully participate is $7750 and the minimum cost is $20 distributed across various matrix tiers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="accordion__item accordion-item">
                        <div className="accordion__header accordion-header" id="faq4">
                          <button className="accordion-button accordion__button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#faqBody4" aria-expanded="false"
                            aria-controls="faqBody4">
                            <span className="accordion__button-content">What are the benefits of using Uni Bank?</span>
                          </button>
                        </div>
                        <div id="faqBody4" className="accordion-collapse collapse" aria-labelledby="faq4"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15"> Benefits include secure transactions, automated gifting, transparent processes, and access to scalable tiers. The platform also offers auto-withdrawal and efficient tracking to enhance your experience.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="accordion__item accordion-item">
                        <div className="accordion__header accordion-header" id="faq5">
                          <button className="accordion-button accordion__button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#faqBody5" aria-expanded="false"
                            aria-controls="faqBody5">
                            <span className="accordion__button-content">How does automated gifting work?</span>
                          </button>
                        </div>
                        <div id="faqBody5" className="accordion-collapse collapse" aria-labelledby="faq5"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15"> Automated gifting ensures that funds are transferred automatically once a matrix is completed, eliminating the need for manual withdrawal and streamlining the process.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="accordion__item accordion-item border-0">
                        <div className="accordion__header accordion-header" id="faq6">
                          <button className="accordion-button accordion__button collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#faqBody6" aria-expanded="false"
                            aria-controls="faqBody6">
                            <span className="accordion__button-content"> Are transactions secure on Uni Bank?</span>
                          </button>
                        </div>
                        <div id="faqBody6" className="accordion-collapse collapse" aria-labelledby="faq6"
                          data-bs-parent="#faqAccordion1">
                          <div className="accordion__body accordion-body">
                            <p className="mb-15"> Yes, all transactions are encrypted and secure, utilizing the Binance Smart Chain (BSC) to ensure the highest level of security for your funds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="faq__thumb faq__thumb--style1" >
                  <img className="dark" src="/assets/images/others/1.png" alt="faq-thumb" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="faq__shape faq__shape--style1">
          <span className="faq__shape-item faq__shape-item--1"><img src="/assets/images/others/2.png" alt="shpae-icon" /></span>
        </div>
      </section>
    </>
}