from django.db import models
import datetime

# Create your models here.
class Pegawai(models.Model):
    nip_nrk = models.CharField(max_length=120)
    nama = models.CharField(max_length=120)
    alamat = models.CharField(max_length=120)
    telp = models.CharField(max_length=120)

class Peminjaman(models.Model):
    barangId = models.CharField(verbose_name="ID Barang", max_length=20)
    nomor_peminjaman = models.CharField(verbose_name="Nomor Peminjaman", max_length=20)
    nip_nrk = None
    tgl_pinjam = models.DateField(verbose_name="Tanggal Peminjaman", help_text="Masukkan Tanggal Peminjaman" ,default=datetime.date.today)
    tgl_kembali = models.DateField(verbose_name="Tanggal Pengembalian", help_text="Masukkan Tanggal Pengembalian")
    BAST_disposisi = models.FileField(verbose_name="BAST Diposisi", default=None)

class Barang(models.Model):
    barangId = models.CharField(verbose_name="ID Barang", max_length=20)
    kode_barang = models.CharField(verbose_name="Kode Barang", max_length=20)
    nama_barang = models.CharField(verbose_name="Nama Barang", max_length=20)
    merk = models.CharField(verbose_name="Merk Barang", max_length=20)
    stock = models.IntegerField(verbose_name="Stock Barang", max_length=None)
    BAST_perolehan = models.FileField(verbose_name="BAST Perolehan", default=None)