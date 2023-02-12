
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../pages/Footer';
import { Link } from 'react-router-dom';

const FAQs = () => {
  return (
    <>
    
    <section className='faq-section  bg-dark text-light'>
      <h1 className='my-5 pt-5 py-1 text-center'>Frequently Asked Questions</h1>
      <div className='container-faq'>
        <div className='row mx-3'>
          <div className='col-md-6'>
            {/* <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is the Sportsmatch</Accordion.Header>
              <Accordion.Body>
              A managemeng tool that allows users to manage their teams, players and shedules.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>lorem ipsum</Accordion.Header>
              <Accordion.Body>
                Lorem Ipsum
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Lorem Ipsum</Accordion.Header>
              <Accordion.Body>
              Lorem Ipsum <Link to='/signup'>create an account</Link> Lorem Ipsum <Link to='/login'>log in</Link> Lorem Ipsum
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Lorem Ipsum</Accordion.Header>
              <Accordion.Body>
              Lorem Ipsum <span className='fw-semibold'>(1 to 3 Business days)</span> and take the appropriate action. You will be informed of the status of your complaint through the web application and can check for updates at any time.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Lorem Ipsum</Accordion.Header>
              <Accordion.Body>
                You may contact us <Link to='/contact'>HERE</Link> by letting us know if you need assistance.
              </Accordion.Body>
            </Accordion.Item>
            </Accordion> */}
          </div>
          {/* <div className='col-6'>
            <img 
            src={faq_img} 
            className='img-fluid w-100 d-none d-sm-block pb-5' 
            alt='img' 
            style={{height: 400, width: 300}} />
          </div>
        </div> */}
      </div>
      </div>
    </section>
    
    </>
  )
}

export default FAQs;
