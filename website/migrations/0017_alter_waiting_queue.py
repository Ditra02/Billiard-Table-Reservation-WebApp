# Generated by Django 4.2.3 on 2023-07-22 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0016_waiting_is_served'),
    ]

    operations = [
        migrations.AlterField(
            model_name='waiting',
            name='queue',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
