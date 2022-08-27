import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';



function Home(){

const [mobil, setMobil] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    let isMountered = true;
    axios.get('/api/view-mobil').then(res=>{
        if(isMountered)
        {

            if(res.status === 200)
            {
                setMobil(res.data.mobil);
                setLoading(false);
            }
            

        }

    });
    return () => {
        isMountered = false;
    }

});


if(loading)
{
    return <div className="center">Loading ....</div>
}
else
{
    var showMobilHome= '';
    showMobilHome = mobil.map((item, idx) => {
        return (

        <div className="col" key={idx}>
          
<Container>
<Row className="g-4">
<Col>
<Card style={{ width: '16rem'}}>
  <Card.Img variant="top" src={`http://127.0.0.1:8000/${item.image}`} className="card-img-top embed-responsive-item"/>
  <Card.Body>
    <Card.Title>{item.nama}</Card.Title>
    <Card.Text>
    {item.tahunmobil}
    </Card.Text>
    <Card.Text>
    Mulai dari Rp {item.hargasewa_asli} /hari
    </Card.Text>
  <Card.Footer>
  <Link to={`/mobil/${item.category.slug}/${item.slug}`}>
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
    });
}










    return (
        <div>
           
           <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
             <div className="center2">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/image/cr1.jpg" className="d-block w-70" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/image/cr2.jpg" className="d-block w-70" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/image/cr3.jpg" className="d-block w-70" alt="..." />
              </div>
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <br/>


<div>
    
            <div className="py-3">
                <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {showMobilHome}
                    </div>
                </div>
            </div>
        </div>



{/* <div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col">
    <div className="card h-100">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a short card.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div> */}


        </div>
    )

}

export default Home;