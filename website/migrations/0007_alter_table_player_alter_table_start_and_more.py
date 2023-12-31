# Generated by Django 4.2.3 on 2023-07-17 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0006_alter_table_player'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='player',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='start',
            field=models.TimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='table_number',
            field=models.IntegerField(default=0, null=True, unique=True),
        ),
    ]
