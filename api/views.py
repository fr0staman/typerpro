from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import TyperSerializer, CreateMatchSerializer
from .models import Typer
from rest_framework.views import APIView
from rest_framework.response import Response

class TyperView(generics.ListAPIView):
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer

class GetRoom(APIView):
    serializer_class = TyperSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Typer.objects.filter(code=code)
            if len(room) > 0:
                data = TyperSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request':'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateTyperView(APIView):
    serializer_class = CreateMatchSerializer

    def post(self, request, format="None"):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            nick = serializer.data.get('nick')
            host = self.request.session.session_key
            queryset = Typer.objects.filter(host=host)
            if queryset.exists():
                typer = queryset[0]
                typer.guest_can_pause = guest_can_pause
                typer.nick = nick
                typer.save(update_fields=['guest_can_pause', 'nick'])
                return Response(TyperSerializer(typer).data, status=status.HTTP_200_OK)
            else:
                typer = Typer(host=host, guest_can_pause=guest_can_pause, nick=nick)
                typer.save()
                return Response(TyperSerializer(typer).data, status=status.HTTP_202_ACCEPTED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)