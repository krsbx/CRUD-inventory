from django.urls import path
from .views import BarangView, AllBarang, PeminjamanView, BarangDetail, PeminjamanDetail

#Store all urls will be used in website
#   Foreach ulrs in this apps need to be call with api link

urlpatterns = [
    path('barang/', BarangView.as_view()),
    path('barang/<str:kode_barang>', BarangDetail.as_view()),
    path('allBarang/', AllBarang.as_view()),
    path('peminjaman/', PeminjamanView.as_view()),
    path('peminjaman/<str:nomor_peminjaman>', PeminjamanDetail.as_view()),
]
