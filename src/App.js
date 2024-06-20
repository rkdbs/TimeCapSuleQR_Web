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
    setSelectedImage(null);
  };

  const applyImg = async () => {
    if (!hasClicked) {
      alert("이미지를 업로드해주세요!");
      return;
    }

    const formData = new FormData();

    if (selectedImage) {
      formData.append("imageUrl", selectedImage);
    } else {
      const file = fileInputRef.current.files[0];
      formData.append("capsuleImage", file);
    }

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
          <p>이미지 업로드</p>
        </div>
      </div>

      <input
        type="file"
        accept="image/jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event.target.files[0].name);
          setHasClicked(true);
          setSelectedImage(null);
        }}
      />

      <div className="button" onClick={applyImg}>
        이미지 적용
      </div>
    </div>
  );
}

export default App;
