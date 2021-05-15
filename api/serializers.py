from rest_framework import serializers
from .models import Typer 

class TyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('id', 'nick', 'record')
