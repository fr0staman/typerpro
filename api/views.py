from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import TyperSerializer, CreateMatchSerializer, CreateTextSerializer,TextSerializer
from .models import Typer, Texts
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



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
                self.request.session['room_code'] = typer.code
                return Response(TyperSerializer(typer).data, status=status.HTTP_200_OK)
            else:
                typer = Typer(host=host, guest_can_pause=guest_can_pause, nick=nick)
                typer.save()
                self.request.session['room_code'] = typer.code
                return Response(TyperSerializer(typer).data, status=status.HTTP_202_ACCEPTED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Typer.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)

class GetText(APIView):
    serializer_class = TextSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            room = Texts.objects.filter(id=id)
            if len(room) > 0:
                data = TextSerializer(room[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request':'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateTextView(APIView):
    serializer_class = CreateTextSerializer

    def post(self, request, format="None"):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            text = serializer.data.get('text')
            queryset = Texts.objects.filter()
            if queryset.exists():
                texts = queryset[0]
                texts.text = text
                texts.save(update_fields=['text'])
                return Response(TextSerializer(texts).data, status=status.HTTP_200_OK)
            else:
                texts = Texts(text=text)
                texts.save()
                return Response(TextSerializer(texts).data, status=status.HTTP_202_ACCEPTED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)