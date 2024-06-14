import React from 'react';
import logo from './timecapsule.png';
import gallery from './gallery.png';
import './App.css';

function App() {
  return (
    <div className="container">
      <img src={logo} />

      <div className='box'> 
        <div>
          <img src={gallery} />
          <p>이미지 업로드</p>
        </div>
      </div>

      <div className='button'>
        이미지 적용
      </div>

    </div>
  );
}

export default App;