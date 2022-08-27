import React from 'react';


import '../../assets/admin/js/scripts.js';
import Navbar from 'react-bootstrap/Navbar'


import routes from '../../routes/routes';
import { Switch, Route } from 'react-router-dom';
import NavbarUser from '../../layouts/frontend/Navbar';

import publicRoutesList from '../../routes/Publicrouteslist';

const FrontendLayout = () => {

    return(
        <div>

            <NavbarUser/>
        
    

                <div>
                        <Switch>
                            {publicRoutesList.map((routedata, idx) => {
                                return (
                                    routedata.component && (
                                        <Route
                                            key={idx}
                                            path={routedata.path}
                                            exact={routedata.exact}
                                            name={routedata.name}
                                            render={(props) => (
                                                <routedata.component {...props} />
                                            )}    
                                        />
                                    )
                                )
                            })}
                     
                            </Switch>

            </div>
        </div>
    )
}

export default FrontendLayout;