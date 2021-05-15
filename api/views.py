from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import TyperSerializer, CreateMatchSerializer
from .models import Typer
from rest_framework.views import APIView
from rest_framework.response import Response

class TyperView(generics.CreateAPIView):
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer


class CreateTyperView(APIView):
    serializer_class = CreateMatchSerializer

    def post(self, request, format="None"):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            code = serializer.data.get('code')
            host = self.request.session.session_key
            queryset = Typer.objects.filter(host=host)
            if queryset.exists():
                typer = queryset[0]
                typer.guest_can_pause = guest_can_pause
                typer.save(update_fields=['guest_can_pause'])
                return Response(TyperSerializer(typer).data, status=status.HTTP_200_OK)
            else:
                typer = Typer(host=host, guest_can_pause=guest_can_pause)
                typer.save()
                return Response(TyperSerializer(typer).data, status=status.HTTP_202)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)