from functools import update_wrapper
from django.urls import path
from .views import TyperView, CreateTyperView, GetRoom, CreateTextView, GetText
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('typer', csrf_exempt(TyperView.as_view())),
    path('create-room', csrf_exempt(CreateTyperView.as_view())),
    path('get-room', csrf_exempt(GetRoom.as_view())),
    path('create-text', csrf_exempt(CreateTextView.as_view()))
]
