# Generated by Django 4.0.4 on 2022-05-24 11:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_student_borrow_num'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='number',
            field=models.CharField(max_length=8, unique=True, validators=[django.core.validators.MinLengthValidator(8)]),
        ),
    ]
