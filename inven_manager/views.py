from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from inventaris.models import TabelRuang, TabelPeminjaman, TabelGedung, TabelBarang, PeminjamanDetail
from inventaris.serializer import BarangSerializer, PeminjamanSerializer, DetailSerializer, GedungSerializer, RuangSerializer
from rest_framework import permissions

# Create your views here.
class RuangList(ListCreateAPIView):
    serializer_class = RuangSerializer
    queryset = TabelRuang.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class RuangDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = RuangSerializer
    queryset = TabelRuang.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "gedung"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class GedungList(ListCreateAPIView):
    serializer_class = GedungSerializer
    queryset = TabelGedung.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class GedungDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = GedungSerializer
    queryset = TabelGedung.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "gedung"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class DetailList(ListCreateAPIView):
    serializer_class = DetailSerializer
    queryset = PeminjamanDetail.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class DetailPemDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = DetailSerializer
    queryset = PeminjamanDetail.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "peminjamanID"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()