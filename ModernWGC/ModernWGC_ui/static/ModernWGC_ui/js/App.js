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

const sleep = ms => new Promise(r => setTimeout(r, ms))


//--- Removes page loaing animation.
setTimeout(async() => {
    pageLoader.classList.add("hide-page-loading")
    await sleep (151)
    pageLoader.style.display = "none"
}, 1500)

closeLeftMenu.addEventListener("click", async function() { // This closes the left menu (Input Menu).
    resetAnimation(arrowSvg)
    resizeCurrentGraph(200) // Resize graph on menu collapse.
    // Maybe it was best to use the add class method for the arrow, but whatever...
    if (leftSectionisClosed === false) {
        body.style.overflow = "hidden"
        arrowSvg.style.transform = "rotate(0deg)"
        arrowSvg.style.animation = "flip_arrow_close forwards"
        closeLeftMenu.style.right = "-55px"
        closeLeftMenu.style.paddingRight = "0px"
        closeLeftMenu.style.paddingLeft = "3px"
        arrowSvg.style.animationDuration = "200ms"
        arrowSvg.style.animationDelay = "200ms"
        leftInputSection.classList.add("close-left-section")
        saveGraph.classList.add("save-graph-on-close")
        keyPad.classList.add("key-pad-on-closed")
        leftSectionisClosed = true
    }
    else {
        arrowSvg.style.transform = "rotate(180deg)"
        arrowSvg.style.animation = "flip_arrow_open forwards"
        closeLeftMenu.style.right = "-23px"
        closeLeftMenu.style.paddingLeft = "0px"
        closeLeftMenu.style.paddingRight = "3px"
        arrowSvg.style.animationDuration = "200ms"
        arrowSvg.style.animationDelay = "200ms"
        leftInputSection.classList.remove("close-left-section")
        saveGraph.classList.remove("save-graph-on-close")
        keyPad.classList.remove("key-pad-on-closed")
        await sleep (500)
        body.style.overflow = "visible"
        leftSectionisClosed = false
    }
});


//--- Adding event listeners to all keys.
for (let i = 0; i < allKeys.length; i++) {
    allKeys[i].addEventListener('click', function() {keyListener(allKeys[i].id), false} );
}


function keyListener(target) {
    inputField.focus()
    cursorPos = inputField.selectionStart
    inputField.value = inputField.value.substr(0, cursorPos) + allKeysObject[target] + inputField.value.substr(cursorPos);
    console.log(cursorPos)
}



function resetAnimation(target) { // A function that resets the element animation.
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
window.onresize = function(){resizeCurrentGraph()}

// --- On menu collapse, the grpah should resize.
async function resizeCurrentGraph(delay = 0) {
    await sleep (delay) // --- Due to animation Delay.
    updateGraphSize(currentGraph)
    rightGraphSide.innerHTML = ""
    drawGraph("right-graph-side", currentGraph)
    console.log("Resized")
}