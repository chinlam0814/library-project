# Generated by Django 4.0.4 on 2022-05-13 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookinfo', '0002_remove_bookinfo_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookinfo',
            name='pubdate',
            field=models.DateField(null=True),
        ),
    ]
