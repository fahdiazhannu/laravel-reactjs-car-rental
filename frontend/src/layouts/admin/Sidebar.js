import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark sb-sidenav bg-primary" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
      
              <Link to="/admin/dashboard" className="nav-link dark">
                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faGauge} /> </div>
                    Dashboard
                </Link>
      
                <div className="sb-sidenav-menu-heading">Kategori</div>
              <Link to="/admin/add-category" className="nav-link"  aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faListOl} /> </div>
                    Tambah Kategori
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <Link to="/admin/view-category" className="nav-link"  aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faListOl} /></div>
                    Lihat Kategori
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>

                <div className="sb-sidenav-menu-heading">Mobil</div>
              <Link to="/admin/add-mobil" className="nav-link" href="charts.html">
              <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCar} /></div>
                    Tambah Data Mobil
                </Link>
              <Link to="/admin/view-mobil" className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faListAlt}/></div>
                    List Data Mobil
                </Link>
                <Link to="/admin/orders" className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faAddressBook}/></div>
                    Laporan Transaksi Sewa
                </Link>
            </div>
        </div>
        <div className="sb-sidenav-footer bg-primary">
            <div className="small">Logged in as:</div>
            Admin
        </div>
    </nav>
    );
}

export default Sidebar;