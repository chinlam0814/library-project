# Generated by Django 4.0.4 on 2022-06-23 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_admin_question_student_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='admin',
            name='answer',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='student',
            name='answer',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
