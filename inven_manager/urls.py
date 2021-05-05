from django.urls import  path
from .views import RuangDetail, RuangList, GedungList, GedungDetail, DetailList, DetailPemDetail, AllGedung, AllRuang, AllDetail

#Store all urls will be used in website
#   Foreach ulrs in this apps need to be call with api link

urlpatterns = [
    path('ruang/', RuangList.as_view(), name="Ruang List"),
    path('ruang/<str:ruang>', RuangDetail.as_view(), name="Ruang Detail"),
    path('allRuang/', AllRuang.as_view()),


    path('gedung/', GedungList.as_view(), name="Gedung List"),
    path('gedung/<str:gedung>', GedungDetail.as_view(), name="Gedung Detail"),
    path('allGedung/', AllGedung.as_view()),

    path('detail/', DetailList.as_view(), name="Detail List"),
    path('detail/<str:nomor_peminjaman>', DetailPemDetail.as_view(), name="Detail Peminjaman"),
    path('allDetail/', AllDetail.as_view()),
]