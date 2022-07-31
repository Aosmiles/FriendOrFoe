const plane = document.querySelector('.plane')
const container = document.querySelector(".plane")

let planeImageDir = "images/allies/"

let randomIndex = Math.floor(Math.random() * 18) + 1;

let planeImageSrc = `${planeImageDir}allies_plane_${randomIndex.toString().padStart(3, "0")}.jpg`

console.log(planeImageSrc)

const imageElement = document.createElement('img');
imageElement.src = planeImageSrc;
imageElement.style.transform = 'rotate(90deg)'
plane.append(imageElement);

