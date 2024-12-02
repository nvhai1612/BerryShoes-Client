import React from 'react';

const ContactSection = () => {
  return (
    <section className="contact_section">
      <div className="container px-0">
        <div className="heading_container">
          <h2>Contact Us</h2>
        </div>
      </div>
      <div className="container container-bg">
        <div className="row">
          <div className="col-lg-7 col-md-6 px-0">
            <div className="map_container">
              <div className="map-responsive">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Detech+Building,+107+Tôn+Thất+Thuyết,+Mỹ+Đình,+Nam+Từ+Liêm,+Hà+Nội,+Vietnam"
                  width="600"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  title="Map"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 px-0">
            <form action="#">
              <div>
                <input type="text" placeholder="Name" required />
              </div>
              <div>
                <input type="email" placeholder="Email" required />
              </div>
              <div>
                <input type="text" placeholder="Phone" required />
              </div>
              <div>
                <input type="text" className="message-box" placeholder="Message" required />
              </div>
              <div className="d-flex">
                <button type="submit">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
