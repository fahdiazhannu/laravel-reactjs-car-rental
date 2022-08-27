import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; //
import Container from 'react-bootstrap/Container'; //
import Card from 'react-bootstrap/Card'


class PageResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CarPrice: "",
      harga: "",
      price_category: "",
      kapasitas: "",
      bbm: "",
    };
  }

  render() {
    const { carPrice, price_category, kapasitas, bbm, harga, cars, onChange } = this.props;
    console.log(cars.length);
    return (
      <div>
              <center>
          <h1>Rekomendasi Mobil</h1>
        </center>
        <table>
          <tr>
            <td>
              {/* Harga Mobil: */}
              {/* <input
                name="carPrice"
                type="text"
                className="form-control"
                value={carPrice}
                onChange={onChange}
              /> */}
            </td>
            <td>
              Harga Sewa :
              <select name="harga" className="form-select" value={harga} onChange={onChange}>
                <option>Pilih</option>
                <option value="3">300.000 - 400.000</option>
                <option value="4">400.000 - 500.000</option>
              </select>
            </td>
            <td>
              Fitur :
              <select
                name="price_category"
                className="form-select"
                value={price_category}
                onChange={onChange}
              >
                <option>Select</option>
                <option value="Rendah">AC, AUDIO</option>
                <option value="Standar">AC, AUDIO, HEAD UNIT, USB PORT</option>
                <option value="Lengkap">AC, AUDIO, HEAD UNIT, USB PORT, DASH CAM, REAR CAM</option>
              </select>
            </td>
            <td>
              Kapasitas :
              <select name="kapasitas" className="form-select" value={kapasitas} onChange={onChange}>
                <option>Pilih</option>
                <option value="4">4</option>
                <option value="7">7</option>
              </select>
            </td>
            <td>
              Konsumsi BBM :
              <select name="bbm" className="form-select" value={bbm} onChange={onChange}>
                <option>Pilih</option>
                <option value="14">14-15 km/liter</option>
                <option value="16">16-17 km/liter</option>
              </select>
            </td>
            
          </tr>
        </table>
  
        {cars.map((car) => (
            <div className="container">
                <br />
                <div className="col">
                <Row>
          <Card style={{width: '16rem'}} key={car.id}>
            <Card.Body>
            <Card.Img variant="top" src={car.image} className="card-img-top embed-responsive-item"/>
                <Card.Title>{car.name}</Card.Title>
              <Card.Text>{car.carPrice} / hari</Card.Text>
              <Card.Text>{car.kapasitas} orang</Card.Text>
              <Card.Text>{car.price_category}</Card.Text>
              <Card.Text>{car.bbm} KM/Liter</Card.Text>
            </Card.Body>
          </Card>
          </Row>
          </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PageResult;
