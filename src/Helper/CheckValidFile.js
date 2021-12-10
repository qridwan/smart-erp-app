import { useState } from "react";

const CheckValideFile = (imageurl) => {
  const [isImage, setIsImage] = useState(true);
  const image = new Image();
  image.onload = function () {
    if (this.width > 0) {
      setIsImage(true);
    }
  };
  image.onerror = function () {
    setIsImage(false);
  };
  image.src = imageurl;
  return { isImage };
};

export default CheckValideFile;
