from django.db import models
import datetime

# Create your models here.
class Pegawai(models.Model):
    nip_nrk = models.CharField(max_length=120, unique=True, null=False)
    nama = models.CharField(max_length=120, null=False)
    alamat = models.CharField(max_length=120, null=False)
    telp = models.CharField(max_length=120, unique=True, null=False)

class Peminjaman(models.Model):
    barangId = models.CharField(verbose_name="ID Barang", max_length=20, unique=True, null=False)
    nomor_peminjaman = models.CharField(verbose_name="Nomor Peminjaman", max_length=20, unique=True, null=False)
    nip_nrk = models.CharField(max_length=120, unique=True, null=False)
    tgl_pinjam = models.DateField(verbose_name="Tanggal Peminjaman", help_text="Masukkan Tanggal Peminjaman", default=datetime.date.today, null=False)
    tgl_kembali = models.DateField(verbose_name="Tanggal Pengembalian", help_text="Masukkan Tanggal Pengembalian", null=True)
    BAST_disposisi = models.FileField(verbose_name="BAST Diposisi", default=None, null=False)

class Barang(models.Model):
    barangId = models.CharField(verbose_name="ID Barang", max_length=20, unique=True, null=False)
    kode_barang = models.CharField(verbose_name="Kode Barang", max_length=20, null=False)
    nama_barang = models.CharField(verbose_name="Nama Barang", max_length=20, null=False)
    merk = models.CharField(verbose_name="Merk Barang", max_length=20, null=False)
    stock = models.IntegerField(verbose_name="Stock Barang", max_length=None, null=False)
    BAST_perolehan = models.FileField(verbose_name="BAST Perolehan", default=None, null=False)