import React, {Component} from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Moment from 'react-moment';

export default class Invoice extends React.Component {
    state = {
        orders: []
      }
    
      componentDidMount() {
        axios.get(`/api/admin/orders`)
          .then(res => {
            const orders = res.data.orders;
            this.setState({ orders });
          })
      }
    render(){
        return(
         <div className="container">
           <div className="container">
                <ReactToPrint
                trigger={()=>{
                    
                    return <button className="btn btn-primary">Print this page</button>}
                    
                }
                    content= {()=>this.componentRef}
                    documentTitle='REPORT TRANSAKSI'
                    pageStyle="print"
                 />
                 </div>
                 <div ref={el=>{this.componentRef=el}}>
                 <ul>
                 <div className="card mt-3">
              <div className="card-header">
                  <h4>Report Transaksi Sewa
                      
                  </h4>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Kode Transaksi</th>
                                  <th>Email</th>
                                  <th>Nomor Telepon</th>
                                  <th>Tanggal Transaksi</th>
                              </tr>
                          </thead>
        {
          this.state.orders
            .map(person =>
          
                          <tbody>
                    <td>{person.id}</td>
                    <td>{person.tracking_no}</td>
                    <td>{person.email}</td>
                    <td>{person.notelp}</td>
                    <td><Moment format="DD/MM/YYYY">{person.created_at}</Moment><Moment format="HH:MM">{person.created_at}</Moment></td>
                          </tbody>
            
              
            )
        }
                  </table>
                  </div>
              </div>
              </div>

      </ul>
            </div>
            </div>
            
        )
    }
}

