//AUTO
let auto = document.getElementById("auto");
let autoImg = document.getElementById("auto-img");

let autoPosition = auto.getBoundingClientRect();
let autoLeft = autoPosition.left;
let autoTop = autoPosition.top;
let autoTotalX = autoLeft + autoPosition.width;
let autoTotalY = autoTop + autoPosition.height;

let isKeyFree = true;

let autoMovInt;
let speed = 30;
let distance = 5;

//KEY-DIRECTION-MOVEMENT
document.addEventListener("keydown", (event) => {
  if (isKeyFree === true) {
    clearInterval(autoMovInt);
    let keyPressed = event.key;
    switch (keyPressed) {
      case "ArrowRight":
        auto.style.transform = "rotate(0)";
        autoMovInt = setInterval(() => {
          auto.style.left = autoLeft + distance + "px";
          autoLeft += distance;
        }, speed);
        break;
      case "ArrowLeft":
        auto.style.transform = "rotate(0)";
        autoMovInt = setInterval(() => {
          auto.style.left = autoLeft - distance + "px";
          autoLeft -= distance;
        }, speed);
        break;
      case "ArrowDown":
        auto.style.transform = "rotate(90deg)";
        autoMovInt = setInterval(() => {
          auto.style.top = autoTop + distance + "px";
          autoTop += distance;
        }, speed);
        break;
      case "ArrowUp":
        auto.style.transform = "rotate(-90deg)";
        autoMovInt = setInterval(() => {
          auto.style.top = autoTop - distance + "px";
          autoTop -= distance;
        }, speed);
        break;
    }
  }
});

//SAND
let sand = document.getElementsByClassName("sand");
let sandArray = Array.from(sand);
let sandPositions = [];
sandArray.forEach((element) => {
  sandPositions.push(element.getBoundingClientRect());
});

// KLEBER
let kleberPosition;
let kleberPositionArray = [];
for (let i = 0; i < 20; i++) {
  let kleber = document.createElement("div");
  document.getElementById("container").appendChild(kleber);
  kleber.setAttribute("class", `kleber kleber-${i}`);

  let kleberSizes = kleber.getBoundingClientRect();

  let rondomNrLeft = Math.floor(
    Math.random() * (window.innerWidth - kleberSizes.width - 0 + 1)
  );
  let rondomNrTop = Math.floor(
    Math.random() * (window.innerHeight - kleberSizes.height - 0 + 1)
  );

  kleber.style.left = `${rondomNrLeft}px`;
  kleber.style.top = `${rondomNrTop}px`;

  kleberPosition = kleber.getBoundingClientRect();

  let kleberLeft = kleberPosition.left;
  let kleberWidth = kleberPosition.width;
  let kleberTotalX = kleberLeft + kleberWidth;

  let kleberTop = kleberPosition.top;
  let kleberHeight = kleberPosition.height;
  let kleberTotalY = kleberTop + kleberHeight;

  //---- hide kleber
  for (let e = 0; e < sandPositions.length; e++) {
    if (
      kleberTotalX > sandPositions[e].left &&
      kleberLeft < sandPositions[e].left + sandPositions[e].width &&
      kleberTotalY > sandPositions[e].top &&
      kleberTop < sandPositions[e].top + sandPositions[e].height
    ) {
      kleber.remove();
    }
  }
}

//GET THE POSITIONS OF THE REST OF KLEBERS ARE NOT HIDDEN
let kleber = document.getElementsByClassName("kleber");
let kleberArray = Array.from(kleber);
kleberArray.forEach((element) => {
  kleberPositionArray.push(element.getBoundingClientRect());
});

//CYCLER-MOVEMENT
function move(toRight, toLeft, toTop, toBottom, posR, posL, posT, posB) {
  document.getElementById(toRight).style.top = posR;
  document.getElementById(toLeft).style.top = posL;
  document.getElementById(toTop).style.right = posT;
  document.getElementById(toBottom).style.right = posB;
}

//CHECK
let checkInterval = setInterval(check, 10);
function check() {
  let autoPosition = auto.getBoundingClientRect();
  let autoLeft = autoPosition.left;
  let autoTop = autoPosition.top;
  let autoWidth = autoPosition.width;
  let autoHeight = autoPosition.height;
  let autoTotalX = autoLeft + autoWidth;
  let autoTotalY = autoTop + autoHeight;
  // ----screen limits
  if (
    autoTop < 0 ||
    autoTop > window.innerHeight ||
    autoLeft < 0 ||
    autoLeft > window.innerWidth
  ) {
    document.getElementById("crash").style.display = "flex";
    clearInterval(autoMovInt);
    return;
  }
  // ----entering on sand
  for (let i = 0; i < sandPositions.length; i++) {
    if (
      autoTotalX > sandPositions[i].left &&
      autoLeft < sandPositions[i].left + sandPositions[i].width &&
      autoTotalY > sandPositions[i].top &&
      autoTop < sandPositions[i].top + sandPositions[i].height
    ) {
      document.getElementById("crash").style.display = "flex";
      document.getElementById("sign").style.display = "none";
      document.getElementById("warning").style.display = "block";
      document.getElementById("hit").setAttribute("class", "hit");

      clearInterval(autoMovInt);
      clearInterval(checkInterval);
      isKeyFree = false;
      break;
    }
  }
  // ----crash with kleber
  kleberPositionArray.forEach((kleber) => {
    if (
      autoTotalX > kleber.left &&
      autoLeft < kleber.left + kleber.width &&
      autoTotalY > kleber.top &&
      autoTop < kleber.top + kleber.height
    ) {
      crash();
    }
  });
  // ----crash with cycler
  let cycler = document.getElementsByClassName("cycler");
  let cyclerArray = Array.from(cycler);
  let cyclerPositionsArray = [];

  cyclerArray.forEach((element) => {
    cyclerPositionsArray.push(element.getBoundingClientRect());
  });

  for (let i = 0; i < cyclerPositionsArray.length; i++) {
    if (
      autoTotalX > cyclerPositionsArray[i].left &&
      autoLeft < cyclerPositionsArray[i].left + cyclerPositionsArray[i].width &&
      autoTotalY > cyclerPositionsArray[i].top &&
      autoTop < cyclerPositionsArray[i].top + cyclerPositionsArray[i].height
    ) {
      crash("cycler", cyclerArray[i]);
    }
  }
}

//CRASH
const crash = (input1, input2) => {
  clearInterval(autoMovInt);
  clearInterval(checkInterval);

  setTimeout(warning, 1500);

  function warning() {
    document.getElementById("crash").style.display = "flex";
    document.getElementById("sign").style.display = "none";
    document.getElementById("warning").style.display = "block";
  }

  document.getElementById("hit").setAttribute("class", "hit");

  isKeyFree = false;

  if (input1 === "cycler") {
    input2.style.animationPlayState = "paused";
    document.getElementById("hit").setAttribute("class", "hit");
  }
};
