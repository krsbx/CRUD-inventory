# Generated by Django 3.2 on 2021-04-22 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventaris', '0007_alter_peminjamandetail_nama_barang'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peminjamandetail',
            name='kode_barang',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kode_barang+', to='inventaris.tabelbarang', verbose_name='Kode Barang'),
        ),
        migrations.AlterField(
            model_name='peminjamandetail',
            name='nama_barang',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='nama_barang+', to='inventaris.tabelbarang', to_field='nama_barang', verbose_name='Nama Barang'),
        ),
    ]
