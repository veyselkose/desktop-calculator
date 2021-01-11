let calculateResult = "0",
  isContinue = false,
  result = document.querySelector(".result"),
  lastResult = document.querySelector(".last-result"),
  isDot = true;

function calculate() {
  try {
    if (
      calculateResult.slice(-1) == "/" ||
      calculateResult.slice(-1) == "+" ||
      calculateResult.slice(-1) == "-" ||
      calculateResult.slice(-1) == "*"
    ) {
      result.innerHTML = calculateResult;
    } else {
      lastResult.innerHTML = calculateResult;
      result.innerHTML = eval(calculateResult);
      calculateResult = eval(calculateResult).toString();
      lastResult.style.visibility = "visible";
      result.style.visibility = "visible";
      isDot = true;
      isContinue = true;
      if (isNaN(eval(calculateResult))) {
        result.innerHTML = "Error";
        calculateResult = "";
      }
      if (eval(calculateResult) == "Infinity") {
        result.innerHTML = "Infinity";
        calculateResult = "";
      }
      if (calculateResult.length >= 15) {
        result.style.justifyContent = "flex-start";
      }
    }
  } catch {
    result.innerHTML = "Invalid Expression";
  }
}
function operatorControl(i) {
  isContinue = "";
  if (
    calculateResult.slice(-1) == "/" ||
    calculateResult.slice(-1) == "+" ||
    calculateResult.slice(-1) == "-" ||
    calculateResult.slice(-1) == "*"
  ) {
    calculateResult = calculateResult.slice(0, -1) + i;
    result.innerHTML = calculateResult;
  } else {
    calculateResult += i;
    result.innerHTML = calculateResult;
    isDot = true;
  }
}
function backspace() {
  calculateResult = calculateResult.slice(0, -1);
  result.innerHTML = calculateResult;
  if (calculateResult == "") {
    calculateResult = "0";
    result.innerHTML = calculateResult;
    isDot = true;
  }
}

function resetcalc() {
  calculateResult = "0";
  result.innerHTML = calculateResult;
  lastResult.style.visibility = "hidden";
  lastResult.innerHTML = calculateResult;
  isDot = true;
}
function numControl(keyNum) {
  if (calculateResult == "0") {
    calculateResult = "";
    calculateResult += keyNum;
    result.innerHTML = calculateResult;
  } else {
    if (isContinue) {
      calculateResult = "";
      calculateResult += keyNum;
      result.innerHTML = calculateResult;
      isContinue = false;
    } else {
      calculateResult += keyNum;
      result.innerHTML = calculateResult;
    }
  }
}
function dotControl() {
  if (isContinue) {
    calculateResult = ".";
    result.innerHTML = calculateResult;
    isContinue = false;
    isDot = false;
  } else if (isDot) {
    calculateResult += ".";
    result.innerHTML = calculateResult;
    isDot = false;
  }
}
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    let keyContent = key.textContent;
    result.style.justifyContent = "flex-end";
    if (keyContent != "=") {
      result.style.visibility = "visible";
      if (keyContent == "×") operatorControl("*");
      else if (keyContent == "÷") operatorControl("/");
      else if (keyContent == "-") operatorControl("-");
      else if (keyContent == "+") operatorControl("+");
      else if (keyContent == ".") dotControl();
      else if (keyContent == "⌫") backspace();
      else if (keyContent == "AC") resetcalc();
      else numControl(keyContent);
    }
    if (keyContent == "=") calculate();
  });
});
document.addEventListener("keydown", (logKey) => {
  result.style.justifyContent = "flex-end";
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((x) => {
    if (x == logKey.key) numControl(logKey.key);
  });
  if (logKey.code == "Enter" || logKey.code == "NumpadEnter") calculate();
  else if (logKey.key == "Backspace" || logKey.key == "Delete") backspace();
  else if (logKey.key == "," || logKey.key == ".") dotControl();
  ["+", "-", "/", "*"].map((x) => {
    if (x == logKey.key) operatorControl(x);
  });
});
