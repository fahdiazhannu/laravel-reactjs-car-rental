import React, {Component} from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

export default class Invoice extends React.Component {
    state = {
        orders: []
      }
    
      componentDidMount() {
        axios.get(`/api/riwayat`)
          .then(res => {
            const orders = res.data.orders;
            this.setState({ orders });
          })
      }
    render(){
        return(
            <div className="container">
           <br />
            
           <div className="card-header">
                  <h4>Invoice</h4>
                  <ReactToPrint
                trigger={()=>{
                    <br />
                    return <button className="btn btn-primary">Print this page</button>}
                }
                    content= {()=>this.componentRef}
                    documentTitle='INVOICE SEWA'
                    pageStyle="print"
                 />
              </div>
                 
                 <div ref={el=>{this.componentRef=el}}>
                 <ul>
        {
          this.state.orders
            .map(person =>
    <div className="card mt-3">

              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Kode Tx</th>
                                  <th>Email</th>
                                  <th>No. Telp</th>
                                  <th>Tgl Transaksi</th>
                                 
                              </tr>
                          </thead>
                          <tbody>
                          <td>{person.id}</td>
                    <td>{person.tracking_no}</td>
                    <td>{person.email}</td>
                    <td>{person.notelp}</td>
                    <td>{person.created_at}</td>
                          </tbody>
                      </table>
                  </div>
              </div>
              </div>

              
            )
        }
      </ul>
            </div>
            </div>
            
        )
    }
}

