# Generated by Django 4.2.4 on 2023-08-19 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_timeslot_booked'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='advisor_username',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='booking',
            name='intern_batch',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='booking',
            name='intern_username',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
