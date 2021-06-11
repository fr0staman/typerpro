from django.db import models
import random
import string

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Typer.objects.filter(code=code).count() == 0:
            break

    return code

def getText():
    items = Texts.objects.all()
    random_item = random.choice(items)
    return random_item.text

# Create your models here.
class Texts(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    vocabulary = models.IntegerField(default=1)
    text = models.CharField(max_length=999, default="Тут має бути текст")


class Typer(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    nick = models.CharField(max_length=16, default="")
    host = models.CharField(max_length=50, default="", unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=999, default=getText)