from functools import update_wrapper
from django.urls import path
from .views import TyperView

urlpatterns = [
    path('typer/', TyperView.as_view()),
]
