# Generated by Django 2.2 on 2020-07-14 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userProfile', '0002_auto_20200714_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='description',
            name='text',
            field=models.TextField(default='Please write something about yourself...!'),
        ),
    ]
