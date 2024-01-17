function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

function loadModalImages(imgList) {
  for (let i = 0; i < imgList.length; i++) {
    preloadImage(imgList[i]);
  }
}

export { loadModalImages };
