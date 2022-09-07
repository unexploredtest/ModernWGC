from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def index_page(request):
    return_data = {
        "error" : "0",
        "message" : "Successful",
    }
    return Response(return_data)

@api_view(["POST"])
def graph(request):
    try:
        functionName = request.headers.get("functionName")
        graphData = mpld3.fig_to_dict(figureGenerator(functionName))
        response = {
            "graph" : graphData
        }
    except Exception as e:
        response = {
            "error" : "2",
            "message": str(e)
        }
    
    return Response(response)

import numpy as np
import numexpr as ne
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
import mpld3

def figureGenerator(functionName: str) -> Figure:
    x = np.linspace(-5,5,100)
    y = ne.evaluate(functionName)
    
    fig, ax = plt.subplots()
    
    ax.spines['left'].set_position('center')
    ax.spines['bottom'].set_position('zero')
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    ax.grid()
    
    ax.plot(x,y, 'r')
    
    return fig