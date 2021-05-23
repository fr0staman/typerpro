from rest_framework import serializers
from .models import Typer 

class TyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('id', 'code', 'nick', 'host', 'record', 'guest_can_pause', 'created_at')


class CreateMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('nick', 'guest_can_pause')