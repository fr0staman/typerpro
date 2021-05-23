from functools import update_wrapper
from django.urls import path
from .views import TyperView, CreateTyperView, GetRoom

urlpatterns = [
    path('typer', TyperView.as_view()),
    path('create-room', CreateTyperView.as_view()),
    path('get-room', GetRoom.as_view())
]
