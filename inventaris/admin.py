from django.contrib import admin
from .models import Pegawai, TabelPeminjaman, TabelBarang, TabelGedung, TabelRuang, PeminjamanDetail

# Register your models here.
class pegawaiAdmin(admin.ModelAdmin):
    list_display = ('nip_nrk', 'nama_pegawai', 'alamat', 'telp')

class peminjamanAdmin(admin.ModelAdmin):
    list_display = ('id_Peminjaman', 'nomor_peminjaman', 'nip_nrk', 'nama_pegawai', 'tgl_pinjam', 'tgl_kembali', 'BAST_disposisi')

class barangAdmin(admin.ModelAdmin):
    list_display = ('barangId', 'kode_barang', 'nama_barang', 'merk', 'stock', 'BAST_perolehan')

class gedungAdmin(admin.ModelAdmin):
    list_display = ('gedungID', 'gedung', 'mg_gedung')

class ruangAdmin(admin.ModelAdmin):
    list_display = ('ruangID', 'ruang', 'pj_ruang', 'gedung')

class detailPinjam(admin.ModelAdmin):
    list_display = ('peminjamanID', 'nomor_peminjaman', 'kode_barang', 'nama_barang', 'jumlah', 'gedung', 'ruang')

admin.site.register(TabelPeminjaman, peminjamanAdmin)
admin.site.register(TabelBarang, barangAdmin)
admin.site.register(TabelGedung, gedungAdmin)
admin.site.register(TabelRuang, ruangAdmin)
admin.site.register(PeminjamanDetail, detailPinjam)