//KEYS
let areKeysFree = true;
let isEnterKeyFree = false;

//car
let car = document.getElementById("auto");
let carImg = document.getElementById("auto-img");

let carPosition = car.getBoundingClientRect();
let carLeft = carPosition.left;
let carTop = carPosition.top;
let carLeftAndWidth = carLeft + carPosition.width;
let carTopAndHeight = carTop + carPosition.height;

let carMovInt;
let carSpeed = 25;
let distance = 5;

//KLEBER
let kleberPos;
let kleberPosArray = [];

//KEY-DIRECTION-MOVEMENT
document.addEventListener("keydown", (event) => {
  if (areKeysFree === true) {
    clearInterval(carMovInt);
    let keyPressed = event.key;
    switch (keyPressed) {
      case "ArrowRight":
        car.style.transform = "rotate(0)";
        carMovInt = setInterval(() => {
          car.style.left = carLeft + distance + "px";
          carLeft += distance;
          document.getElementById("hint").style.display = "none";
        }, carSpeed);
        break;
      case "ArrowLeft":
        car.style.transform = "rotate(0)";
        carMovInt = setInterval(() => {
          car.style.left = carLeft - distance + "px";
          carLeft -= distance;
          document.getElementById("hint").style.display = "none";
        }, carSpeed);
        break;
      case "ArrowDown":
        car.style.transform = "rotate(90deg)";
        carMovInt = setInterval(() => {
          car.style.top = carTop + distance + "px";
          carTop += distance;
          document.getElementById("hint").style.display = "none";
        }, carSpeed);
        break;
      case "ArrowUp":
        car.style.transform = "rotate(-90deg)";
        carMovInt = setInterval(() => {
          car.style.top = carTop - distance + "px";
          carTop -= distance;
          document.getElementById("hint").style.display = "none";
        }, carSpeed);
        break;
      case "Enter":
        location.reload();
        break;
    }
  }
});

document.addEventListener("keydown", (event) => {
  let keyPressed = event.key;
  if (keyPressed === "Enter" && isEnterKeyFree === true) {
    location.reload();
  }
});

//GET FIELD POSITIONS
let field = document.getElementsByClassName("sand");
let fieldArray = Array.from(field);
let fieldPosArray = [];
fieldArray.forEach((element) => {
  fieldPosArray.push(element.getBoundingClientRect());
});

//CREATE KLEBERS AND GET POSITIONS
for (let i = 0; i < 40; i++) {
  let kleber = document.createElement("div");
  document.getElementById("container").appendChild(kleber);
  kleber.setAttribute("class", `obstacle kleber kleber-${i}`);
  let kleberSizes = kleber.getBoundingClientRect();
  let rondomNr1 = Math.floor(
    Math.random() * (window.innerWidth - kleberSizes.width - 0 + 1) + 0
  );
  let rondomNr2 = Math.floor(
    Math.random() * (window.innerHeight - kleberSizes.height - 100 + 1) + 100
  );

  kleber.style.left = `${rondomNr1}px`;
  kleber.style.top = `${rondomNr2}px`;

  kleberPos = kleber.getBoundingClientRect();
  let kleberLeft = kleberPos.left;
  let kleberWidth = kleberPos.width;
  let kleberLeftAndWidth = kleberLeft + kleberWidth;
  let kleberTop = kleberPos.top;
  let kleberHeight = kleberPos.height;
  let kleberTopAndHeight = kleberTop + kleberHeight;

  //---- hide klebers on field
  for (let e = 0; e < fieldPosArray.length; e++) {
    if (
      kleberLeftAndWidth > fieldPosArray[e].left &&
      kleberLeft < fieldPosArray[e].left + fieldPosArray[e].width &&
      kleberTopAndHeight > fieldPosArray[e].top &&
      kleberTop < fieldPosArray[e].top + fieldPosArray[e].height
    ) {
      kleber.remove();
    }
  }
}

//GET THE POSITIONS OF THE REST OF KLEBERS ARE NOT HIDDEN
let kleber = document.getElementsByClassName("kleber");
let kleberArray = Array.from(kleber);
kleberArray.forEach((element) => {
  kleberPosArray.push(element.getBoundingClientRect());
});

//CHECK
let checkInterval = setInterval(check, 10);
function check() {
  let carPosition = car.getBoundingClientRect();
  let carLeft = carPosition.left;
  let carTop = carPosition.top;
  let carWidth = carPosition.width;
  let carHeight = carPosition.height;
  let carLeftAndWidth = carLeft + carWidth;
  let carTopAndHeight = carTop + carHeight;
  // ----screen limits
  if (
    carTop + carHeight / 2 < 0 ||
    carTop + carHeight / 2 > window.innerHeight ||
    carLeft + carWidth / 2 < 0 ||
    carLeft + carWidth / 2 > window.innerWidth
  ) {
    document.getElementById("background-crash").style.display = "flex";
    document.getElementById("hint").style.display = "none";
    clearInterval(carMovInt);
    clearInterval(checkInterval);
    areKeysFree = false;
    isEnterKeyFree = true;
    return;
  }
  // ----entering on field
  for (let i = 0; i < fieldPosArray.length; i++) {
    if (
      carLeftAndWidth - carWidth / 2 > fieldPosArray[i].left &&
      carLeft + carWidth / 2 < fieldPosArray[i].left + fieldPosArray[i].width &&
      carTopAndHeight - carHeight / 2 > fieldPosArray[i].top &&
      carTop + carHeight / 2 < fieldPosArray[i].top + fieldPosArray[i].height
    ) {
      crash();
      break;
    }
  }
  // ----accident
  let obstacles = document.getElementsByClassName("obstacle");
  let obstaclesArray = Array.from(obstacles);
  let obstaclesPosArray = [];
  obstaclesArray.forEach((element) => {
    obstaclesPosArray.push(element.getBoundingClientRect());
  });
  for (let i = 0; i < obstaclesPosArray.length; i++) {
    if (
      carLeftAndWidth - carWidth / 4 > obstaclesPosArray[i].left &&
      carLeft + carWidth / 4 <
        obstaclesPosArray[i].left + obstaclesPosArray[i].width &&
      carTopAndHeight - carHeight / 4 > obstaclesPosArray[i].top &&
      carTop + carHeight / 4 <
        obstaclesPosArray[i].top + obstaclesPosArray[i].height
    ) {
      crash();
    }
  }
  // ----success
  let home = document.getElementById("info");
  let homePos = home.getBoundingClientRect();
  if (
    carLeft > homePos.left &&
    carLeftAndWidth < homePos.left + homePos.width &&
    carTop > homePos.top &&
    carTopAndHeight < homePos.top + homePos.height
  ) {
    success();
  }
}

//CRASH-FUNCTION
const crash = (input) => {
  clearInterval(carMovInt);
  clearInterval(checkInterval);
  setTimeout(warning, 1000);
  function warning() {
    document.getElementById("background-crash").style.display = "flex";
    document.getElementById("sign").style.display = "none";
    document.getElementById("warning").style.display = "block";
  }
  document.getElementById("hit").setAttribute("class", "hit");
  document.getElementById("hint").style.display = "none";

  stopAnimation();

  areKeysFree = false;
  isEnterKeyFree = true;
};

const success = () => {
  clearInterval(carMovInt);
  clearInterval(checkInterval);
  document.getElementById("background-success").style.display = "flex";

  stopAnimation();

  areKeysFree = false;
  isEnterKeyFree = true;
};

function stopAnimation() {
  document.getElementById("cyclerToRight").style.animationPlayState = "paused";
  document.getElementById("cyclerToLeft").style.animationPlayState = "paused";
  document.getElementById("cyclerToTop").style.animationPlayState = "paused";
  document.getElementById("cyclerToBottom").style.animationPlayState = "paused";
  document.getElementById("krankenwagen").style.animationPlayState = "paused";
  document.getElementById("polizei").style.animationPlayState = "paused";
}
