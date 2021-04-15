from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name='login-page'),
    path('login/', views.Login, name='login-page'),
    path('about/', views.About, name='login-page'),
    path('pegawai/', views.PegawaiView.as_view()),
    path('barang/', views.BarangView.as_view()),
    path('peminjaman/', views.PeminjamanView.as_view())
]
