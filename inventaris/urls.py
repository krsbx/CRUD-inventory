from django.urls import path
from .views import BarangView, PeminjamanView, BarangDetail, PeminjamanDetail

urlpatterns = [
    path('barang/', BarangView.as_view()),
    path('barang/<str:kode_barang>', BarangDetail.as_view()),
    path('peminjaman/', PeminjamanView.as_view()),
    path('peminjaman/<str:nomor_peminjaman>', PeminjamanDetail.as_view()),
]
