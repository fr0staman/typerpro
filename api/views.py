from django.shortcuts import render
from rest_framework import generics
from .serializers import TyperSerializer
from .models import Typer

class TyperView(generics.CreateAPIView):
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer