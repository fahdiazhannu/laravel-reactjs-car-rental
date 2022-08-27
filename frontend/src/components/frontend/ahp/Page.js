import React, { Component } from "react";

import PageResult from "./PageResult";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; //
import Container from 'react-bootstrap/Container'; //
import Card from 'react-bootstrap/Card'


class Page extends Component {
  constructor() {
    super();
    this.state = {
      carPrice: "",
      harga: "",
      price_category: "",
      kapasitas: "",
      cars: [
        {
          id: "898203c9-cd14-4bc9-ae26-519e69a3ffbc",
          name: "Avanza",
          bbm: "16",
          carPrice: 360000,
          harga : "3",
          kapasitas: "7",
          rating: null,
          price_category: "Standar",
          image: "/image/a1.jpg"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc87",
          name: "Xenia",
          bbm: "14",
          carPrice: 330000,
          harga : "3",
          rating: null,
          kapasitas: "7",
          price_category: "Rendah",
          image: "/image/xenia.png"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc88",
          name: "Innova",
          bbm: "16",
          carPrice: 50000,
          harga : "4",
          kapasitas: "7",
          rating: null,
          price_category: "Lengkap",
          image: "/image/innova.png"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc89",
          name: "Rush",
          bbm: "16",
          carPrice: 360000,
          harga : "4",
          rating: null,
          kapasitas: "7",
          price_category: "Standar",
          image: "/image/rush.png"
        },
        {
          id: "898203c9-cd14-4bc9-ae26-519e69a3ff00",
          name: "Ertiga",
          bbm: "14",
          carPrice: 350000,
          harga : "3",
          rating: null,
          kapasitas: "7",
          price_category: "Standar",
          image: "/image/ertiga.png"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc02",
          name: "Ayla",
          bbm: "16",
          carPrice: 350000,
          harga : "3",
          rating: null,
          kapasitas: "4",
          price_category: "Standar",
          image: "/image/ayla.jpeg"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc03",
          name: "Agya",
          bbm: "14",
          carPrice: 300000,
          harga : "3",
          rating: null,
          kapasitas: "4",
          price_category: "Rendah",
          image: "/image/agya.png"
        },
        {
          id: "7df46655-10ac-48eb-8df4-c5d7eb51dc04",
          name: "Jazz",
          bbm: "14",
          carPrice: 40000,
          harga : "4",
          rating: null,
          kapasitas: "4",
          price_category: "Lengkap",
          image: "/image/jazz.png"
        }
      ],
      filtercars: []
    };
  }

  //state= { cars:[] };

  componentDidMount() {}

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  render() {
    let filtercars = this.state.cars;
    filtercars = filtercars.filter((hotel) => {
      return (
        hotel.carPrice <= Number(this.state.carPrice) ||
        hotel.price_category === this.state.price_category
        
      );
    });

   
    if (this.state.harga && this.state.price_category && this.state.kapasitas && this.state.bbm) {
      filtercars = filtercars.filter((hotel) => {
        return (
          hotel.harga === this.state.harga &&
          hotel.price_category === this.state.price_category &&
          hotel.kapasitas == this.state.kapasitas && 
          hotel.bbm == this.state.bbm
        );
      });
      

      

    }

    return (
   
      <div className="container">
        < br/>
        <PageResult cars={filtercars} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Page;
