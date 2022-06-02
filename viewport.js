
const docEl = document.documentElement
let lastY = 0;
const onScroll = function(){
    const upScroll = lastY >= scrollY;
    docEl.classList[upScroll?'add':'remove']('u1-scroll-up');
    lastY = scrollY;
    const isTop = lastY <= 20; // 0 is not enough on iOS
    docEl.classList[isTop?'remove':'add']('u1-scroll-not-top');
};
onScroll();
addEventListener('scroll',onScroll);




let lastHMin = null;
function check(){
    let hMin = window.innerHeight;
    if (lastHMin !== null) {
        hMin = Math.abs(hMin - lastHMin) > 150 ? hMin : lastHMin; // tested: 114px
    }
    document.documentElement.style.setProperty('--u1-vh-min', hMin +'px');
    lastHMin = hMin;
};
check();
addEventListener('resize',check);





/*
// https://github.com/joppuyo/large-small-dynamic-viewport-units-polyfill/blob/master/src/index.js
const docEl = document.documentElement;

if (CSS.supports('height:1svh')) {
    docEl.style.setProperty('--1svh', "1svh");
    docEl.style.setProperty('--1dvh', "1dvh");
    docEl.style.setProperty('--1lvh', "1lvh");
} else {
    recalc();
    document.addEventListener('DOMContentLoaded', recalc)
    window.addEventListener('resize', recalc);
}

function recalc() {
    const svh = docEl.clientHeight * 0.01;
    docEl.style.setProperty('--1svh', (svh + "px"));
    const dvh = window.innerHeight * 0.01;
    docEl.style.setProperty('--1dvh', (dvh + "px"));

    //const parent = docEl;
    const parent = document.body;
    if (parent) {
        const fixed = document.createElement("div");
        fixed.style.cssText = 'width:1px;height:100vh;position:fixed;left:0;top:0;bottom:0;visibility:hidden';
        parent.append(fixed);
        const lvh = fixed.clientHeight * 0.01;
        docEl.style.setProperty('--1lvh', (lvh + "px"));
        fixed.remove();
    }
};
*/