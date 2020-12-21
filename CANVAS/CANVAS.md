## Canvas API

> Canvas API는 JavaScript 와 HTML `<canvas>` 엘리먼트를 통해 그래픽을 그리기 위한 수단을 제공한다. <br> 무엇보다도 애니메이션, 게임, 그래픽, 데이터 시각화, 사진 조작 및 실시간 비디오 처리를 위해 사용됨

- ```html
  <canvas id="my-house" width="300" height="300"></canvas>

  <!-- canvas 태그의 width, height 인라인 속성은 css에서의 width, height와는 다르다.
  1. 인라인 속성은 컨버스의 해상도 (포함된 픽셀 수)를 정의
  2. 인라인 속성을 지정해주지 않으면 default값 300x150
  3. 보통 해상도의 2배 값을 넣어 집적도를 높임 -->

  <script>
    const canvas = document.getElementById("my-house");
    const ctx = canvas.getContext("2d");
    //캔버스의 2D 렌더링 컨텍스트를 가져 오려면 <canvas> 요소에서 getContext ()를 호출하여 '2d'를 인수로 제공합니다.
    //(x, y, width, height)
  </script>
  ```

  #### 그리기

- ```js
  //Rect(사각형)
  context.fillRect(50, 50, 100, 100); // 채워진 사각형
  context.fillStyle = "red"; //선택 색 변경
  context.fillRect(0, 0, 100, 100);
  context.clearRect(80, 80, 50, 50); //지우기
  context.strokeRect(150, 150, 100, 100); // 사각형 윤곽선

  //line(선)
  context.beginPath(); //path를 만듦
  context.moveTo(100, 100); //붓을 그 위치로 옮김
  context.lineTo(300, 200);
  context.stroke(); //선을 칠함
  //context.fill(); //색 채우기
  context.closePath(); //path 닫음

  //원
  //(x, y, 반지름, 호(각도 start), 호 (각도 end), boolean ? 시계축: 반시계축 )

  function toRadian(degree) {
    return (degree * Math.PI) / 180;
  } //radian 각도 함수

  context.beginPath();
  context.arc(300, 200, 50, 0, toRadian(360), false); //호가 기준 (중심점)
  context.stroke();

  context.beginPath();
  context.arc(500, 100, 20, 0, toRadian(360), false);
  context.stroke();
  ```

#### Animation

- reflow()
  - 계산하는 과정
- repaint()

  - 계산된 값으로 그려내는 것

- **requestAnimationFrame()**

  - 브라우저에게 수행하기를 원하는 애니메이션을 알리고, 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다.
  - 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받는다.
  - 다음 리페인트에서 그 다음 프레임을 애니메이트하려면 콜백 루틴이 반드시 스스로 requestAnimationFrame()을 호출해야 한다.

- ```js
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  let xPos = 10;

  //requestAnimation
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
    context.beginPath();
    context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
    context.fill();
    xPos += 3;
    requestAnimationFrame(draw);
  }

  draw();
  ```

- ```js
  //타이밍 조절
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  let xPos = 10;
  let count = 0;

  function draw() {
    count++;

    if (count % 30 === 0) {
      context.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
      context.beginPath();
      context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
      context.fill();
      xPos += 3;
    }
    requestAnimationFrame(draw);
  }

  draw();
  ```

#### 애니메이션 정지

- ```js
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  let xPos = 10;
  let count = 0;
  let timerId;

  function draw() {
    count++;

    context.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
    context.beginPath();
    context.arc(xPos, 150, 10, 0, Math.PI * 2, false);
    context.fill();
    xPos += 3;

    /* if (xPos >= canvas.width - 10 {
    return;  
    requestAnimationFrame이 실행하기전에 리턴해버리기
  })
  */
    timerId = requestAnimationFrame(draw);

    if (xPos >= canvas.width - 10) {
      cancelAnimationFrame(timerId);
      //timerId를 이용해서 cancleAnimationFrame 사용
    }
  }
  ```

### 이미지

- ```js
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");

  const imgElem = new Image(); //이미지 객체 생성
  imgElem.src = "assets/ilbuni_1.png";
  imgElem.addEventListener("load", () => {
    //이미지가 로드된 후
    context.drawImage(imgElem, 50, 50);
    //drawImage(image, dx, dy)

    context.drawImage(imgElem, 50, 50, 70, 70);
    //drawImage(image, dx, dy, dWidth, dHeight);

    context.drawImage(imgElem, 100, 100, 200, 200, 0, 0, 100, 100);
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); 소스이미지의 일부분 가져오기
  });
  ```

- ```html
  <canvas class="canvas" width="500" height="300"> </canvas>
  <div class="control">
    <button class="color-btn" data-type="color" data-color="black"></button>
    <button class="color-btn" data-type="color" data-color="red"></button>
    <button class="color-btn" data-type="color" data-color="green"></button>
    <button class="color-btn" data-type="color" data-color="blue"></button>
    <button class="image-btn" data-type="image"></button>
  </div>

  <script>
    const canvas = document.querySelector(".canvas");
    const context = canvas.getContext("2d");
    const control = document.querySelector(".control");
    let drawingMode; //true일때만 그리기
    let brush = "color"; // 'color', 'image'
    let colorVal = "black";

    const imgElem = new Image();
    imgElem.src = "assets/ilbuni_1.png";

    function downHandler() {
      drawingMode = true;
    }

    function upHandler() {
      drawingMode = false;
    }

    function moveHandler(e) {
      if (!drawingMode) return;

      switch (brush) {
        case "color":
          context.beginPath();
          context.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2, false);
          //clientX, clientY는  브라우저 왼쪽 위를 기준으로 잡음
          //layerX, layerY는 캔버스 기준으로 위치를 잡음
          context.fill();
          break;
        case "image":
          context.drawImage(imgElem, e.layerX, e.layerY, 50, 50);
          break;
      }
    }

    function setColor(event) {
      brush = event.target.getAttribute("data-type");
      colorVal = event.target.getAttribute("data-color");
      context.fillStyle = colorVal;
    }

    canvas.addEventListener("mousedown", downHandler);
    canvas.addEventListener("mousemove", moveHandler);
    canvas.addEventListener("mouseup", upHandler);
    control.addEventListener("click", setColor);
  </script>
  ```

#### 이미지 저장

> toDateURL() 캔버스이미지를 img url로 저장

- ```js
  const url = canvas.toDataURL("image/png"); //이미지 저장시킴
  //canvas.toDataURL(type, encoderOptions);
  const imgElem = new Image();
  imgElem.src = url;
  resultImg.appendChild(imgElem);
  console.log(url);
  ```

#### 비디오

- canvas에서 비디오를 쓰는 이유
  - canvas는 기본적으로 pixel 단위로 조작 가능해서 비디오를 일반 HTML에서 불가능한 조작이 가능

#### 비디오 영상에 자막(글씨) 입히기

- ```js
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 50px serif";
  ctx.fillStyle = "red";

  const videoElem = document.querySelector(".video");
  videoElem.addEventListener("canplaythrough", render);

  const message = [
    { time: 1, message: "1 zz", x: 100, y: 100 },
    { time: 2, message: "2 gg", x: 300, y: 300 },
    { time: 3, message: "3 vv", x: 400, y: 200 },
  ];

  function render() {
    ctx.drawImage(videoElem, 0, 0, 600, 400);
    //drawImage에 넣을수 있는것 1,이미지 2,비디오 3,다른 캔버스

    for (let i = 0; i < message.length; i++) {
      if (videoElem.currentTime > message[i].time) {
        ctx.fillText(message[i].message, message[i].x, message[i].y);
      }
    }

    requestAnimationFrame(render);
  }
  ```

#### 비디오 픽셀 조작하기

- ```js
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  const btnsElem = document.querySelector(".btns");

  let imageData;
  const particles = [];
  let particle;
  let colorValue;
  let leng;

  const videoElem = document.querySelector(".video");
  videoElem.addEventListener("canplaythrough", render);

  function render() {
    ctx.drawImage(videoElem, 0, 0, 600, 400);
    //drawImage에 넣을수 있는것 1,이미지 2,비디오 3,다른 캔버스
    imageData = ctx.getImageData(0, 0, 600, 400);
    //getImageData() 각 픽셀의 색상정보를 가져옴
    leng = imageData.data.length / 4; //leng === 픽셀수

    for (let i = 0; i < leng; i++) {
      switch (colorValue) {
        case "red":
          imageData.data[i * 4 + 0] = 255;
          break;
        case "green":
          imageData.data[i * 4 + 1] = 255;
          break;
        case "blue":
          imageData.data[i * 4 + 2] = 255;
          break;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    //바뀐 이미지데이터로 ㄱㄱ
    requestAnimationFrame(render);
  }

  btnsElem.addEventListener("click", function (e) {
    colorValue = e.target.getAttribute("data-color");
  });
  ```

### transform

>

- 더 복잡한 그림(drawings)을 그리기 시작하려면 반드시 있어야 하는 메소드
  - save() : canvas의 모든 상태를 저장한다
  - restore() : 가장 최근에 저장된 canvas 상태를 복원한다
- Canvas 상태는 스택(stack)에 쌓인다.

  - `save()` 메소드가 호출될 때마다 현재 drawing 상태가 스택 위로 푸시된다.

- ```js
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillRect(100, 100, 200, 200);
  ctx.fillStyle = "orange";
  ctx.fillRect(150, 150, 200, 200);

  ctx.save(); //현재 상태 저장하기

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.restore(); //이전 상태 복원하기

  ctx.beginPath();
  ctx.arc(300, 300, 20, 0, Math.PI * 2, false);
  ctx.fill();
  ```

#### canvas는 무조건 기준점이 왼쪽 상단(0, 0)

- ```js
    unction draw() {
      //  ctx.clearRect(0, 0, canvas.width, canvas.height);
      direction = direction * -1;
      ctx.save(); //기준점이 transalte 되기전 상태를 저장
      ctx.strokeStyle = getRandomColor();
      ctx.setTransform(1,0,0,1,0,0);
      //setTransform(변환행렬): 변환 초기화
      ctx.translate(250, 250); //기준점을 이동
      ctx.scale(scaleValue, scaleValue);
      ctx.rotate(toRadian(rotationValue*direction));

      ctx.strokeRect(-50, -50, 100, 100);//변환이 끝난다음에 그리기
      ctx.restore();

      scaleValue -= 0.01;
      rotationValue += 1; //canvas에서 각도는 라디안값으로 해야함

      requestAnimationFrame(draw);
  }
  ```

### interaction

- ```js
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = canvas.width;
  const CANVAS_HEIGHT = canvas.height;
  const boxes = [];
  const mousePos = { x: 0, y: 0 };
  let selectedBox;
  ctx.font = "bold 30px sans-serif";

  class Box {
    constructor(index, x, y, speed) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.width = 100;
      this.height = 100;
      this.draw();
    }

    draw() {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(this.x, this.y, 100, 100);
      ctx.fillStyle = "#fff";
      ctx.fillText(this.index, this.x + 30, this.y + 30);
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let box of boxes) {
      box.x += box.speed;
      if (box.x > canvas.width) {
        box.x = -box.width;
      }
      box.draw();
    }
    requestAnimationFrame(render);
  }

  let tempX, tempY;

  for (let i = 0; i < 10; i++) {
    tempX = Math.random() * CANVAS_WIDTH * 0.8;
    tempY = Math.random() * CANVAS_HEIGHT * 0.8;
    tempSpeed = Math.random() * 4 + 1;
    boxes.push(new Box(i, tempX, tempY, tempSpeed));
  }

  canvas.addEventListener("click", (e) => {
    mousePos.x = e.layerX;
    mousePos.y = e.layerY;

    let box;
    for (let i = 0; i < boxes.length; i++) {
      box = boxes[i];
      if (mousePos.x > box.x && mousePos.x < box.x + box.width && mousePos.y > box.y && mousePos.y < box.y + box.height) {
        selectedBox = box;
      }
    }
    if (selectedBox) {
      console.log(selectedBox.index);
      selectedBox = null;
    }
  });

  render();
  ```
