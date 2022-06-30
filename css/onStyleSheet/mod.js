import {SelectorObserver} from 'https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@3.0.1/SelectorObserver.min.js';

const sheets = new WeakSet();
const elements = new WeakSet();

const start = performance.now();

async function foundElement(el, byDebug){
    console.log('found new Element by '+byDebug, el, performance.now()-start+'ms');
    if (elements.has(el)) return; // what if element order changes?
    el.setAttribute('crossorigin','');
    elements.add(el);
    const sheet = await elSheetReady(el);
    checkSheet(el.sheet);
}

/*
document.styleSheets has the right order of sheets, but imported sheets are not included
*/
for (let sheet of document.styleSheets) {
    if (!sheet.ownerNode) console.warn('are root-sheets without ownerNode possible?');
    foundElement(sheet.ownerNode, 'document.styleSheets');
}
for (let sheet of document.adoptedStyleSheets) {
    if (sheet.ownerNode) console.warn('adoptedStyleSheets with a ownerNode possible?');
    foundElement(sheet.ownerNode, 'document.adoptedStyleSheets');
}

/*
sometimes the load-event comes before mutationobserver? not really
- first big .css?
has to listen on document, window triggers on document-load
*/
document.addEventListener('load',({target})=>{
    foundElement(target, 'load')
    if (!elements.has(target)) console.warn('load was first!!!');
    // console.log('triggered load', target, e);
    // if (target.tagName !== 'LINK') return;
    // if (target.rel !== 'stylesheet') return;
    // foundElement(target)
},true);

new SelectorObserver({
    on: el => {
        // checks all styleSheets and importRules, todo store urls global and check all if used url found
        // console.log(el.sheet)
        foundElement(el, 'SelectorObserver')
        //checkAllSheets();
    },
}).observe('link[rel="stylesheet"], style');


function checkSheet(sheet){
    let rules = false;
    try { rules = sheet.cssRules; } catch {}  // firefox fails sometimes if we access sheet.cssRules immediate after found it, really?
    console.log('sheet found', rules?'rules accessible':'rules fail', sheet)
    if (sheets.has(sheet)) console.error('sheet already added!?');
    sheets.add(sheet);
    rules && checkImportRules(rules);
}
function checkImportRules(rules){
    for (let rule of rules) {
        if (rule instanceof CSSImportRule) {
            checkSheet(rule.styleSheet);
        } else continue; // or break? are they always first?
    }
}


/*
const urls = {};
function checkAllSheets(){
    for (let sheet of document.styleSheets) checkSheet(sheet);
}
function checkSheet(sheet){
    console.log('sheet',sheet)
    try { // firefox fails sometimes if we access sheet.cssRules immediate after found it
        checkImportRules(sheet.cssRules);
    } catch (e) {
        //console.log('fail',sheet, e) //
    }
    if (!sheet.href) return;
    console.log(urls)
    if (medialistHas(sheet.media, 'once')) {
        sheet.disabled = !!urls[sheet.href];
        urls[sheet.href] = 1;
    }

}
function checkImportRules(rules){
    for (let rule of rules) {
        if (rule instanceof CSSImportRule) checkSheet(rule.styleSheet);
    }
}
function medialistHas(mediaList, wanted){
    for (let medium of mediaList) if (medium === wanted) return true;
}
*/

/* utils */

function elSheetReady(el){
    return new Promise(function(resolve, reject){
        if (el.sheet) resolve(el.sheet);
        el.addEventListener('load',()=>{
            if (el.sheet) resolve(el.sheet);
            else {
                console.log('no sheet yet', el);
                reject('no sheet!');
            }
        },{once:true})
        setTimeout(()=>reject('timeout'),2000)
    })
}