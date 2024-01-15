//AUTO
let auto = document.getElementById("auto");
let autoImg = document.getElementById("auto-img");
let autoPosition = auto.getBoundingClientRect();
let autoLeft = autoPosition.left;
let autoTop = autoPosition.top;
let autoTotalX = autoLeft + autoPosition.width;
let autoTotalY = autoTop + autoPosition.height;
let autoMovInt;
let speed = 30;
let distance = 5;

//KEY-DIRECTION-MOVEMENT
document.addEventListener("keydown", (event) => {
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
});

//SAND
let sand = document.getElementsByClassName("sand");
let sandArray = Array.from(sand);
let sandPosition = [];
sandArray.forEach((element) => {
  sandPosition.push(element.getBoundingClientRect());
});

// KLEBER
for (let i = 0; i < 30; i++) {
  let kleber = document.createElement("div");
  document.getElementById("container").appendChild(kleber);
  kleber.setAttribute("class", `kleber kleber-${i}`);

  let kleberPosition = kleber.getBoundingClientRect();

  let rondomNrLeft = Math.floor(
    Math.random() * (window.innerWidth - kleberPosition.width - 0 + 1)
  );
  let rondomNrTop = Math.floor(
    Math.random() * (window.innerHeight - kleberPosition.height - 0 + 1)
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

  if (
    //SAND1 - HIDE KLEBER
    (kleberTotalX > sandPosition[0].left &&
      kleberLeft < sandPosition[0].left + sandPosition[0].width &&
      kleberTotalY > sandPosition[0].top &&
      kleberTop < sandPosition[0].top + sandPosition[0].height) ||
    //SAND2 - HIDE KLEBER
    (kleberTotalX > sandPosition[1].left &&
      kleberLeft < sandPosition[1].left + sandPosition[1].width &&
      kleberTotalY > sandPosition[1].top &&
      kleberTop < sandPosition[1].top + sandPosition[1].height) ||
    //SAND3 - HIDE KLEBER
    (kleberTotalX > sandPosition[2].left &&
      kleberLeft < sandPosition[2].left + sandPosition[2].width &&
      kleberTotalY > sandPosition[2].top &&
      kleberTop < sandPosition[2].top + sandPosition[2].height) ||
    //SAND4 - HIDE KLEBER
    (kleberTotalX > sandPosition[3].left &&
      kleberLeft < sandPosition[3].left + sandPosition[3].width &&
      kleberTotalY > sandPosition[3].top &&
      kleberTop < sandPosition[3].top + sandPosition[3].height) ||
    //SAND5 - HIDE KLEBER
    (kleberTotalX > sandPosition[4].left &&
      kleberLeft < sandPosition[4].left + sandPosition[4].width &&
      kleberTotalY > sandPosition[4].top &&
      kleberTop < sandPosition[4].top + sandPosition[4].height) ||
    //SAND6 - HIDE KLEBER
    (kleberTotalX > sandPosition[5].left &&
      kleberLeft < sandPosition[5].left + sandPosition[5].width &&
      kleberTotalY > sandPosition[5].top &&
      kleberTop < sandPosition[5].top + sandPosition[5].height) ||
    //SAND7 - HIDE KLEBER
    (kleberTotalX > sandPosition[6].left &&
      kleberLeft < sandPosition[6].left + sandPosition[6].width &&
      kleberTop > sandPosition[6].top &&
      kleberTop < sandPosition[6].top + sandPosition[6].height) ||
    //SAND8 - HIDE KLEBER
    (kleberTotalX > sandPosition[7].left &&
      kleberLeft < sandPosition[7].left + sandPosition[7].width &&
      kleberTotalY > sandPosition[7].top &&
      kleberTop < sandPosition[7].top + sandPosition[7].height) ||
    //SAND9 - HIDE KLEBER
    (kleberTotalX > sandPosition[8].left &&
      kleberLeft < sandPosition[8].left + sandPosition[8].width &&
      kleberTotalY > sandPosition[8].top &&
      kleberTop < sandPosition[8].top + sandPosition[8].height)
  ) {
    kleber.style.display = "none";
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
  let autoTotalX = autoLeft + autoPosition.width;
  let autoTotalY = autoTop + autoPosition.height;
  // SCREEN LIMITS
  if (
    autoTop < 0 ||
    autoTop > window.innerHeight ||
    autoLeft < 0 ||
    autoLeft > window.innerWidth
  ) {
    document.getElementById("crash").style.display = "flex";
    clearInterval(autoMovInt);
  }
  // ENTERING ON SAND
  // else if (
  //   //SAND1 - SLOW DOWN
  //   (autoTotalX > sandPosition[0].left &&
  //     autoLeft < sandPosition[0].left + sandPosition[0].width &&
  //     autoTotalY > sandPosition[0].top &&
  //     autoTop < sandPosition[0].top + sandPosition[0].height) ||
  //   //SAND2 - SLOW DOWN
  //   (kleberTotalX > sandPosition[1].left &&
  //     kleberLeft < sandPosition[1].left + sandPosition[1].width &&
  //     kleberTotalY > sandPosition[1].top &&
  //     kleberTop < sandPosition[1].top + sandPosition[1].height) ||
  //   //SAND3 - SLOW DOWN
  //   (kleberTotalX > sandPosition[2].left &&
  //     kleberLeft < sandPosition[2].left + sandPosition[2].width &&
  //     kleberTotalY > sandPosition[2].top &&
  //     kleberTop < sandPosition[2].top + sandPosition[2].height) ||
  //   //SAND4 - SLOW DOWN
  //   (kleberTotalX > sandPosition[3].left &&
  //     kleberLeft < sandPosition[3].left + sandPosition[3].width &&
  //     kleberTotalY > sandPosition[3].top &&
  //     kleberTop < sandPosition[3].top + sandPosition[3].height) ||
  //   //SAND5 - SLOW DOWN
  //   (kleberTotalX > sandPosition[4].left &&
  //     kleberLeft < sandPosition[4].left + sandPosition[4].width &&
  //     kleberTotalY > sandPosition[4].top &&
  //     kleberTop < sandPosition[4].top + sandPosition[4].height) ||
  //   //SAND6 - SLOW DOWN
  //   (kleberTotalX > sandPosition[5].left &&
  //     kleberLeft < sandPosition[5].left + sandPosition[5].width &&
  //     kleberTotalY > sandPosition[5].top &&
  //     kleberTop < sandPosition[5].top + sandPosition[5].height) ||
  //   //SAND7 - SLOW DOWN
  //   (kleberTotalX > sandPosition[6].left &&
  //     kleberLeft < sandPosition[6].left + sandPosition[6].width &&
  //     kleberTop > sandPosition[6].top &&
  //     kleberTop < sandPosition[6].top + sandPosition[6].height) ||
  //   //SAND8 - SLOW DOWN
  //   (kleberTotalX > sandPosition[7].left &&
  //     kleberLeft < sandPosition[7].left + sandPosition[7].width &&
  //     kleberTotalY > sandPosition[7].top &&
  //     kleberTop < sandPosition[7].top + sandPosition[7].height) ||
  //   //SAND9 - SLOW DOWN
  //   (kleberTotalX > sandPosition[8].left &&
  //     kleberLeft < sandPosition[8].left + sandPosition[8].width &&
  //     kleberTotalY > sandPosition[8].top &&
  //     kleberTop < sandPosition[8].top + sandPosition[8].height)
  // ) {
  //   speed = 60;
  // }
}
