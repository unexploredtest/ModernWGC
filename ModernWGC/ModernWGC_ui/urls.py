from django.urls import path

from . import views

urlpatterns = [
    path('', views.initial_graph, name="ModernWGC-ui"),
]