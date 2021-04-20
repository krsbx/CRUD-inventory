from django.urls import  path
from .views import RuangDetail, RuangList, GedungList, GedungDetail, DetailList, DetailPemDetail

urlpatterns = [
    path('ruang/', RuangList.as_view(), name="Ruang List"),
    path('ruang/<str:gedung>', RuangDetail.as_view(), name="Ruang Detail"),
    path('gedung/', GedungList.as_view(), name="Gedung List"),
    path('gedung/<str:gedung>', GedungDetail.as_view(), name="Gedung Detail"),
    path('detail/', DetailList.as_view(), name="Detail List"),
    path('detail/<str:peminjamanID>', DetailPemDetail.as_view(), name="Detail Peminjaman"),
]