from django.contrib import admin
from .models import Profile , Skills , Education , Description

admin.site.register(Profile)
admin.site.register(Skills)
admin.site.register(Education)
admin.site.register(Description)