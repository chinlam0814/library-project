from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinLengthValidator


# Create your models here.

class Student(User):
    name = models.CharField(null=False, max_length=100, default='')
    borrow_num = models.IntegerField(default = 0)

    def __str__(self):
        return self.username

    def body(self):
        return {'id': self.id,
        		'user' : 'Student',
                'username': self.username,
                'name': self.name,
                'borrow_num': self.borrow_num,}
    
    class Meta:
        verbose_name = 'Student'


class Admin(User):
    name = models.CharField(null=False, max_length=100, default='')

    def __str__(self):
        return self.username

    def body(self):
        return {'id': self.id,
        		'user' : 'Admin',
                'username': self.username,
                'name': self.name,}

    class Meta:
        verbose_name = 'Admin'