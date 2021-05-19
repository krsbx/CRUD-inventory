from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken

#Creating Custom User Accounts Models
#   All the models here is responsible for Creating/Managing User Account

class UserAccountsManager(BaseUserManager):
    def create_user(self, nip_nrk, email, password=None, nama_pegawai = None, alamat = None, telp = None, is_active = True, is_staff = False, is_superuser = False):
        if nip_nrk is None:
            raise ValueError('NIP/NRK tidak boleh kosong!')

        if email is None:
            raise ValueError('Email tidak boleh kosong!')

        if nama_pegawai is None:
            raise ValueError('Nama tidak boleh kosong!')

        if alamat is None:
            raise ValueError('Alamat tidak boleh kosong!')

        if telp is None:
            raise ValueError('Nomor Telepon tidak boleh kosong!')

        user = self.model(nip_nrk = nip_nrk, email = self.normalize_email(email), nama_pegawai=nama_pegawai, alamat=alamat, telp=telp, is_active=is_active, is_staff = is_staff, is_superuser = is_superuser)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, nip_nrk, email, password=None, nama_pegawai = None, alamat = None, telp = None, is_active = True, is_staff = False, is_superuser = False):
        if password is None:
            raise ValueError('Super users must have a password!')

        user = self.create_user(nip_nrk, email, password, nama_pegawai, alamat, telp, is_active, is_staff = True, is_superuser = True)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class UserAccounts(AbstractBaseUser, PermissionsMixin):
    nip_nrk = models.CharField(max_length=120, unique=True, null=False, verbose_name="NIP/NRK", primary_key=True)
    email = models.EmailField(max_length=255, unique=True, null = False, verbose_name="Email")
    nama_pegawai = models.CharField(max_length=120, null=False, verbose_name="Nama")
    alamat = models.CharField(max_length=120, null=False, verbose_name="Alamat")
    telp = models.CharField(max_length=120, null=False, verbose_name="No. Telp")
    is_active = models.BooleanField(default=True, verbose_name="Is Activated")
    is_staff = models.BooleanField(default=False, verbose_name="Is Staff")
    is_superuser = models.BooleanField(default=False, verbose_name="Is Superuser")

    USERNAME_FIELD = 'nip_nrk'
    REQUIRED_FIELDS = ['email', 'nama_pegawai', 'alamat', 'telp']

    objects = UserAccountsManager()
    
    def get_full_name(self):
        return self.nama_pegawai

    def get_short_name(self):
        return self.nama_pegawai

    def __str__(self):
        return self.nip_nrk