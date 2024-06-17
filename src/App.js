import React, { useRef } from 'react';
import logo from './timecapsule.png';
import gallery from './gallery.png';
import './App.css';

function App() {
  const fileInputRef = useRef(null);

  const uploadImg = () => {
    fileInputRef.current.click();
  }

  return (
    <div className="container">
      <img src={logo} />

      <div className='box' onClick={uploadImg} > 
        <div>
          <img src={gallery} />
          <p>이미지 업로드</p>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(event) => {
          console.log(event.target.files[0]);
          alert("이미지 업로드가 완료되었습니다");
        }}
      />

      <div className='button'>
        이미지 적용
      </div>

    </div>
  );
}

export default App;