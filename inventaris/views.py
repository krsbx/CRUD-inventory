from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PegawaiSerializer, BarangSerializer, PeminjamanSerializer
from .models import Pegawai, TabelPeminjaman, TabelBarang
from rest_framework import permissions

# Create your views here.
class PegawaiView(generics.ListCreateAPIView):
    queryset = Pegawai.objects.all()
    serializer_class = PegawaiSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class PegawaiDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pegawai.objects.all()
    serializer_class = PegawaiSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "nip_nrk"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

class PeminjamanView(generics.ListCreateAPIView):
    queryset = TabelPeminjaman.objects.all()
    serializer_class = PeminjamanSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class PeminjamanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TabelPeminjaman.objects.all()
    serializer_class = PeminjamanSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "nomor_peminjaman"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

class BarangView(generics.ListCreateAPIView):
    queryset = TabelBarang.objects.all()
    serializer_class = BarangSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class BarangDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TabelBarang.objects.all()
    serializer_class = BarangSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "kode_barang"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()