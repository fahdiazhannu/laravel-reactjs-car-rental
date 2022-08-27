import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumb from 'react-bootstrap/Breadcrumb'




function Kriteria()
{

            return (
<div className="col">
    <br/>
    <br/>
    <br/>
                <Container>
                <Row className="g-4">
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={`http://127.0.0.1:8000/`} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>Harga</Card.Title>
                  <Card.Footer>
                  <Link to="/kriteria-harga">
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>



                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={`http://127.0.0.1:8000/`} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>Fitur</Card.Title>
                  <Card.Footer>
                  <Link to="/kriteria-fitur">
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={`http://127.0.0.1:8000/`} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>Kapasitas</Card.Title>
                  <Card.Footer>
                  <Link to="/kriteria-kapasitas">
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={`http://127.0.0.1:8000/`} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>Konsumsi BBM</Card.Title>
                  <Card.Footer>
                  <Link to="/kriteria-bbm">
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                </Row>
                </Container>
                
                </div>




    )
}
export default Kriteria;