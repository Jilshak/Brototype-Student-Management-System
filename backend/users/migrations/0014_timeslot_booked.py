# Generated by Django 4.2.4 on 2023-08-18 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_alter_user_current_week_alter_user_review_in'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeslot',
            name='booked',
            field=models.BooleanField(default=False),
        ),
    ]