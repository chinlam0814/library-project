# Generated by Django 4.0.4 on 2022-06-06 10:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowlist', '0012_alter_borrow_borrow_date_alter_borrow_return_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 6, 18, 35, 7, 712645)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 9, 4, 18, 35, 7, 712645)),
        ),
    ]
