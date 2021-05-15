from django.db import models

# Create your models here.
class Typer(models.Model):
    nick = models.CharField(max_length=16, unique=True)
    record = models.FloatField(max_length=6)