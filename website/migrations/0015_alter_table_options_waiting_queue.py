# Generated by Django 4.2.3 on 2023-07-22 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0014_alter_table_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='table',
            options={},
        ),
        migrations.AddField(
            model_name='waiting',
            name='queue',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
    ]
