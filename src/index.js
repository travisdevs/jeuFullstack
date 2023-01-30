const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

c.fillstyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const map = new Image();
map.onload = () => {
  c.drawImage(map, 0, 0);
};
map.src = "assets/map.png";
