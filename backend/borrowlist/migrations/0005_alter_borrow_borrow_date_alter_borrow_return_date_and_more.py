# Generated by Django 4.0.4 on 2022-05-23 04:03

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_student_borrow_num'),
        ('borrowlist', '0004_alter_borrow_bookinfo_alter_borrow_borrow_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 23, 12, 3, 13, 409211)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 21, 12, 3, 13, 409211)),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.student'),
        ),
    ]
