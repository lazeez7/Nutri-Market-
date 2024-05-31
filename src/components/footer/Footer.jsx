import React from 'react'
import "./footer.css"
import insta from '../instagram.png'

const Footer = () => {
  return (
    <>
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-item">
          <img className='logo' src="data:image/jpeg;base64,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" alt="" />
             
          </div>

          <div className="footer-item">
          <h1>Contact Us</h1>
           <p>Email:info@example.com</p>
           <p>Phone:+ 99 849 03 30 (Юнусабад)</p>
           <p>Phone:+71 244 54 45 (ул.Абая)</p>
           <p>Adress:Юнусобод филиали: Юнусобод 14кв 22с уй, Tashkent, Uzbekistan .</p>
          </div>

          <div className="footer-item">
            <h1>Follow Us</h1>
            <a target='_blank' href="https://www.instagram.com/buddyburgeruz/">
            <img className='icon' src={insta} alt="" />
            </a>
          </div>
        </div>
        

      </div>
    </footer>
    
    
    </>
  )
}

export default Footer
