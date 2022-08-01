//모달
const modalOpen = document.querySelectorAll('.modal-button-open');
const modalClose = document.querySelectorAll('.modal-button-close');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelectorAll('.modal-content');

modalOpen.forEach(e => {
  e.addEventListener("click", () => {
    let target = e.getAttribute("target")
    const modalName = document.querySelector(`.modal-content[name=${target}]`);
    modalContainer.classList.add('show')
    modalName.classList.add('show')
  })
  modalContainer.addEventListener("click", () => {
    modalContainer.classList.remove('show')
    modalContent.forEach(el => {
      el.classList.remove('show')
    })
  })
})
modalClose.forEach(e => {
  e.addEventListener("click", () => {
    modalContainer.classList.remove('show')
    modalContent.forEach(el => {
      el.classList.remove('show')
    })
  })
})
//모달 끝

//탭
const tabButton = document.querySelectorAll('.tab-button');
const tabContent = document.querySelectorAll('.tab-content');
tabButton.forEach(e => {
  e.addEventListener("click", () => {
    tabButton.forEach(e => {
      e.classList.remove('show')
    });
    tabContent.forEach(e => {
      e.classList.remove('show')
    });
    e.classList.add('show');
    let target = e.getAttribute("target");
    const tabName = document.querySelector(`.tab-content[name=${target}]`);
    tabName.classList.add('show');
  })
})
//탭 끝

//드롭다운
const dropdownButton = document.querySelectorAll('.dropdown-button');
dropdownButton.forEach(e => {
  const dropdown = e.parentNode;
  e.addEventListener('click', () => {
    dropdown.classList.toggle("show");
  })
})
//드롭다운 끝

//인풋박스
const inputBox = document.querySelectorAll('.input-box');
inputBox.forEach(e => {
  setLabel(e);
  e.addEventListener('click', () => {
    e.classList.add('focus');
  })
  outsideClick(e);
})
//인풋박스 끝

//셀렉트 박스
const selectBox = document.querySelectorAll('.select-box');
selectBox.forEach(e => {
  setLabel(e);
  let selected = undefined;
  let selectList = undefined;
  let isSelected = false
  e.classList.add("hide");
  for (let i = 0; i < e.children.length; i++) {
    if (e.children[i].className === "selected") {
      selected = e.children[i];
    }
    if (e.children[i].className === "select-list") {
      selectList = e.children[i];
    }
  }

  e.addEventListener('click', () => {
    e.classList.add('focus');
    e.classList.toggle("hide");
    [...selectList.children].forEach(item => {
      item.addEventListener('click', () => {
        const value = item.getAttribute("data-value");
        if (e.getAttribute("type") === "value") selected.innerText = value;
        else selected.innerText = item.innerText;
      })
    })
    document.addEventListener('click', (event) => {
      if (!e.contains(event.target)) {
        e.classList.add('hide');
        if (selected.innerText.length === 0) {
          e.classList.remove("focus")
        }
      }
    })
  })
})
//셀렉트 박스 끝

//툴팁
const tooltip = document.querySelectorAll('.tooltip');
tooltip.forEach(e => {
  e.parentElement.style.position = "relative";
  e.style.setProperty("--content", `"${e.innerText}"`);
  if (e.getAttribute("type") === "top") {
    e.outerHTML = `<span class= "tooltip-box top">${e.outerHTML}</span>`
  } else {
    e.outerHTML = `<span class= "tooltip-box">${e.outerHTML}</span>`
  }
})
//툴팁 끝

//오토클로즈
const autoClose = document.querySelectorAll('[auto-close]');
autoClose.forEach(e => {
  let time = e.getAttribute("auto-close");
  setTimeout(function () {
    e.classList.remove('show')
  }, time);
})
//오토클로즈 끝

//스크롤 시 클래스 추가
const scrollAnimation = document.querySelectorAll('[scroll-animation]');
scrollAnimation.forEach(e => {
  e.classList.add("scroll");
  if (window.scrollY + window.innerHeight > e.getBoundingClientRect().top + (e.getBoundingClientRect()
      .height)) {
    e.classList.add("animate")
  }
  document.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight / 1.2 > e.getBoundingClientRect().top + (e
        .getBoundingClientRect().height)) {
      e.classList.add("animate")
    }
  })
})
//스크롤 시 클래스 추가 끝

//프로그래스 바
const progressBar = document.querySelectorAll('.progress-bar');
progressBar.forEach(e => {
  const percent = e.innerHTML;
  e.innerHTML = `<span class= "percent">${e.innerText}%</span>`;
  e.style.setProperty("--width", `${percent}%`);
  if (e.getAttribute("type") === "left") e.classList.add("left");
})
//프로그래스 바 끝

//원형 프로그래스 바
const progressCircle = document.querySelectorAll('.progress-circle');
progressCircle.forEach((e, i) => {
  const size = e.getAttribute("size") ? e.getAttribute("size") : 150;
  const strokeWidth = e.getAttribute("stroke-width") ? e.getAttribute("stroke-width") : 10
  const cir = Math.PI * (size - strokeWidth)
  const percent = e.innerHTML / 100;
  const dashoffset = cir * (1 - percent);
  const progress = Number(e.innerHTML);
  let value = 0;
  e.innerHTML = `
    <svg class="circle-wrap" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="frame" cx="${size / 2}" cy="${size / 2}" r="${size / 2-strokeWidth/2}" stroke-width="${strokeWidth}" />
      <circle class="bar" cx="${size / 2}" cy="${size / 2}" r="${size / 2-strokeWidth/2}" stroke-width="${strokeWidth}" stroke-dasharray="${cir}" style="--offset : ${dashoffset}; --cir: ${cir}"/>
    </svg>
    <span class="value">${progress}%</span>`
  document.addEventListener('scroll', () => {
    if (e.classList.contains('animate')) {
      const counterup = setInterval(() => {
        if (value < progress) {
          value++;
          e.lastChild.innerText = `${value}%`
        }
        if (value === progress) clearInterval(counterup)
      }, 30)
    }
  })

  e.style.width = `${size}px`
})
//원형 프로그래스 바 끝

//이미지 리스트
const imgList = document.querySelectorAll('.img-list');
imgList.forEach(e => {
  const gap = e.getAttribute("gap") ? e.getAttribute("gap") : 8;
  if (e.hasAttribute("auto")) {
    e.classList.add("massory")
  }
  e.style.gap = `${gap}px`
  if (e.classList.contains("massory"))[...e.children].forEach(el => {
    el.style.marginBottom = `${gap}px`
  })
})
//이미지 리스트 끝

//콜렙스
const collapseButton = document.querySelectorAll('.collapse-button');
const collapseContent = document.querySelectorAll('.collapse > .content');

collapseButton.forEach((e, i) => {
  const content = collapseContent[i];
  const height = collapseContent[i].clientHeight;
  content.style.height = "0"
  let isOpen = false;
  if(e.hasAttribute("show")){
    content.style.height = `${height}px`
    isOpen = true
    e.classList.add("show");
  }
  e.addEventListener("click", () => {
    e.classList.toggle("show");
    if (isOpen) {
      content.style.height = `0px`
      isOpen = false
    } else {
      content.style.height = `${height}px`
      isOpen = true
    }
  })
})
//콜렙스 끝

//인풋, 셀렉트박스 상단 라벨 추가
function setLabel(e) {
  const name = e.getAttribute("name")
  const type = e.getAttribute("type")
  e.setAttribute("tabindex", 0);
  e.insertAdjacentHTML("beforeend", `
    <label for="">${name}</label>
    <fieldset>
      <legend>${name}</legend>
    </fieldset>
  `)
}
//인풋, 셀렉트박스 상단 라벨 추가

//모달 바깥영역 클릭시 닫기
function outsideClick(e, event) {
  document.addEventListener('click', (event) => {
    if (!e.contains(event.target)) {
      e.classList.remove('focus');
      e.classList.remove('show');
    }
  });
}
//모달 바깥영역 클릭시 닫기 끝


//카피
// const jsArea = document.querySelector('#jsArea');
const copyJsButton = document.querySelectorAll('.copy-js-button');
const codeJs = document.querySelectorAll('.code-js');
const codeCss = document.querySelectorAll('.code-css');
const saveJsButton = document.querySelector('.save-js-button');
const saveCssButton = document.querySelector('.save-css-button');
const clearLocal = document.querySelector('#clearButton')
const isAdded = new Array(codeJs.length).fill(false);
const cssImport = `@import "reset";
@import "mixin";
@import "variables";`
localStorage.setItem("css", cssImport)
// jsArea.value = localStorage.js;

copyJsButton.forEach((e, i)=>{
  e.addEventListener("click",()=>{
    let copyJs = codeJs[i].innerHTML;
    let copyCss = codeCss[i].innerHTML;
    copyJs = [localStorage.js, copyJs].join("\n");
    copyCss = [localStorage.css, copyCss].join("\n");
    localStorage.setItem("js", copyJs);
    localStorage.setItem("css", copyCss);
    let addContentJs = localStorage.js
    let addContentCss = localStorage.js
    // jsArea.value = addContentJs;
  })
})

saveJsButton.addEventListener("click", ()=>{
  const decodeJs = decodeHTML(localStorage.js)
  const js = 'data:application/csv;charset=utf-8,' + encodeURIComponent(decodeJs)
  saveJsButton.href = js;
  saveJsButton.target = '_blank';
  saveJsButton.download = 'cart.js';
})
saveCssButton.addEventListener("click", ()=>{
  const decodeCss = decodeHTML(localStorage.css);
  const css = 'data:application/csv;charset=utf-8,' + encodeURIComponent(decodeCss)
  saveCssButton.href = css;
  saveCssButton.target = '_blank';
  saveCssButton.download = 'cart.scss';
})

clearLocal.addEventListener("click", ()=>{
  localStorage.removeItem("js");
  localStorage.setItem("css", cssImport)
  // jsArea.value = "";
})

var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};