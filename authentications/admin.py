from django.contrib import admin
from .models import UserAccounts

# Register your models here.
class userAdmin(admin.ModelAdmin):
    list_display = ('nip_nrk', 'email', 'password', 'nama', 'alamat', 'telp', 'is_active', 'is_staff', 'is_superuser')

admin.site.register(UserAccounts, userAdmin)