import React from 'react';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';

import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import routes from '../../routes/routes';
import { Switch, Route, Redirect } from 'react-router-dom';


const MasterLayout = () => {

    return(
        <div className="sb-nav-fixed">
        
        <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>

                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {routes.map((route, idx) => {
                                return (
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.component {...props} />
                                            )}    
                                        />
                                    )
                                )
                            })}
                            <Redirect from="/admin" to="admin/dashboard"/>
                            </Switch>


                    </main>
                    <Footer />
                </div>

            </div>
        </div>
    )
}

export default MasterLayout;