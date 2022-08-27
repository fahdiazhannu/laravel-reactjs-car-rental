import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function NavbarUser() {

  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then(res => {
      if(res.data.status === 200)
      {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message,"success");
        history.push('/login');
      }
    });
  }

  var AuthButtons = '';
  if(!localStorage.getItem('auth_token'))
  { 
      AuthButtons = (

        <Nav className="me-auto">

          <Nav.Link href="/login" className="nav-link">Login </Nav.Link>

          <Nav.Link href="/register" className="nav-link">Register</Nav.Link>
   </Nav>

      )
  }
  else
  { 
      AuthButtons = (
    
        <Nav.Link href="/logout">
        <button type="button" onClick={logoutSubmit} className="btn btn-danger">Logout</button>
      </Nav.Link>
     
      );
  }

    return(
      <div>
      <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
      <Navbar.Brand href="/">Rental Mobil</Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link href="/main">Rekomendasi Mobil</Nav.Link>
        <Nav.Link href="/detail-sewa">List Sewa</Nav.Link>
        <Nav.Link href="/sewa-mobil">Sewa Mobil</Nav.Link>
        <Nav.Link href="/riwayat-transaksi">Riwayat Transaksi</Nav.Link>
        <Nav.Link href="/tentang">Tentang</Nav.Link>
      </Nav>
      </Container>
      {AuthButtons}
    </Navbar>
    <br />
    <br />
    <br />
   
    </div>
    )
}
export default NavbarUser;