
/* prevent double-click selection */
addEventListener('mousedown', e => {
    // check event.ctrlKey/event.shiftKey/event.altKey?
    if (e.detail < 2) return;
    let target = e.target;
    if (!target.closest('summary,label')) return;
    e.preventDefault();
}, false);


/*
addEventListener('transitionstart',e=>{
    e.target.classList.add('u1-animating')
})
addEventListener('transitionend',e=>{
    e.target.classList.remove('u1-animating')
})
*/