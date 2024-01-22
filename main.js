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
for (let i = 0; i < 10; i++) {
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

  let kleberPosition = kleber.getBoundingClientRect();

  let kleberLeft = kleberPosition.left;
  let kleberWidth = kleberPosition.width;
  let kleberTotalX = kleberLeft + kleberWidth;

  let kleberTop = kleberPosition.top;
  let kleberHeight = kleberPosition.height;
  let kleberTotalY = kleberTop + kleberHeight;

  for (let e = 0; e < sandPositions.length; e++) {
    if (
      kleberTotalX > sandPositions[e].left &&
      kleberLeft < sandPositions[e].left + sandPositions[e].width &&
      kleberTotalY > sandPositions[e].top &&
      kleberTop < sandPositions[e].top + sandPositions[e].height
    ) {
      kleber.style.display = "none";
    }
  }
}

//CYCLER-MOVEMENT
function move(
  toRight,
  toLeft,
  toTop,
  toBottom,
  posR1,
  posR2,
  posL1,
  posL2,
  posT1,
  posT2,
  posB1,
  posB2,
  intTime1,
  intTime2
) {
  //MOVEMENT
  setInterval(() => {
    document.getElementById(toRight).style.top = posR1;
    document.getElementById(toLeft).style.top = posL1;
    document.getElementById(toTop).style.right = posT1;
    document.getElementById(toBottom).style.right = posB1;
  }, intTime1);

  setInterval(() => {
    document.getElementById(toRight).style.top = posR2;
    document.getElementById(toLeft).style.top = posL2;
    document.getElementById(toTop).style.right = posT2;
    document.getElementById(toBottom).style.right = posB2;
  }, intTime2);
}
move(
  "cyclerToRight",
  "cyclerToLeft",
  "cyclerToTop",
  "cyclerToBottom",
  "65.5%",
  "37%",
  "85%",
  "0",
  "25%",
  "93.5%",
  "30%",
  "30%",
  15000,
  30000
);

//CHECK
let checkInterval = setInterval(check, 100);
function check() {
  let autoPosition = auto.getBoundingClientRect();
  let autoLeft = autoPosition.left;
  let autoTop = autoPosition.top;
  let autoWidth = autoPosition.width;
  let autoHeight = autoPosition.height;
  let autoTotalX = autoLeft + autoWidth;
  let autoTotalY = autoTop + autoHeight;
  // SCREEN LIMITS
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

  // ENTERING ON SAND
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

      clearInterval(autoMovInt);
      clearInterval(checkInterval);
      isKeyFree = false;
      break;
    }
  }
}
