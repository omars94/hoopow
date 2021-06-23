import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import SideBar from './components/sidebar';

function App() {
  const [BDList, setBDList] = useState([
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 5, 3, 2, 2, 2, 3, 4,
  ]);
  axios({
    url: 'https://api.jsonbin.io/b/60d15d6c8ea8ec25bd12c083',
    method: 'get',
    headers: {},
  })
    .then((response) => {
      console.log(response);
      setBDList(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  // axios({
  //   url: 'https://d1628i5d9ecuu5.cloudfront.net/images/MSHOW_01_ADDITION_01.jpg',
  //   method: 'get',
  //   headers: {
  //     // 'secret-key':
  //     //   '$2b$10$CpVUDj0M04SrpvTHOlz0Kup12rM2KFWDtuEf.wpY5HwYB6BBSrfCS',
  //   },
  // })
  //   .then((r) => console.log(r))
  //   .catch((e) => console.error(e));

  return (
    <html>
      <body>
        <div className="App">
          <SideBar />
          <div className="BDList-container" id="scroll-container">
            {BDList.map((BD, index) => (
              <div key={index} className="BD-container">
                <img
                  src={
                    'https://d1628i5d9ecuu5.cloudfront.net/images/MSHOW_01_ADDITION_01.jpg'
                  }
                  alt="muslim show"
                />
                <span className="bold date">
                  Lundi 12 -<span className="bold title"> Trop tôt ?</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;
