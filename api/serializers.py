from django.http.response import HttpResponseNotModified
from rest_framework import serializers
from .models import Typer 

class TyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('id', 'nick', 'record', 'guest_can_pause')


class CreateMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('nick', 'record', 'guest_can_pause')