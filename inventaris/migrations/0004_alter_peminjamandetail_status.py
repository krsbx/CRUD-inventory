# Generated by Django 3.2 on 2021-05-21 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventaris', '0003_alter_peminjamandetail_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peminjamandetail',
            name='status',
            field=models.CharField(choices=[('Rusak', 'Rusak'), ('Pending', 'Pending'), ('Baik', 'Baik')], default='Pending', max_length=10, null=True),
        ),
    ]
