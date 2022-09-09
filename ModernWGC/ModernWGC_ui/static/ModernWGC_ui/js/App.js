let left_section_is_closed = false // This checks whether the input section is closed or open.
let cursorPos
let all_keys_dict = {
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
let operations_with_parentheses = ["sin", "cos", "tan", "log", "cot", "s-root"]
const sleep = ms => new Promise(r => setTimeout(r, ms));


close_input_section_button.addEventListener("click", async function(){ // For closing the left input section.
    reset_animation(arrow_svg)
    // Maybe it was best yo use the add class method for the arrow, but whatever...
    if (left_section_is_closed === false){
        arrow_svg.style.transform = "rotate(0deg)"
        arrow_svg.style.animation = "flip_arrow_close forwards"
        arrow_svg.style.animationDuration = "200ms"
        arrow_svg.style.animationDelay = "200ms"
        left_input_section.classList.add("close-left-section")
        save_graph.classList.add("save-graph-on-close")
        key_pad.classList.add("key-pad-on-closed")
        left_section_is_closed = true
    }
    else{
        arrow_svg.style.transform = "rotate(180deg)"
        arrow_svg.style.animation = "flip_arrow_open forwards"
        arrow_svg.style.animationDuration = "200ms"
        arrow_svg.style.animationDelay = "200ms"
        left_input_section.classList.remove("close-left-section")
        save_graph.classList.remove("save-graph-on-close")
        key_pad.classList.remove("key-pad-on-closed")
        left_section_is_closed = false
    }
});


// --- Used to fetch cursor'c position
// input_field.addEventListener('keyup', e => {
//     console.log('Caret at: ', e.target.selectionStart)
// })

//--- Adding event listeners to all keys
for (let i = 0; i < all_keys.length; i++) {
    all_keys[i].addEventListener('click', function() {key_listener(all_keys[i].id), false} );
}



function key_listener (target){
    input_field.focus()
    cursorPos = input_field.selectionStart

    // input_field.value = input_field.value + all_keys_dict[target]
    input_field.value = input_field.value.substr(0, cursorPos) + all_keys_dict[target] + input_field.value.substr(cursorPos);
    console.log(cursorPos)
}



function reset_animation(target){ // A function that resets the elemnt animation.
        target.style.animation = "none"
        target.offsetHeight;
        target.style.animation = null
}


//--- Later will be used for Theme change
check_box.addEventListener('change', function() {
    if (this.checked) {
      console.log("Checkbox is checked..");
    } else {
      console.log("Checkbox is not checked..");
    }
  });
