# Generated by Django 4.0.4 on 2022-05-24 11:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowlist', '0006_alter_borrow_borrow_date_alter_borrow_return_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 24, 19, 39, 12, 389595)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 22, 19, 39, 12, 389595)),
        ),
    ]
