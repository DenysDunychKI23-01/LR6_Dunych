const tabsContainer = document.querySelector('#tabs'); 
const tabs = document.querySelectorAll('.tab'); 
const tabContents = document.querySelectorAll('.tab-content'); 

const topLeft = document.querySelector('#top-left'); 
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right'); 
const bottomLeft = document.querySelector('#bottom-left'); 

const topLeftValue = document.querySelector('#top-left-value'); 
const topRightValue = document.querySelector('#top-right-value'); 
const bottomRightValue = document.querySelector('#bottom-right-value'); 
const bottomLeftValue = document.querySelector('#bottom-left-value'); 

const elementHeight = document.querySelector('#element-height');
const heightValue = document.querySelector('#height-value');
const elementOverflow = document.querySelector('#element-overflow');

const preview = document.querySelector('#preview'); 
const previewButton = document.querySelector('#preview-button'); 
const coordinates = document.querySelector('#coordinates'); 

const cssCode = document.querySelector('#css-code'); 
const copyButton = document.querySelector('#copy-button'); 
const copyMessage = document.querySelector('#copy-message'); 

const presetForm = document.querySelector('#preset-form'); 
const presetName = document.querySelector('#preset-name'); 
const presetError = document.querySelector('#preset-error'); 

const scrollTopButton = document.querySelector('#scroll-top'); 

function hideTabs() { 
  tabs.forEach(tab => tab.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
} 

function showTab(tabName) { 
  const currentTab = document.querySelector(`[data-tab="${tabName}"]`);
  const currentContent = document.querySelector(`[data-content="${tabName}"]`);
  
  if (currentTab && currentContent) {
    currentTab.classList.add('active');
    currentContent.classList.add('active');
  }
} 

tabsContainer.addEventListener('click', function (event) {
  if (!event.target.classList.contains('tab')) { 
    return; 
  } 

  console.log(event.type); 
  console.log(event.target); 
  console.log(event.currentTarget); 

  const tabName = event.target.dataset.tab;
  hideTabs();
  showTab(tabName);
});

function generateCSS() { 
  const tl = topLeft.value;
  const tr = topRight.value;
  const br = bottomRight.value;
  const bl = bottomLeft.value;

  topLeftValue.textContent = `${tl} px`;
  topRightValue.textContent = `${tr} px`;
  bottomRightValue.textContent = `${br} px`;
  bottomLeftValue.textContent = `${bl} px`;

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;
  preview.style.borderRadius = radius;

  const hVal = elementHeight.value;
  heightValue.textContent = `${hVal} px`;
  preview.style.height = `${hVal}px`;

  const oVal = elementOverflow.value;
  preview.style.overflow = oVal;

  cssCode.value = `border-radius: ${radius};\nheight: ${hVal}px;\noverflow: ${oVal};`;
} 

topLeft.addEventListener('input', generateCSS);
topRight.addEventListener('input', generateCSS);
bottomRight.addEventListener('input', generateCSS);
bottomLeft.addEventListener('input', generateCSS);

elementHeight.addEventListener('input', generateCSS);
elementOverflow.addEventListener('change', generateCSS);

generateCSS();

presetName.addEventListener('focus', function () { 
  presetName.classList.add('focused');
}); 

presetName.addEventListener('blur', function () { 
  presetName.classList.remove('focused');
  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
  } else {
    presetName.classList.remove('error');
    presetError.textContent = '';
  }
}); 

function handlePresetSubmit(event) { 
  event.preventDefault();
  
  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
    return;
  }

  console.log(`Пресет: ${presetName.value.trim()}`);
  console.log(cssCode.value);
} 

presetForm.addEventListener('submit', handlePresetSubmit);

function handleKeyDown(event) { 
  if (event.key === 'Escape') {
    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;
    elementHeight.value = 200;
    elementOverflow.value = 'visible';
    generateCSS();
  }
} 

document.addEventListener('keydown', handleKeyDown);

function copyCSS() { 
  navigator.clipboard.writeText(cssCode.value).then(() => {
    copyMessage.textContent = 'CSS-код скопійовано';
    setTimeout(() => {
      copyMessage.textContent = '';
    }, 3000);
  });
} 

copyButton.addEventListener('click', copyCSS);

preview.addEventListener('click', function () { 
  console.log('Preview click'); 
}); 

previewButton.addEventListener('click', function (event) { 
  event.stopPropagation();
  console.log('Button click'); 
}); 

preview.addEventListener('mouseover', function () { 
  preview.classList.add('hovered');
}); 

preview.addEventListener('mouseout', function () { 
  preview.classList.remove('hovered');
}); 

preview.addEventListener('mousemove', function (event) { 
  coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
  console.log(`PageX: ${event.pageX}, PageY: ${event.pageY}`);
}); 

function handleScroll() { 
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
} 

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  }); 
});