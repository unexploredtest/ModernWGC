from django.urls import path

from django.http import HttpResponse

def dummy(request):
    return HttpResponse("Dummy")

urlpatterns = [
    path('', dummy, name="ModernWGC-api"),
]