# Generated by Django 4.2.4 on 2023-08-16 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_week_week_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='week',
            name='color',
            field=models.CharField(default='#3E4257', max_length=50),
        ),
        migrations.AddField(
            model_name='week',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]