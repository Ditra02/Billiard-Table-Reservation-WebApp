# Generated by Django 4.2.3 on 2023-07-17 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_remove_waiting_finish'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='player',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]