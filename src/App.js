import React, { useRef } from 'react';
import logo from './timecapsule.png';
import gallery from './gallery.png';
import './App.css';
import axios from 'axios';

function App() {
  const fileInputRef = useRef(null);

  const uploadImg = () => {
    fileInputRef.current.click();
  }

  const randomImg = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    console.log(selectedImage);
  }

  const images = [
    '../public/images/beluga.jpg',
    '../public/images/cat.jpeg',
    '../public/images/dog.jpeg',
    '../public/images/duck.jpg',
    '../public/images/lion.jpeg',
    '../public/images/quokka.jpeg',
    '../public/images/redpanda.jpeg',
  ]

  const applyImg = async () => {
    if (fileInputRef.current.files.length === 0) {
      alert('이미지를 업로드 해주세요!');
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('capsuleImage', file);

    try {
      const res = await axios.post('http://52.78.95.224:3001/letters/capsule', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.status === 200) {
        console.log("이미지 업로드 성공");
      }
    } catch (error) {
      console.error("에러 발생", error);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value.name);
    };
  }

  return (
    <div className="container">
      <img src={logo} alt='' />

      <div className='box'> 
        <div onClick={uploadImg}>
          <img src={gallery} alt='' />
          <p>이미지 업로드</p>
        </div>
        <div onClick={randomImg}>
          <p>랜덤 이미지</p>
        </div>
      </div>

      <input
        type="file"
        accept="image/jpeg"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(event) => {
          alert("이미지 업로드가 완료되었습니다. 이미지 적용 버튼을 눌러주세요!");
        }}
      />

      <div className='button' onClick={applyImg}>
        이미지 적용
      </div>

    </div>
  );
}

export default App;