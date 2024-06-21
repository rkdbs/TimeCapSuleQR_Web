import React, { useRef, useState } from "react";
import logo from "./timecapsule.png";
import gallery from "./gallery.png";
// import random from "./random.png";
import "./App.css";
import axios from "axios";

function App() {
  const fileInputRef = useRef(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImg = () => {
    fileInputRef.current.click();
    setHasClicked(true);
  };

  const applyImg = async () => {
    if (!selectedImage) {
      alert("이미지를 업로드해주세요!");
      return;
    }

    console.log("Selected Image:", selectedImage);

    const formData = new FormData();

    formData.append("capsuleImage", selectedImage);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/letters/capsule`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log("이미지 업로드 성공");
        alert(
          "이미지가 전송되었습니다! 데스크탑에서 이미지 적용 버튼을 눌러주세요!"
        );
      }
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="" />

      <div className="box">
        <div onClick={uploadImg}>
          <img src={gallery} alt="" />
          <p>이미지 전송하기</p>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => {
          console.log("Selected file:", event.target.files[0]);
          setHasClicked(true);
          setSelectedImage(event.target.files[0]);
        }}
      />

      <div className="button" onClick={applyImg}>
        이미지 적용
      </div>
    </div>
  );
}

export default App;