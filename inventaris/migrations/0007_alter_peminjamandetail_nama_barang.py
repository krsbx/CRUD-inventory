# Generated by Django 3.2 on 2021-04-22 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventaris', '0006_alter_peminjamandetail_kode_barang'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peminjamandetail',
            name='nama_barang',
            field=models.CharField(max_length=20, null=True, unique=True, verbose_name='Nama Barang'),
        ),
    ]