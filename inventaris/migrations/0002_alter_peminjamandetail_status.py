# Generated by Django 3.2 on 2021-05-20 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventaris', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peminjamandetail',
            name='status',
            field=models.CharField(max_length=2, null=True),
        ),
    ]