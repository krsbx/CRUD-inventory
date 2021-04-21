from django.db import models
from django.contrib.auth.models import User
from authentications.models import UserAccounts
import datetime

# Create your models here.
class Pegawai(models.Model):
    nip_nrk = models.CharField(max_length=120, unique=True, null=False)
    nama = models.CharField(max_length=120, null=False)
    alamat = models.CharField(max_length=120, null=False)
    telp = models.CharField(max_length=120, unique=True, null=False)

#Barang Models
#   Primary Key => Kode Barang
class TabelBarang(models.Model):
    barangId = models.CharField(verbose_name="ID Barang", max_length=20, null=False)
    kode_barang = models.CharField(verbose_name="Kode Barang", max_length=20, null=False, unique=True, primary_key=True)
    nama_barang = models.CharField(verbose_name="Nama Barang", max_length=20, null=False)
    merk = models.CharField(verbose_name="Merk Barang", max_length=20, null=False)
    stock = models.IntegerField(verbose_name="Stock Barang", max_length=None, null=False)
    BAST_perolehan = models.FileField(verbose_name="BAST Perolehan", default=None, null=False)

#Peminjaman Model
#   Primary Key => nomor peminjaman
class TabelPeminjaman(models.Model):
    id_Peminjaman = models.CharField(verbose_name="ID Peminjaman", max_length=10, default=None, null=False)
    # Will Create a functions to get a random nomor peminjaman
    nomor_peminjaman = models.CharField(verbose_name="Nomor Peminjaman", max_length=10, default=None, null=False, primary_key=True)
    nip_nrk = models.ForeignKey(UserAccounts, on_delete=models.CASCADE, verbose_name="NIP/NRK", default=None)
    nama_pegawai = models.CharField(max_length=120, null=False, default=None, verbose_name="Nama Pegawai")
    tgl_pinjam = models.DateField(verbose_name="Tanggal Peminjaman", help_text="Masukkan Tanggal Peminjaman", default=datetime.date.today, null=False)
    tgl_kembali = models.DateField(verbose_name="Tanggal Pengembalian", help_text="Masukkan Tanggal Pengembalian", null=True)
    BAST_disposisi = models.FileField(verbose_name="BAST Diposisi", default=None, null=False)

#Gedung Model
#   Primary Key => Gedung
class TabelGedung(models.Model):
    gedungID = models.CharField(verbose_name="ID Gedung", max_length=10, default=None, null=False)
    gedung = models.CharField(verbose_name="Gedung", max_length=8, default=None, null=False, primary_key=True)
    mg_gedung = models.CharField(verbose_name="MG Gedung", max_length=120, null=False, default=None)

#Ruang Model
#   Primary Key => Ruang
class TabelRuang(models.Model):
    ruangID = models.CharField(verbose_name="ID Ruang", max_length=10, default=None, null=False)
    ruang = models.CharField(verbose_name="Ruang", max_length=8, default=None, null=False, primary_key=True)
    pj_ruang = models.CharField(verbose_name="PJ Ruang", max_length=120, null=False, default=None)
    gedung = models.ForeignKey(TabelGedung, on_delete=models.CASCADE, verbose_name="Gedung")

#Peminjaman Model
#   Primary Key => No Peminjaman
class PeminjamanDetail(models.Model):
    peminjamanID = models.CharField(verbose_name="ID Peminjaman", max_length=10, default=None, primary_key=True)
    nomor_peminjaman = models.ForeignKey(TabelPeminjaman, on_delete=models.CASCADE, verbose_name="Nomor Peminjaman")
    kode_barang = models.ForeignKey(TabelBarang, on_delete=models.CASCADE, verbose_name="Kode Barang")
    nama_barang = None
    jumlah = models.IntegerField(verbose_name="Jumlah Peminjaman", max_length=None, null=False)
    gedung = models.ForeignKey(TabelGedung, on_delete=models.CASCADE, verbose_name="Gedung")
    ruang = models.ForeignKey(TabelRuang, on_delete=models.CASCADE, verbose_name="Ruang")