from django.db import models
from django.contrib.auth.models import User
from authentications.models import UserAccounts
from django.utils.translation import gettext_lazy as _
import string
import random
import datetime

# Create your models here.
class Pegawai(models.Model):
    nip_nrk = models.CharField(max_length=120, unique=True, null=False)
    nama = models.CharField(max_length=120, null=False)
    alamat = models.CharField(max_length=120, null=False)
    telp = models.CharField(max_length=120, unique=True, null=False)

#Barang Models/Table
#   Primary Key => Kode Barang
class TabelBarang(models.Model):
    #Used for generating Barang ID
    def getTotalCount():
        count = TabelBarang.objects.all().count()
        return 'BAR_{}'.format(str(count+1).zfill(5))

    #Use for generating Kode Barang
    def getKode(nama_barang):
        trimmed = [nama_barang[0:3], nama_barang[len(nama_barang)-3:len(nama_barang)]]
        return '{}_{}'.format(trimmed[0], trimmed[1])

    barangId = models.CharField(verbose_name="ID Barang", max_length=20, default=getTotalCount, null=False)
    kode_barang = models.CharField(verbose_name="Kode Barang", max_length=20, default=None, null=False, unique=True, primary_key=True)
    nama_barang = models.CharField(verbose_name="Nama Barang", max_length=20, null=False, unique=True)
    merk = models.CharField(verbose_name="Merk Barang", max_length=20, null=False)
    stock = models.IntegerField(verbose_name="Stock Barang", max_length=None, null=False)
    BAST_perolehan = models.URLField(verbose_name="BAST Perolehan", default=None, null=False)

#Peminjaman Model/Table
#   Primary Key => nomor peminjaman
class TabelPeminjaman(models.Model):
    #Used for generating ID Peminjaman
    def getTotalCount():
        count = TabelPeminjaman.objects.all().count()
        return 'PIN_{}'.format(str(count+1).zfill(5))

    #Used for generating Nomor Peminjaman
    def getNomor():
        length = 8

        #Do a loop to get a random numbers
        while True:
            code = ''.join(random.choices(string.hexdigits, k=length))

            if TabelPeminjaman.objects.filter(nomor_peminjaman=code).count() == 0: 
                break

        return code

    id_Peminjaman = models.CharField(verbose_name="ID Peminjaman", max_length=10, default=getTotalCount, null=False)
    nomor_peminjaman = models.CharField(verbose_name="Nomor Peminjaman", max_length=10, default=getNomor, null=False, primary_key=True)
    nip_nrk = models.ForeignKey(UserAccounts, on_delete=models.CASCADE, verbose_name="NIP/NRK", default=None)
    nama_pegawai = models.CharField(max_length=120, null=False, default=None, verbose_name="Nama Pegawai")
    tgl_pinjam = models.DateField(verbose_name="Tanggal Peminjaman", help_text="Masukkan Tanggal Peminjaman", default=datetime.date.today, null=False)
    tgl_kembali = models.DateField(verbose_name="Tanggal Pengembalian", help_text="Masukkan Tanggal Pengembalian", null=True)
    BAST_disposisi = models.URLField(verbose_name="BAST Diposisi", default=None, null=False)

#Gedung Model/Table
#   Primary Key => Gedung
class TabelGedung(models.Model):
    #Used for generating ID Peminjaman
    def getTotalCount():
        count = TabelGedung.objects.all().count()
        return 'GED_{}'.format(str(count+1).zfill(5))

    gedungID = models.CharField(verbose_name="ID Gedung", max_length=10, default=getTotalCount, null=False)
    gedung = models.CharField(verbose_name="Gedung", max_length=8, default=None, null=False, primary_key=True)
    mg_gedung = models.CharField(verbose_name="MG Gedung", max_length=120, null=False, default=None)

#Ruang Model/Table
#   Primary Key => Ruang
class TabelRuang(models.Model):
    #Used for generating ID Ruang
    def getTotalCount():
        count = TabelRuang.objects.all().count()
        return 'RNG_{}'.format(str(count+1).zfill(5))

    ruangID = models.CharField(verbose_name="ID Ruang", max_length=10, default=getTotalCount, null=False)
    ruang = models.CharField(verbose_name="Ruang", max_length=8, default=None, null=False, primary_key=True)
    pj_ruang = models.CharField(verbose_name="PJ Ruang", max_length=120, null=False, default=None)
    gedung = models.ForeignKey(TabelGedung, on_delete=models.CASCADE, verbose_name="Gedung")

#Peminjaman Model/Table
#   Primary Key => No Peminjaman
class PeminjamanDetail(models.Model):
    #Used for generating Peminjaman ID
    def getTotalCount():
        count = PeminjamanDetail.objects.all().count()
        return 'DET_{}'.format(str(count+1).zfill(5))

    #Used for object condition
    class ObjectConditions(models.TextChoices):
        RUSAK = 'Rusak', _('Rusak')
        PENDING = 'Pending', _('Pending')
        BAIK = 'Baik', _('Baik')

    peminjamanID = models.CharField(verbose_name="ID Peminjaman", max_length=10, default=getTotalCount, primary_key=True)
    nomor_peminjaman = models.ForeignKey(TabelPeminjaman, on_delete=models.CASCADE, verbose_name="Nomor Peminjaman")
    kode_barang = models.ForeignKey(TabelBarang, on_delete=models.CASCADE, verbose_name="Kode Barang")
    nama_barang = models.ForeignKey(TabelBarang, related_name="nama_barang+", on_delete=models.CASCADE, to_field="nama_barang", verbose_name="Nama Barang")
    jumlah = models.IntegerField(verbose_name="Jumlah Peminjaman", max_length=None, null=False)
    gedung = models.ForeignKey(TabelGedung, on_delete=models.CASCADE, verbose_name="Gedung")
    ruang = models.ForeignKey(TabelRuang, on_delete=models.CASCADE, verbose_name="Ruang")
    status = models.BooleanField(verbose_name="Dikembalikan", default=False)
    kondisi = models.CharField(max_length=10, choices=ObjectConditions.choices, null=True, default=ObjectConditions.PENDING)