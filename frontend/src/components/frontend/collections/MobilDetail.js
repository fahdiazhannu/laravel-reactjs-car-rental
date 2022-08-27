import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { useHistory, Link } from 'react-router-dom';
// import ReactWhatsapp from 'react-whatsapp';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function MobilDetail(props)
{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [mobil, setMobil] = useState([]);
    const [tgl_sewa, setTglsewa] = useState([]);
    const [quantity, setQuantity] = useState(1);


    


    useEffect(() => {
        
        let isMounted = true
        const category_slug = props.match.params.category;
        const mobil_slug = props.match.params.mobil;
        axios.get(`/api/mobildetail/${category_slug}/${mobil_slug}`).then(res => {
            if(isMounted )
            {
                if(res.data.status === 200)
                {
                    setMobil(res.data.mobil);
                    setLoading(false);
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

    }, [props.match.params.mobil, props.match.params.category, history]);


//Quantity Increment/Decrement in Hooks - Start
const handleDecrement = () => {
    if (quantity > 1){
        setQuantity(prevCount => prevCount - 1);
    }
    
}

const handleIncrement = () => {
    if (quantity < 10){
    setQuantity(prevCount => prevCount + 1);
    }
}



//Quantity Increment/Decrement in Hooks - End

const submitSewa = (e) => {
    e.preventDefault();

    const data =  {
        mobil_id: mobil.id,
        mobil_qty : quantity,
        tgl_sewa : tgl_sewa,
    }

    axios.post(`/api/sewa-mobil`, data).then(res=>{

        if(res.data.status === 201){
            swal("Success", res.data.message, "success")
        }else if(res.data.status === 409){
            swal("Warning", res.data.message, "warning")
        }else if(res.data.status === 410){
            swal("Warning", res.data.message, "warning")
        }else if(res.data.status === 409){
            swal("Error", res.data.message, "error")
        }else if(res.data.status === 404){
            swal("Warning", res.data.message, "error")
        }


    });
}


if(loading)
{
    return <div className="center">Loading ....</div>
}
else
{
    var available_stock = '';
    if(mobil.qty > 0 )
    {

  
    available_stock = <div>
                    <label className="btn-sm btn-success px-4 mt-2 mb-2">Tersedia</label>
                        <br/>
                            <label>Tanggal Sewa</label>    
                            <div className="input-group w-50">
                                <input type="date" min={new Date().toISOString().split('T')[0]} className="form-control" onChange={(e) => setTglsewa(e.target.value)} value={tgl_sewa} />
                            </div>
 
                            <div className="col-md-3 mt-4">
                                <button type="button" className="btn btn-primary w-100" onClick={submitSewa}>Sewa Sekarang</button>   
                                {/* <ReactWhatsapp number="1-212-736-5000" message="Hello World!!!" className="btn btn-primary"><span>Whatsapp</span></ReactWhatsapp> */}
                        </div>
                        
                       
    </div>
      }
      else
      {
                    available_stock = <div>
                        <label className="btn-sm btn-danger px-4 mt-2">Unit tidak tersedia</label>
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
  <Breadcrumb.Item href="/">
  {mobil.category.nama}
  </Breadcrumb.Item>
  <Breadcrumb.Item active> {mobil.nama}</Breadcrumb.Item>
</Breadcrumb>
            </div>
        </div>

        


        <Container>
            <Card border="light" style={{ width: '50rem'}}>
            <Card.Header><h3>{mobil.nama} </h3></Card.Header>
            <Card.Body>

            <Col sm={10} className="m-auto">
            <img
                className="d-block mx-auto img-fluid"

                src={"http://localhost:8000/" + mobil.image}
                alt="mysvg"
            ></img>
            </Col>
            <Card.Text><h5>{mobil.tahunmobil}</h5></Card.Text>
            <Card.Title>Harga Sewa Rp {mobil.hargasewa_asli} / hari</Card.Title>
            <Card.Text>
            {mobil.deskripsi}
            </Card.Text>
            <div>{available_stock}</div>  
            </Card.Body>
            </Card>
        </Container>









        
    </div>
    )
}
export default MobilDetail;