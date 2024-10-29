export default function Partners() {
    return <>
        <div className="partner partner--gradient">
        <div className="container">
          <div className="partner__wrapper">
            <div className="partner__slider swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide"> 
                  <div className="partner__item">
                    <div className="partner__item-inner">
                      <img src="/assets/images/wallet/metamask.png" alt="partner img" className="light"/>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="partner__item">
                    <div className="partner__item-inner">
                      <img src="/assets/images/wallet/pocket.png?v=2" alt="partner logo" className="light"/>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="partner__item">
                    <div className="partner__item-inner">
                      <img src="/assets/images/wallet/trust.png?v=2" alt="partner logo" className="light"/>
                    </div>
                  </div>
                </div>


                <div className="swiper-slide">
                  <div className="partner__item">
                    <div className="partner__item-inner">
                      <img src="/assets/images/wallet/bnb.png" alt="partner logo" className="light"/>
                    </div>
                  </div>
                </div>


                <div className="swiper-slide">
                  <div className="partner__item">
                    <div className="partner__item-inner">
                      <img src="/assets/images/wallet/myetherwallet.webp" alt="partner logo" className="light"/>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}