
const docEl = document.documentElement
let lastY = 0;
const onScroll = function(){
    const upScroll = lastY >= pageYOffset;
    docEl.classList[upScroll?'add':'remove']('u1-scroll-up');
    lastY = pageYOffset;
    //const isTop = lastY === 0;
    const isTop = lastY <= 10; // 0 is not enough on iOS
    //docEl.classList[isTop?'add':'remove']('u1-scroll-top');
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
