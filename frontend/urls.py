from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about/', index),
    path('login/', index),
    path('logout/', index),
    path('register/', index),
    path('peminjaman/', index),
    path('detail/<str:nomor_peminjaman>', index),
    path('detail/', index),
    path('barang/', index),
    path('barang/<str:kode_barang>', index),
    path('barang/edit/<str:kode_barang>', index),
    path('gedung/', index),
    path('gedung/edit/<str:gedung>', index),
    path('ruang/', index),
    path('ruang/edit/<str:ruang>', index),
]
