const allKeysObject = {
    "sin" : "sin(",
    "cos" : "cos(",
    "open-parenthesis" : "(",
    "close-parenthesis" : ")",
    "theta" : "θ",
    "e" : "e",
    "Pi" : "π",
    "plus" : "+",
    "tan" : "tan(",
    "minus" : "-",
    "log" : "log(",
    "multiply" : "×",
    "divide" : "÷",
    "infinity" : "∞",
    "cot" : "cot(",
    "factorial" : "!",
    "s-root" : "√(",
}
const operationsWithParentheses = ["sin", "cos", "tan", "log", "cot", "s-root"]
let leftSectionisClosed = false // This checks whether the input section is closed or open.
let cursorPos

const sleep = ms => new Promise(r => setTimeout(r, ms));


closeInputSectionButton.addEventListener("click", async function() { // For closing the left input section.
    resetAnimation(arrowSvg)
    // Maybe it was best yo use the add class method for the arrow, but whatever...
    if (leftSectionIsClosed === false) {
        body.style.overflow = "hidden"
        arrowSvg.style.transform = "rotate(0deg)"
        arrowSvg.style.animation = "flip_arrow_close forwards"
        arrowSvg.style.animationDuration = "200ms"
        arrowSvg.style.animationDelay = "200ms"
        leftInputSection.classList.add("close-left-section")
        saveGraph.classList.add("save-graph-on-close")
        keyPad.classList.add("key-pad-on-closed")
        leftSectionIsClosed = true
    }
    else {
        arrowSvg.style.transform = "rotate(180deg)"
        arrowSvg.style.animation = "flip_arrow_open forwards"
        arrowSvg.style.animationDuration = "200ms"
        arrowSvg.style.animationDelay = "200ms"
        leftInputSection.classList.remove("close-left-section")
        saveGraph.classList.remove("save-graph-on-close")
        keyPad.classList.remove("key-pad-on-closed")
        await sleep (500)
        body.style.overflow = "visible"
        leftSectionIsClosed = false
    }
});

// --- Used to fetch cursor'c position
// inputField.addEventListener('keyup', e => {
//     console.log('Caret at: ', e.target.selectionStart)
// })

//--- Adding event listeners to all keys
for (let i = 0; i < allKeys.length; i++) {
    allKeys[i].addEventListener('click', function() {keyListener(allKeys[i].id), false} );
}



function keyListener(target) {
    inputField.focus()
    cursorPos = inputField.selectionStart

    // inputField.value = inputField.value + allKeysObject[target]
    inputField.value = inputField.value.substr(0, cursorPos) + allKeysObject[target] + inputField.value.substr(cursorPos);
    console.log(cursorPos)
}



function resetAnimation(target) { // A function that resets the elemnt animation.
        target.style.animation = "none"
        target.offsetHeight;
        target.style.animation = null
}


//--- Later will be used for Theme change
checkBox.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
});


// --- On window resize, the graph should be responsive and resize.
window.onresize = function(){resizeGraph()}
function resizeGraph() {
    graphWidth = rightGraphSide.clientWidth
    graphHeight = rightGraphSide.clientHeight
    rightGraphSide.innerHTML = ""
    defaultGraph = {"width": graphWidth, "height": graphHeight, "axes": [{"bbox": [0.125, 0.10999999999999999, 0.775, 0.77], "xlim": [0.0, 1.0], "ylim": [0.0, 1.0], "xdomain": [0.0, 1.0], "ydomain": [0.0, 1.0], "xscale": "linear", "yscale": "linear", "axes": [{"position": "bottom", "nticks": 6, "tickvalues": null, "tickformat_formatter": "", "tickformat": null, "scale": "linear", "fontsize": 10.0, "grid": {"gridOn": true, "color": "#B0B0B0", "dasharray": "none", "alpha": 1.0}, "visible": true}, {"position": "left", "nticks": 6, "tickvalues": null, "tickformat_formatter": "", "tickformat": null, "scale": "linear", "fontsize": 10.0, "grid": {"gridOn": true, "color": "#B0B0B0", "dasharray": "none", "alpha": 1.0}, "visible": true}], "axesbg": "#FFFFFF", "axesbgalpha": null, "zoomable": true, "id": "el11978139690472026416", "lines": [], "paths": [], "markers": [], "texts": [], "collections": [], "images": [], "sharex": [], "sharey": []}], "data": {}, "id": "el11978139690926006624", "plugins": [{"type": "reset"}, {"type": "zoom", "button": true, "enabled": true}, {"type": "boxzoom", "button": true, "enabled": false}]}
    drawGraph("right-graph-side", defaultGraph)
    console.log("Resized")
}