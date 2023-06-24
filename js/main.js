// Вывод в консоль
console.log('readyToGo');

let burger = document.querySelector("#burger-menu");
let navList = document.querySelector("#inline_list");

burger.addEventListener("click", function() {
  navList.classList.toggle("burger-active");
  this.classList.toggle("burger-trans");
})

let t = document.getElementById("logdrgdgo");
console.log(t);
t = document.querySelectorAll("#lgrdgo");
console.log(t);

// TEXT-Editor

//buttons
let colorButton = document.getElementById("color-button"),
    boldButton = document.getElementById("bold-button"),
    italicButton = document.getElementById("italic-button"),
    underlineButton = document.getElementById("underline-button"),
    linkButton = document.getElementById("link-button"),
    centrButton = document.getElementById("centr-button"),
    textInputButton = document.getElementById("text_inputBotton"),
    clearButton = document.getElementById("clear-button");
//fields
let formEditor = document.getElementById("form_editor"),
    textInput = document.getElementById("text_input"),
    textOutput = document.getElementById("text_output");
//tags 
let strong = document.createElement("strong"),
    em = document.createElement("em"),
    span = document.createElement("span"),
    h2 = document.createElement("h2"),
    anchor = document.createElement("a");
    
//Forbidden form submit
formEditor.addEventListener("submit", (e) => {
  e.preventDefault();
})

//Field relationships
textInput.addEventListener("input", function(event) {
  textOutput.innerHTML = event.target.value;
})

//Button events
textInputButton.addEventListener("click", function() {
  alert(textOutput.innerHTML);
})
clearButton.addEventListener("click", function() {
  textOutput.innerHTML = textInput.value = "";
  textInput.focus();
})
colorButton.addEventListener("change", function(e) {
  let colorStr = `color: ${e.target.value}`;
  let [newVal, pos] = fieldEd(`<span style="${colorStr}">`, '</span>');
  render(newVal, pos);
})
boldButton.addEventListener("click", function() {
  let [newVal, pos] = fieldEd('<strong>', '</strong>');
  render(newVal, pos);
})
underlineButton.addEventListener("click", function() {
  let [newVal, pos] = fieldEd('<span style="text-decoration: underline">', '</span>');
  render(newVal, pos);
})
linkButton.addEventListener("click", function() {
  let [newVal, pos] = fieldEd('<a href="#!">', '</a>');
  render(newVal, pos);
})
centrButton.addEventListener("click", function() {
  let [newVal, pos] = fieldEd('<h2 align="center">', '</h2>');
  render(newVal, pos);
})
italicButton.addEventListener("click", function() {
  let [newVal, pos] = fieldEd("<em>", "</em>");
  render(newVal, pos);
})

function fieldEd (tagOpen, tagClose) {
  let cursorStart = textInput.selectionStart,
      cursorEnd = textInput.selectionEnd,
      newVal, 
      pos;
  if (cursorStart == cursorEnd) {
    newVal = textInput.value.slice(0, cursorStart) + tagOpen + tagClose + textInput.value.slice(cursorEnd);
    pos = (textInput.value.slice(0, cursorStart) + tagOpen).length;
  } else {
    newVal = textInput.value.slice(0, cursorStart) + tagOpen + textInput.value.slice(cursorStart, cursorEnd) + tagClose + textInput.value.slice(cursorEnd);
    pos = (textInput.value.slice(0, cursorStart) + tagOpen + textInput.value.slice(cursorStart, cursorEnd)).length;
  }
  return [newVal, pos];
}
function render(newVal, pos) {
  let regExpLinks = /<script|<link|<html|<body|<h1|<img|<header|<head/; //  проверка запрещенных тегов.
  let regExpNotRepitLink = /<(.+)\s?.*>.*<(.+)\s?.*>.*<\/\1>.*<\/\2>/; //проверка на вхождение одного закрытого тега внутри двух парных тегов или две пары одинаковых тегов.
  let pError = document.createElement("p");
  pError.style.position = "fixed";
  pError.style.position = "left: 0";
  pError.style.position = "bottom: -999px";
  pError.style.transition = "all 0.3s";
  pError.style.padding = "12px";
  pError.style.color = "#c71414";
  pError.style.opacity = "0";
  pError.style.backgroundColor = "#121229";
  pError.style.width = "100%";
  if (newVal.match(regExpLinks)) {
    pError.innerText = "Ошибка! Удалите недопустимые теги: <script>,<link>,<html>,<body>,<h1>,<img>,<header>,<head>";
    formEditor.after(pError);
    setTimeout(() => {
      pError.style.position = "bottom: 0";
      pError.style.opacity = "1";
    }, 0);
    setTimeout(() => {
      pError.style.position = "bottom: -999px";
      pError.style.opacity = "0";
    }, 5000);
  } else if (newVal.match(regExpNotRepitLink)) {
    pError.innerText = "Ошибка вложенности тегов!";
    console.log(newVal.match(regExpNotRepitLink));
    formEditor.after(pError);
    setTimeout(() => {
      pError.style.position = "bottom: 0";
      pError.style.opacity = "1";
    }, 0);
    setTimeout(() => {
      pError.style.position = "bottom: -999px";
      pError.style.opacity = "0";
    }, 5000);
  } else {
    console.log(newVal.match(regExpNotRepitLink));
    textInput.value = newVal;
    textOutput.innerHTML = textInput.value;
    textInput.selectionStart = textInput.selectionEnd = pos;
    textInput.focus();
  }
}

let regExpNotRepitLink = /<(.+>).*<(.+>).*<\/\1.*<\/\2/;
let stru = "<ccccvvxcj>vscriptЮ<ccccvvxcj>ролр</ccccvvxcj></ccccvvxcj>";
console.log(stru.match(regExpNotRepitLink));

//Кустарный Ввод
let flagLine = false;
let flagLineOb = false;
let timerId;

document.addEventListener("click", function(e) {
  if (e.target === textOutput.parentNode || e.target === textOutput) {
    if (!flagLineOb) {
      flagLineOb = true;
      timerId = setInterval(function runSetTime() {
        if (flagLine) {
          textOutput.innerHTML = textOutput.innerHTML.slice(0, -1);
          flagLine = false;
        } else {
          textOutput.innerHTML += "|";
          flagLine = true;
        }
      }, 650);
    }
  } else {
    flagLineOb = false;
    clearInterval(timerId);
    if (flagLine) {
      textOutput.innerHTML = textOutput.innerHTML.slice(0, textOutput.innerHTML.length-1);
      flagLine = false;
    }
  }
})

document.addEventListener("keydown", function(e) {
  if (flagLineOb) {
    if (flagLine && (textOutput.innerHTML.slice(textOutput.innerHTML.length - 1) === "|")) {
      textOutput.innerHTML = textOutput.innerHTML.slice(0, textOutput.innerHTML.length-1);
      switch (e.key.toString()) {
        case "Backspace":
          textOutput.innerHTML = textOutput.innerHTML.slice(0, textOutput.innerHTML.length-1);
          break;
        case "Shift":
          break;
        case "<":
          textOutput.innerHTML += '<';
        break;
        case ">":
          textOutput.innerHTML += '>';
        break;
        case "CapsLock":
          break;
        case "Enter":
          textOutput.innerHTML += "<br />";
          break;
        default:
          textOutput.innerHTML += e.key.toString();
          break;
      }
      textOutput.innerHTML += "|";
    } else {
      switch (e.key.toString()) {
        case "Backspace":
          textOutput.innerHTML = textOutput.innerHTML.slice(0, textOutput.innerHTML.length - 1);
          break;
        case "Shift":
          break;
        case "<":
          textOutput.innerHTML += '&lsaquo';
        break;
        case ">":
          textOutput.innerHTML += '&rsaquo';
        break;
        case "CapsLock":
          break;
        case "Enter":
          textOutput.innerHTML += "<br />";
          break;
        default:
          textOutput.innerHTML += e.key.toString();
          break;
      }
    }
  }
})

document.addEventListener("selectstart", function(e) {
  if (e.target === textOutput.parentNode || e.target === textOutput) {
    flagLineOb = false;
    clearInterval(timerId);
    if (flagLine) {
      textOutput.innerHTML = textOutput.innerHTML.slice(0, textOutput.innerHTML.length-1);
      flagLine = false;
    }
    console.log("Helo");
  }
})


//ГЕОМЕТРИЯ

console.log(textOutput.getBoundingClientRect()); //геометрия элемента
console.log(textOutput.getClientRects()); //все геометрии элемента
console.log(document.elementFromPoint(34,623)); //элемент в точке
//Скролл
console.log(window.scrollTo({left: 90, top: 999, behavior: "smooth"})); //скролить до координат от начала окна
console.log(window.scrollBy(0, 10)); //скролить до координат от текущей позиции
console.log(textOutput.scrollIntoView({behavior: "smooth"})); //скролить до элемента
//Размеры
console.log(window.innerWidth); //ширина окна просмотра (видимая со скроллбаром)
console.log(window.innerHeight); //высота окна просмотра (видимая со скроллбаром)
console.log(document.documentElement.offsetWidth); //ширина документа (без скроллбара)
console.log(document.documentElement.offsetHeight); //высота документа (без скроллбара)
console.log(window.scrollX); //смещение документа от окна, только чтение
console.log(window.scrollY); //смещение документа от окна, только чтение
console.log("иаичи"); 
console.log(textOutput.offsetWidth); //ширина элемента (без скроллбара, включая бордер и пэдинг, без маджина)
console.log(textOutput.offsetHeight); //высота элемента (без скроллбара, включая бордер и пэдинг, без маджина)
console.log(textOutput.offsetLeft); //координата смещения слева от относительного элемента
console.log(textOutput.offsetTop); //координата смещения сверху от относительного элемента
console.log(textOutput.offsetParent); //элемент, относительно которого смещение
console.log(textOutput.clientWidth); //ширина элемента (без скроллбара, без бордера и маджина)
console.log(textOutput.clientHeight); //высота элемента (без скроллбара, без бордера и маджина)
console.log(textOutput.clientLeft); //по сути толщина бордера слева.
console.log(textOutput.clientTop); //по сути толщина бордера сверху.
console.log(textOutput.scrollWidth); //ширина элемента (без скроллбара, включая бордер и пэдинг, без маджина) и с учетом скролла.
console.log(textOutput.scrollHeight); //высота элемента (без скроллбара, включая бордер и пэдинг, без маджина) и с учетом скролла.
console.log(textOutput.scrollLeft); //прокрутка слева внутри элемента, свойство для записи и чтения.
console.log(textOutput.scrollTop); //прокрутка сверху внутри элемента, свойство для записи и чтения.

document.querySelector("my-input").id = "input";
