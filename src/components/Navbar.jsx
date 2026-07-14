import React from 'react'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    {/* <img src=" https://static.vecteezy.com/system/resources/previews/008/424/420/non_2x/blood-donation-background-with-red-heart-vector.jpg" alt="Blood image" /> */}
    <a className="navbar-brand text-danger fw-bold" href="#">BloodConnect</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active fw-bold text-danger" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Find Donor</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Request Blood
          </a>  
         
        </li>
        <li className="nav-item">
          <a className="nav-link " >About Us</a>
        </li>
       <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Contact Us
          </a>  
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <button style={{ color:'red' , border: '2px solid red'}}> Login</button>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}
