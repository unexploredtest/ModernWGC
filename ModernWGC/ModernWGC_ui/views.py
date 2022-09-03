from django.shortcuts import render

def initial_graph(request):
    return render(request, "ModernWGC_ui/index.html")
