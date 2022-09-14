from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import graph

@api_view(['GET'])
def index_page(request):
    return_data = {
        "error" : "0",
        "message" : "Successful",
    }
    return Response(return_data)

@api_view(["POST"])
def graphFunction(request):
    try:
        function_name = request.headers.get("functionName")
        graph_figure = graph.figure_generator(function_name)
        graph_data = graph.fig_dict(graph_figure)
        response = {
            "graph" : graph_data
        }
    except Exception as e:
        response = {
            "error" : "2",
            "message": str(e)
        }
    
    return Response(response)