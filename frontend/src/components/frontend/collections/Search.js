
import { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Search() {
  const [data, setData] = useState([]);

  async function search(key) {
    console.warn(key);
    let result = await fetch("http://localhost:8000/search/" + key);
    result = await result.json();
    setData(result);
  }


  return (
    <div>
    <Container>
      <div className="col-sm-6 offset-sm-3">
        <h1>Cari Mobil</h1>
        <br />
        <input
          onChange={(e) => search(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Type here to search for a product"
        />
        <br />
     
       
      <Row className="g-4">
      {data.map((item) => (
    <Col>
      <Card style={{ width: '16rem'}}>
        <Card.Img variant="top" src={"http://localhost:8000/" + item.image} className="card-img-top embed-responsive-item"/>
        <Card.Body>
          <Card.Title>{item.nama}</Card.Title>
          <Card.Text>
          {item.tahunmobil}
          </Card.Text>
          <Card.Text>
          Mulai dari Rp {item.hargasewa_asli} /hari
          </Card.Text>
        <Card.Footer>
        <Link to={"detail/" + item.id}>
            <span className="btnDetail">Lihat Selengkapnya</span>
        </Link>
    </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
    
  ))}
</Row>

      </div>
      </Container>
    </div>
  );
}
export default Search;
