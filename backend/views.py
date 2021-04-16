from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PegawaiSerializer, BarangSerializer, PeminjamanSerializer
from .models import Pegawai, Barang, Peminjaman

# Create your views here.
class PegawaiView(generics.CreateAPIView):
    queryset = Pegawai.objects.all()
    serializer_class = PegawaiSerializer

class PeminjamanView(generics.CreateAPIView):
    queryset = Peminjaman.objects.all()
    serializer_class = PeminjamanSerializer

class BarangView(generics.CreateAPIView):
    queryset = Barang.objects.all()
    serializer_class = BarangSerializer