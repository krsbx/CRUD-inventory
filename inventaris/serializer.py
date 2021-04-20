from rest_framework import serializers
from .models import Pegawai, TabelPeminjaman, TabelBarang

class PegawaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pegawai
        fields = ('nip_nrk', 'nama', 'alamat', 'telp')

class PeminjamanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelPeminjaman
        fields = ('id_Peminjaman', 'nomor_peminjaman', 'nip_nrk', 'nama_pegawai', 'tgl_pinjam', 'tgl_kembali', 'BAST_disposisi')

class BarangSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelBarang
        fields = ('barangId', 'kode_barang', 'nama_barang', 'merk', 'stock', 'BAST_perolehan')