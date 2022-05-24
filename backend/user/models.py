from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinLengthValidator


# Create your models here.

class Student(User):
    # student_id
    number = models.CharField(unique=True, max_length = 8, validators = [MinLengthValidator(8)])
    borrow_num = models.IntegerField(default = 0)

    def __str__(self):
        return self.number

    def body(self):
        return {'id': self.id,
        		'user' : 'Student',
                'username': self.username,
                'number': self.number,
                'borrow_num': self.borrow_num}
    
    class Meta:
        verbose_name = 'Student'


class Admin(User):
    # admin_id
    number = models.CharField(max_length = 8, validators = [MinLengthValidator(8)])

    def __str__(self):
        return self.username

    def body(self):
        return {'id': self.id,
        		'user' : 'Admin',
                'username': self.username,
                'number': self.number}

    class Meta:
        verbose_name = 'Admin'