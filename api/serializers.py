from rest_framework import serializers
from .models import Typer, Texts

class TyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('id', 'code', 'nick', 'host', 'guest_can_pause', 'created_at', 'text')


class CreateMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('nick', 'guest_can_pause')

class UpdateMatchSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta:
        model = Typer
        fields = ('nick', 'guest_can_pause', 'code')

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texts
        fields = '__all__'

class CreateTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texts
        fields = '__all__'