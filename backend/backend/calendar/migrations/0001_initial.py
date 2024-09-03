# Generated by Django 4.2.15 on 2024-09-02 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('allDay', models.BooleanField(default=False)),
            ],
        ),
    ]
