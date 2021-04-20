from rest_framework import serializers
from inventaris.models import TabelGedung, TabelRuang, PeminjamanDetail

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeminjamanDetail
        fields = ('peminjamanID', 'nomor_peminjaman', 'kode_barang', 'nama_barang', 'jumlah', 'gedung', 'ruang')

class GedungSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelGedung
        fields = ('gedungID', 'gedung', 'mg_gedung')

class RuangSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelRuang
        fields = ('ruangID', 'ruang', 'pj_ruang', 'gedung')