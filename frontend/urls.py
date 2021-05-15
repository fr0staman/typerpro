from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('type', index),
    path('create', index),
    path('type/1', index)
]
