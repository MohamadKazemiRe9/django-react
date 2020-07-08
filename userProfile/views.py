from django.shortcuts import render
from rest_framework import viewsets , permissions
from .models import Profile , Skills , Education
from .serializers import ProfileSerializer,SkillsSerializer,EducationSerializer,UserSerializers
from rest_framework.decorators import action
# from users.models import MyUser as User
from django.contrib.auth import get_user_model
from rest_framework import viewsets , mixins

"""
class SampleViewSet(mixins.CreateModelMixin, 
                    mixins.RetrieveModelMixin, 
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
"""

class UserViewSet(mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializers
    permission_classes = [
        permissions.AllowAny
    ]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [
        permissions.AllowAny
    ]
