from functools import update_wrapper
from django.urls import path
from .views import TyperView, CreateTyperView, GetRoom, CreateTextView, GetText, UserInRoom, LeaveRoom, UpdateView, CreatePlayersView, GetPlayerView, CreateResultView, GetResultsView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('typer', TyperView.as_view()),
    path('create-room', CreateTyperView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('create-text', CreateTextView.as_view()),
    path('get-text', GetText.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateView.as_view()),
    path('create-user', CreatePlayersView.as_view()), 
    path('get-user', GetPlayerView.as_view()),
    path('create-result', CreateResultView.as_view()),
    path('get-result', GetResultsView.as_view())
]
