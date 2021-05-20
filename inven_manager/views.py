from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from inventaris.models import TabelRuang, TabelGedung, PeminjamanDetail
from .serializer import DetailSerializer, GedungSerializer, RuangSerializer
from rest_framework import permissions

#All this view is used for API View
#   This view wil be called in urls file
#   Where this view accessible only if the user authenticated

#The View with View class name is for post/get request
#   The View with Detail class name is for detailed request informations

class RuangList(ListCreateAPIView):
    serializer_class = RuangSerializer
    queryset = TabelRuang.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class RuangDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = RuangSerializer
    queryset = TabelRuang.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "ruang"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

class GedungList(ListCreateAPIView):
    serializer_class = GedungSerializer
    queryset = TabelGedung.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

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
        return self.queryset.filter()

class DetailList(ListCreateAPIView):
    serializer_class = DetailSerializer
    queryset = PeminjamanDetail.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.all()

class DetailPemDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = DetailSerializer
    queryset = PeminjamanDetail.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "nomor_peminjaman"

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()