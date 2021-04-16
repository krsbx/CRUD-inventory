from rest_framework import serializers
from .models import Pegawai, Barang, Peminjaman

class PegawaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pegawai
        fields = ('nip_nrk', 'nama', 'alamat', 'telp')

class PeminjamanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peminjaman
        fields = ('barangId', 'nomor_peminjaman', 'nip_nrk', 'tgl_pinjam', 'tgl_kembali', 'BAST_disposisi')

class BarangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barang
        fields = ('barangId', 'kode_barang', 'nama_barang', 'merk', 'stock', 'BAST_perolehan')