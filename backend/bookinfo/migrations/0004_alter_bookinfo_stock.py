# Generated by Django 4.0.4 on 2022-05-13 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookinfo', '0003_alter_bookinfo_pubdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookinfo',
            name='stock',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
