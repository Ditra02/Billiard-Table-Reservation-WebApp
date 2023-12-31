# Generated by Django 4.2.3 on 2023-07-17 05:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0007_alter_table_player_alter_table_start_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='finish',
            field=models.TimeField(blank=True, default=django.db.models.deletion.SET_NULL, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='play_time',
            field=models.DurationField(blank=True, default=django.db.models.deletion.SET_NULL, null=True),
        ),
    ]
