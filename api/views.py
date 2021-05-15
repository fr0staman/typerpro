from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import TyperSerializer, CreateMatchSerializer
from .models import Typer
from rest_framework.views import APIView
from rest_framework.response import Response

class TyperView(generics.CreateAPIView):
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer


class CreateMatchView(APIView):
    serializer_class = CreateMatchSerializer
    
    def post(self, request, format="None"):
        pass