import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark p-4'>
      <div className='footer-container'>
      <div className='footer-content text-white text-center'>
        <p>Content Owned by Aspirant.</p>
        <p>Developed and hosted by <Link>Aspirant</Link></p>
        <p><Link>This is expanses tracker, using MERN tech stack</Link></p>
        <p>Last Updated : Nov, 2025</p>
      </div>
      <div className='text-center'><small className='text-info'>Note: All content reserved by @aspirant</small></div>
    </div>
    </div>
  )
}

export default Footer
