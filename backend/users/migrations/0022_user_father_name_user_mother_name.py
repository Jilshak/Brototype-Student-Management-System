# Generated by Django 4.2.4 on 2023-08-23 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_user_address_user_taluk_user_village'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='father_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='mother_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
