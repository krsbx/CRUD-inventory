# Generated by Django 3.2 on 2021-04-27 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventaris', '0014_alter_tabelbarang_kode_barang'),
    ]

    operations = [
        migrations.AddField(
            model_name='peminjamandetail',
            name='kembali',
            field=models.BooleanField(default=False, verbose_name='Dikembalikan'),
        ),
    ]
