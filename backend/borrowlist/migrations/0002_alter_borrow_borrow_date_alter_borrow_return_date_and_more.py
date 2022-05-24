# Generated by Django 4.0.4 on 2022-05-22 05:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowlist', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 22, 13, 47, 24, 679623)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 20, 13, 47, 24, 679623)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='returned_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
