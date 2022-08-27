import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function MobilBbm(props)
{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [mobil, setMobil] = useState([]);
    const [category, setCategory] = useState([]);


    const mobilCount = mobil.length;

    useEffect(() => {
        
        let isMounted = true
        axios.get(`/api/kriteria-bbm`).then(res => {
            if(isMounted )
            {
                if(res.data.status === 200)
                {
                    setMobil(res.data.mobil_data.mobil);
                    console.log(res.data.mobil_data.mobil);
                    setLoading(false);
                }
                else if(res.data.status === 400)
                {
                    swal("Warning", res.data.message, "")
                }
                else if (res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return() => {
        let isMounted = false

        };

    }, [history]);

    if(loading)
    {
        return <h4>Loading Mobil ....</h4>
    }
    else
    {
        var showMobilList = '';
        if(mobilCount)
        {

        showMobilList = mobil.map((item, idx) => {
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
    else
     {
        showMobilList = 
        <div className="col-md-12">
            <h4>Mobil tidak ditemukan pada kategori {category.nama}</h4>
            </div>
    }
    }

    return (
      
        <div>
        <div className="py-3">
            <div className="container">
            <Breadcrumb>
  <Breadcrumb.Item href="/">Beranda</Breadcrumb.Item>
  <Breadcrumb.Item href="/mobil">Sewa Mobil</Breadcrumb.Item>
  
  <Breadcrumb.Item active>List Mobil</Breadcrumb.Item>
</Breadcrumb>
                <div className="row">
                {showMobilList}
                </div>
            </div>
        </div>
    </div>
        
    );
}
export default MobilBbm;
