from django.urls import path
from . import views

urlpatterns = [
    path('pegawai/', views.PegawaiView.as_view()),
    path('barang/', views.BarangView.as_view()),
    path('peminjaman/', views.PeminjamanView.as_view())
]
