from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PegawaiSerializer, BarangSerializer, PeminjamanSerializer
from .models import Pegawai, TabelPeminjaman, TabelBarang
from rest_framework import permissions

#All this view is used for API View
#   This view wil be called in urls file
#   Where this view accessible only if the user authenticated

#The View with View class name is for post/get request
#   The View with Detail class name is for detailed request informations

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
    pagination_class = None

    def perform_create(self, serializer):
        return serializer.save(nip_nrk=self.request.user, nama_pegawai=self.request.user.nama_pegawai)

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
    pagination_class = None
    
    def perform_create(self, serializer):
        #Get The Value of each items
        nama_barang = self.request.data.__getitem__('nama_barang')
        kode_barang = self.request.data.__getitem__('kode_barang') if self.request.data.__contains__('kode_barang') else None

        #Check if it exists or not
        if kode_barang:
            return serializer.save()

        else:
            kode_barang = TabelBarang.getKode(nama_barang)
            return serializer.save(kode_barang=kode_barang)

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