import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import useFetch from './hooks/useFetch';
import Icon from './components/Icon';
import { NavLink, Route } from 'react-router-dom';
import Table from './views/Table';
import Row from './views/Row';

function App() {
  const [theme, setTheme] = useState('light');
  const { data, loading } = useFetch('/api/tables');
  return loading || !data ? <div></div> : (
    <div className={`App ${theme}`}>
      <nav className="hs-nav">
        <header className="hs-nav-menu">
          <h1>HubDB Admin</h1>
        </header>
        <div className="hs-nav-body">
          <ul className="hs-nav-list">
            <li className="hs-nav-list-h">Tables</li>
            {data.map(({ name, icon, id }) => (
              <li key={id} className="hs-nav-list-item">
                <NavLink activeClassName="active" to={`/tables/${id}`}>
                  {/*<Icon icon={icon}></Icon>*/}
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main>
        <Route path="/tables/:tableId/rows/:rowId" component={Row} />
        <Route exact path="/tables/:tableId" component={Table} />
      </main>
    </div>
  );
}


/*

  
       
        
*/
export default App;
