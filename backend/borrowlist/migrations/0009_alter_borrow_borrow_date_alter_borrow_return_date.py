# Generated by Django 4.0.4 on 2022-05-28 03:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowlist', '0008_alter_borrow_borrow_date_alter_borrow_return_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 28, 11, 43, 56, 497789)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 26, 11, 43, 56, 497789)),
        ),
    ]
