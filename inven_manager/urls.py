from django.urls import  path
from .views import RuangDetail, RuangList, GedungList, GedungDetail, DetailList, DetailPemDetail

urlpatterns = [
    path('ruangList/', RuangList.as_view(), name="Ruang List"),
    path('ruangList/<str:gedung>', RuangDetail.as_view(), name="Ruang Detail"),
    path('gedungList/', GedungList.as_view(), name="Gedung List"),
    path('gedungList/<str:gedung>', GedungDetail.as_view(), name="Gedung Detail"),
    path('detailList/', DetailList.as_view(), name="Detail List"),
    path('detailList/<str:peminjamanID>', DetailPemDetail.as_view(), name="Detail Peminjaman"),
]