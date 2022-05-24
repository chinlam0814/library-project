# Generated by Django 4.0.4 on 2022-05-23 04:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bookinfo', '0004_alter_bookinfo_stock'),
        ('borrowlist', '0003_alter_borrow_borrow_date_alter_borrow_return_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='bookinfo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bookinfo.bookinfo'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 23, 12, 1, 41, 952632)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 21, 12, 1, 41, 952632)),
        ),
    ]
