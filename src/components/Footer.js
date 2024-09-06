import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
        <div className='footer'>
            <footer className=" py-4 bg-light">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Besitz 2024</div>
                        <div>
                            <Link className="a" to="#">Privacy Policy</Link>
                            &middot;
                            <Link className="a" to="#">Terms &amp; Conditions</Link>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </>
  )
}

export default Footer
