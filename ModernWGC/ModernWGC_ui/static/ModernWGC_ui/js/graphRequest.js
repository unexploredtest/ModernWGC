const API_URL = window.location.href + "api/"
const defaultGraph = {"width": 640.0, "height": 480.0, "axes": [{"bbox": [0.125, 0.10999999999999999, 0.775, 0.77], "xlim": [0.0, 1.0], "ylim": [0.0, 1.0], "xdomain": [0.0, 1.0], "ydomain": [0.0, 1.0], "xscale": "linear", "yscale": "linear", "axes": [{"position": "bottom", "nticks": 6, "tickvalues": null, "tickformat_formatter": "", "tickformat": null, "scale": "linear", "fontsize": 10.0, "grid": {"gridOn": true, "color": "#B0B0B0", "dasharray": "none", "alpha": 1.0}, "visible": true}, {"position": "left", "nticks": 6, "tickvalues": null, "tickformat_formatter": "", "tickformat": null, "scale": "linear", "fontsize": 10.0, "grid": {"gridOn": true, "color": "#B0B0B0", "dasharray": "none", "alpha": 1.0}, "visible": true}], "axesbg": "#FFFFFF", "axesbgalpha": null, "zoomable": true, "id": "el11978139690472026416", "lines": [], "paths": [], "markers": [], "texts": [], "collections": [], "images": [], "sharex": [], "sharey": []}], "data": {}, "id": "el11978139690926006624", "plugins": [{"type": "reset"}, {"type": "zoom", "button": true, "enabled": true}, {"type": "boxzoom", "button": true, "enabled": false}]} 

let currentGraph = defaultGraph
updateGraphSize(currentGraph)

drawGraph("right-graph-side", currentGraph)

calculateButton.addEventListener("click", e => {
    if (inputField.value == ""){}
    else {
        fetch(API_URL, {method: "post", headers: {"functionName":inputField.value}}).then(response => {
            return response.json()
        })
        .catch(error => {
            console.error(error)
        })
        .then(jsonResponse => {

            currentGraph = jsonResponse.graph
            updateGraphSize(currentGraph)
        
            // enabling the move button by default
            zoomPlugin = currentGraph.plugins.find(element => {
                return (element.type == "zoom")
            })
            zoomPlugin.enabled = true

            // clearing the previous graph
            rightGraphSide.innerHTML = ""
            
            drawGraph("right-graph-side", currentGraph)
        })
        .catch(error => {
            console.error(error)
        })
    }
})

function mpld3_load_lib(url, callback) {
    var s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onreadystatechange = s.onload = callback;
    s.onerror = function(){console.warn("failed to load library " + url);};
    document.getElementsByTagName("head")[0].appendChild(s);
}

function drawGraph(id, graphJSON) {

    if(typeof(mpld3) !== "undefined" && mpld3._mpld3IsLoaded) {
        // already loaded: just create the figure
        !function(mpld3) {
            mpld3.draw_figure(id, graphJSON);
        }(mpld3);
    } else if(typeof define === "function" && define.amd) {
        // require.js is available: use it to load d3/mpld3
        require.config({paths: {d3: "https://d3js.org/d3.v5"}});
        require(["d3"], function(d3) {
        window.d3 = d3;
        mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function() {
            
            mpld3.draw_figure(id, graphJSON);
        });
        });
    } else {
        // require.js not available: dynamically load d3 & mpld3
        mpld3_load_lib("https://d3js.org/d3.v5.js", function(){
            mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function() {
                    
                    mpld3.draw_figure(id, graphJSON);
                })
            });
    }
}

function updateGraphSize(graphObject) {
    let width = rightGraphSide.clientWidth
    let height = rightGraphSide.clientHeight
    if (height < 351){
        height = 350
    }
    graphObject.width = width
    graphObject.height = height
}

rightGraphSide.innerHTML = ""