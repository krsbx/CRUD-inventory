from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import RegisterSerializer, LoginSerializer
from rest_framework import permissions
from .models import UserAccounts


#All this view is used for API View
#   This view wil be called in urls file
#   The register view used for user registraion page
#   The login view used for user login page

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        
        return Response(user_data, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class PegawaiView(generics.ListAPIView):
    queryset = UserAccounts.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return self.queryset.all()