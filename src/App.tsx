import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BDPage from './pages/BDPage';
import { BD_List_TYPE } from './types';

function App() {
  const [BDList, setBDList] = useState<BD_List_TYPE>([]);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      if (triggered) return;
      axios({
        url: 'https://api.jsonbin.io/b/60d013655ed58625fd1592ef',
        method: 'get',
        headers: {
          'secret-key':
            '$2b$10$CpVUDj0M04SrpvTHOlz0Kup12rM2KFWDtuEf.wpY5HwYB6BBSrfCS',
        },
      })
        .then((response) => {
          setTriggered(true);
          response.data = response.data.sort(
            (a: { lockedTimestamp: number }, b: { lockedTimestamp: number }) =>
              b.lockedTimestamp - a.lockedTimestamp
          );
          setBDList(response.data);
        })
        .catch((e) => {
          console.log(e);
          setTriggered(true);
        });
    };
    fetchData();
    setTriggered(true);
  }, [triggered]);
  return (
    <html>
      <Router>
        <body>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Home BDList={BDList} />
              </Route>
              <Route path="/BD">
                <BDPage BDList={BDList} />
              </Route>
            </Switch>
          </div>
        </body>
      </Router>
    </html>
  );
}

export default App;
