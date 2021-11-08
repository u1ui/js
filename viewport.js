
const docEl = document.documentElement
let lastY = 0;
const onScroll = function(){
    const upScroll = lastY >= pageYOffset;
    docEl.classList[upScroll?'add':'remove']('u1-scroll-up');
    lastY = pageYOffset;
    //const isTop = lastY === 0;
    const isTop = lastY <= 0;
    //docEl.classList[isTop?'add':'remove']('u1-scroll-top');
    docEl.classList[isTop?'remove':'add']('u1-scroll-not-top');
};
onScroll();
addEventListener('scroll',onScroll);



let lastHeight = null;
function check(){
    let height = window.innerHeight;
    if (lastHeight !== null) {
        height = Math.abs(height - lastHeight) > 60 ? height : lastHeight; // grösser oder kleiner geworden um mehr als 60 px
    }
    lastHeight = height;
    document.documentElement.style.setProperty('--u1-vh-max', height+'px');
};
check();
addEventListener('resize',check);
