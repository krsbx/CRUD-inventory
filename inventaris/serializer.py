from rest_framework import serializers
from .models import Pegawai, TabelPeminjaman, TabelBarang

#Sertializer modules
#   Used for creating API view

#Each class represent API View
#   Foreach serializer store each model/table
#   Foreach serializer store all required fields for the corresponding API View
#       Each fields contains the all the fields inside the corresponding models

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