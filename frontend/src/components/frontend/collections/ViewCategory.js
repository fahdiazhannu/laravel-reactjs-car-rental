import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumb from 'react-bootstrap/Breadcrumb'




function ViewCategory()
{

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMountered = true;
        axios.get('/api/getCategory').then(res=>{
            if(isMountered)
            {

                if(res.status === 200)
                {
                    setCategory(res.data.category);
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
        var showCategoryList= '';
        showCategoryList = category.map((item, idx) => {
            return (

<div className="col" key={idx}>
                <Container>
                <Row className="g-4">
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={`http://127.0.0.1:8000/${item.image}`} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{item.nama}</Card.Title>
                  <Card.Footer>
                  <Link to={`mobil/${item.slug}`}>
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

        
        <div className="container">
<br/>
<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Beranda</Link></li>
    <li className="breadcrumb-item"><Link to="/mobik">Sewa Mobil</Link></li>
  </ol>
</nav>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                    {showCategoryList}
                    </div>
                </div>
            </div>
        </div>




    )
}
export default ViewCategory;