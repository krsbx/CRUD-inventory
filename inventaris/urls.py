from django.urls import path
from .views import PegawaiView, BarangView, PeminjamanView, DetailView, GedungView, RuangView

urlpatterns = [
    path('pegawai/', PegawaiView.as_view()),
    path('barang/', BarangView.as_view()),
    path('peminjaman/', PeminjamanView.as_view()),
    path('detail/', DetailView.as_view()),
    path('gedung/', GedungView.as_view()),
    path('ruang/', RuangView.as_view()),
]
