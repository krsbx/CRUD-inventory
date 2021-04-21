from rest_framework import serializers
from inventaris.models import TabelGedung, TabelRuang, PeminjamanDetail

#Sertializer modules
#   Used for creating API view

#Each class represent API View
#   Foreach serializer store each model/table
#   Foreach serializer store all required fields for the corresponding API View
#       Each fields contains the all the fields inside the corresponding models

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeminjamanDetail
        fields = ('peminjamanID', 'nomor_peminjaman', 'kode_barang', 'jumlah', 'gedung', 'ruang')

class GedungSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelGedung
        fields = ('gedungID', 'gedung', 'mg_gedung')

class RuangSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelRuang
        fields = ('ruangID', 'ruang', 'pj_ruang', 'gedung')