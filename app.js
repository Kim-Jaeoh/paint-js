const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ranges = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const noneInput = document.getElementById("noneInput");
const removeBtn = document.getElementById("jsRemove");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

// 컨버스 조정 및 선 생성
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff"; // canvas 로드 시 canvas 배경색 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // canvas 로드 시 canvas 배경색 크기 설정
ctx.strokeStyle = INITIAL_COLOR; // 모양 주위의 선에 사용할 색상 또는 스타일, 기본값 #000(검정색).
ctx.lineWidth = 2.5; // 선의 두께
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // 하위 경로 목록을 비워 새 경로를 시작, 새로운 경로를 생성하고자 할 때 이 메소드를 호출
    ctx.moveTo(x, y); // 새 하위 경로의 시작점을 (x, y) 좌표로 이동
  } else {
    ctx.lineTo(x, y); // 현재 하위 경로의 마지막 지점을 지정된 (x, y) 좌표에 직선으로 연결
    ctx.stroke(); // 현재 획 스타일로 현재 하위 경로를 획 그음
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleCanvasClick() {
  // filling === true 일 때만
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick); // 우클릭 방지
}

// 컬러 변경
function handleColorClick(event) {
  // event는 밑에 handleSizeClick에서 Array.from으로 반환된 배열들
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  // 유사 배열이므로 Array.from 후 forEach 반복문으로 배열 반환
  Array.from(colors).forEach((color) => color.classList.remove("selected"));
  event.target.classList.add("selected");
}

function handleSizeClick() {}
/* Array.from은 유사 배열 객체를 배열로 얕게 복사함 -> forEach로 반복문 실행하여 배열로 반환
   (유사 배열 객체는 forEach, map, filter, reduce 같은 메소드 사용 불가함으로 Array.from() 사용) */
if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

// 브러쉬 사이즈 변경
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (ranges) {
  ranges.addEventListener("input", handleRangeChange);
}

// 배경색 변경
function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// 저장하기
function handleSaveClick() {
  const image = canvas.toDataURL(); // 캔버스에 그린 그림을 문자열 형태로 변환
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click(); // 가상으로 클릭
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

// 지우기
function handleRemoveClick() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (removeBtn) {
  removeBtn.addEventListener("click", handleRemoveClick);
}
