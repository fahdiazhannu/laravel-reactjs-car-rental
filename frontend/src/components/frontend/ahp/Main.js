import { useEffect, useState } from "react";
import { getWeights, resultKampus } from './ahp-module';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; //
import Container from 'react-bootstrap/Container'; //
import lineaAlgebra from 'linear-algebra'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix;
const ahp = require('ahp-lite');

const Main = () => {

    const kampus = {
        avanza: {
            budget: 5,
            tempat: 3,
            chance: 9,
            
            
        },
        xenia: {
            budget: 5,
            tempat: 3,
            chance: 2,
            
            
           
        },
        rush: {
            budget: 3,
            tempat: 3,
            chance: 1,
        
        },
        innova: {
            budget: 3,
            tempat: 9,
            chance: 2,


            
            
     
        },
        ertiga: {
            budget: 3,
            tempat: 3,
            chance: 4,
            
            
           
        }
    };
  



    
    const [nilai, setNilai] = useState();
    const [budget, setBudget] = useState();
    const [tempat, setTempat] = useState();
    const [chance, setChance] = useState(9);

    const matrix = new Matrix([[1, 1/nilai, 1/budget, 1/tempat ], [nilai, 1, 1/chance, 1/5 ], [budget,chance,1,1/1/5 ], [tempat, 1, 1/1, 1 ]]);

    const [vector, setVector] = useState(getWeights());

    const resultRanked = () => {
        const resultRank = resultKampus(kampus);
        let list = [];

        for (let i = 0; i < 5; i++) {
            list[i] = resultRank[0][i] * vector['ev'][0] + resultRank[1][i] * vector['ev'][1] + resultRank[2][i] * vector['ev'][2] + resultRank[3][i] * vector['ev'][3];
        }
        const ranking = () => {

          //let namedValue = [["image/ayla.jpeg", "Toyota Ayla", list[0]], ["image/agya.png", "Daihatsu Agya", list[1]], ["image/karimun.jpg", "Karimun", list[2]], ["", "", list[3]], ["", "", list[4]]];
          //let namedValue = [["image/jazz.png", "Honda Jazz", list[0]], ["image/brio.png", "Honda Brio", list[1]], ["image/fiesta.jpg", "Ford Fiesta", list[2]], ["", "", list[3]], ["", "", list[4]]];
          let namedValue = [["image/innova.png", "Innova", list[0]], ["image/rush.png", "Rush", list[1]], ["", "", list[2]], ["", list[3]], ["", "", list[4]]];
         //let namedValue = [["image/xenia.png", "Xenia", list[0]], ["image/a1.jpg", "Avanza", list[1]], ["image/ertiga.png", "Ertiga", list[2]], ["image/rush.png", "Rush", list[3]], ["image/innova.png", "Innova", list[4]]];
            namedValue = namedValue.slice(0).sort(function(a, b) {
              return b[1] - a[1];
            });
            return namedValue;
          };
        return ranking();
    };

    const [ranked, setRanked] = useState(resultRanked());

    const handleSubmit = (e) => {
        e.preventDefault();
       setVector(getWeights(matrix));
        console.table(matrix);
    };

    useEffect(() => {
        setRanked(resultRanked());
        console.log(ranked);
    }, [vector]);
    
    return (
        <div className="container">
           
            <br />
            <br />
            <h1>Rekomendasi Mobil</h1>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Harga Sewa: </label>
                <select className="form-select" required onChange={(e) => setChance(parseFloat(e.target.value))}>
                    <option value="" selected disabled hidden>Pilih Harga Sewa</option>
                    <option value="9">300.000 &gt; 400.000</option>
                    <option vaue="5">400.000 &gt; 500.000</option>

                </select>
                <label htmlFor="">Fitur : </label>
                <select className="form-select" required onChange={(e) => setTempat(parseFloat(e.target.value))}>
                    <option value="" selected disabled hidden>Pilih Fitur</option>
                    <option value="1">Lengkap</option>
                    <option value="1">Standar</option>
                    
                    
                </select>
                <p>Fitur Terbaik : Head Unit, Dash Cam, Rear Cam, Audio, Action, USB Port
            <br/>Fitur Standar : Head Unit, Audio, AC, USB Port</p>
               <label htmlFor="">Kapasitas: </label>
                <select className="form-select" required onChange={(e) => setNilai(parseFloat(e.target.value/10))}>
                    <option value="" selected disabled hidden>Pilih Kapasitas</option>
                    <option value="90">4 orang</option>
                    <option value="90">7 orang</option>
                  
                    
                </select>
                <label htmlFor="">Konsumsi BBM: </label>
                <select className="form-select" required onChange={(e) => setBudget(parseFloat(e.target.value))}>
                    <option value="" selected disabled hidden>Pilih Konsumsi BBM</option>
                    <option value="3">12-14 KM/Liter</option>
                    <option value="3">15-18 KM/Liter</option>

                </select>
                <br />
                <button className="btn btn-success">Submit</button>
            </form>
            <br />

            <h4 id="result">Hasil Rekomendasi :</h4>
            <br />
            <div className="col">
            <Container>
            <Row className="g-4">
            <Col>
      {/* <div className="list-group-success">
<a href="#" className="list-group-item list-group-item-action active">
 Perangkingan
</a>
<a href="#" className="list-group-item list-group-item-action">1. {isNaN(ranked[0][2]) ? "" : ranked[0][1]}</a>
<a href="#" className="list-group-item list-group-item-action">2. {isNaN(ranked[1][2]) ? "" : ranked[1][1]}</a>
<a href="#" className="list-group-item list-group-item-action">3. {isNaN(ranked[2][2]) ? "" : ranked[2][1]} </a>
<a href="#" className="list-group-item list-group-item-action">4. {isNaN(ranked[3][2]) ? "" : ranked[3][1]}</a>
<a href="#" className="list-group-item list-group-item-action">5. {isNaN(ranked[4][2]) ? "" : ranked[4][1]}</a>

</div>
         */}
        <br />

        <div className="col">
         
                <Row className="g-4">
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={isNaN(ranked[0][2]) ? "" : ranked[0][0]} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{isNaN(ranked[0][2]) ? "" : ranked[0][1]}</Card.Title>
                    <Card.Text>
               
                    </Card.Text>
    
                  <Card.Footer>
                  <Link to={`/mobil/mpv/toyota-innova`}>
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={isNaN(ranked[1][2]) ? "" : ranked[1][0]} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{isNaN(ranked[1][2]) ? "" : ranked[1][1]}</Card.Title>
                    <Card.Text>
               
                    </Card.Text>
    
                  <Card.Footer>
                  <Link to={`/mobil/mpv/toyota-rush`}>
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={isNaN(ranked[2][2]) ? "" : ranked[2][0]} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{isNaN(ranked[2][2]) ? "" : ranked[2][1]}</Card.Title>
                    <Card.Text>
               
                    </Card.Text>
    
                  <Card.Footer>
                  <Link to={`/mobil/daihatsu-xenia`}>
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={isNaN(ranked[3][2]) ? "" : ranked[3][0]} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{isNaN(ranked[3][2]) ? "" : ranked[3][1]}</Card.Title>
                    <Card.Text>
               
                    </Card.Text>
    
                  <Card.Footer>
                  <Link to={`/mobil/suzuki-ertiga`}>
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '16rem'}}>
                  <Card.Img variant="top" src={isNaN(ranked[4][2]) ? "" : ranked[4][0]} className="card-img-top embed-responsive-item"/>
                  <Card.Body>
                    <Card.Title>{isNaN(ranked[4][2]) ? "" : ranked[4][1]}</Card.Title>
                    <Card.Text> 
                    </Card.Text>
                  <Card.Footer>
                  <Link to={`/mobil/mpv/toyota-avanza`}>
                      <span className="btnDetail">Lihat Selengkapnya</span>
                  </Link>
                </Card.Footer>
                  </Card.Body>
                </Card>
                </Col>
                </Row>
        
                </div>

<br />
{/* <div className="list-group">
<a href="#" className="list-group-item list-group-item-action active">
 Bobot Kriteria
</a>
<a href="#" className="list-group-item list-group-item-action"> Harga Sewa : {isNaN(vector['ev'][0]) ? "" : vector['ev'][0]}</a>
<a href="#" className="list-group-item list-group-item-action">Fitur Mobil :{isNaN(vector['ev'][1]) ? "" : vector['ev'][1]}</a>
<a href="#" className="list-group-item list-group-item-action">Kapasitas Mobil : {isNaN(vector['ev'][2]) ? "" : vector['ev'][2]} </a>
<a href="#" className="list-group-item list-group-item-action">Konsumsi BBM : {isNaN(vector['ev'][3]) ? "" : vector['ev'][3]}</a>
<a href="#" className="list-group-item list-group-item-action">Consistency Index: {isNaN(vector['ci']) ? "" : vector['ci']}</a>
<a href="#" className="list-group-item list-group-item-action">Consistency Ratio: {isNaN(vector['cr']) ? "" : vector['cr']}</a>
</div> */}
      </Col>  
        </Row>
        </Container>
</div>
        </div>

    );

};

export default Main;