import React from 'react'
import { Link } from 'react-router-dom'

const ReporteF = () => {
  return (
   <div className="main">
    <div className="topbar">
        <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
        </div>
    </div>
      <div className="content" >
        <div className="card">
          <h2>Dashboard Financiero</h2>
          <main>
          <iframe title="DASHBOARDWOK" width="1100" height="646" src="https://app.powerbi.com/view?r=eyJrIjoiNmVkM2UzMDktNzMxYS00YjM4LWEzMTUtNjI1MzM0YjJjOTFmIiwidCI6IjhhNmUyOWJiLWRmNDYtNGMxOS04NWJkLTZmNTVjYmNhNzEyNCIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Besitz 2023</div>
                <div>
                  <Link to="#">Privacy Policy</Link>
                  &middot;
                  <Link to="#">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ReporteF
