from django.contrib import admin
from .models import Pegawai, Peminjaman, Barang

# Register your models here.
class pegawaiAdmin(admin.ModelAdmin):
    list_display = ('nip_nrk', 'nama', 'alamat', 'telp')

class peminjamanAdmin(admin.ModelAdmin):
    list_display = ('barangId', 'nomor_peminjaman', 'nip_nrk', 'tgl_pinjam', 'tgl_kembali', 'BAST_disposisi')

class barangAdmin(admin.ModelAdmin):
    list_display = ('barangId', 'kode_barang', 'nama_barang', 'merk', 'stock', 'BAST_perolehan')

admin.site.register(Pegawai, pegawaiAdmin)
admin.site.register(Peminjaman, peminjamanAdmin)
admin.site.register(Barang, barangAdmin)