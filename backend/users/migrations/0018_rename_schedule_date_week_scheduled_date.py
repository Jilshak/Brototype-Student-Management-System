# Generated by Django 4.2.4 on 2023-08-22 15:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_remove_week_color_week_schedule_date_week_day_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='week',
            old_name='Schedule_date',
            new_name='scheduled_date',
        ),
    ]
