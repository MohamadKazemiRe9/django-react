from django.urls import path , include
from rest_framework import routers
from .views import ProfileViewSet , SkillsViewSet , EducationViewSet , UserViewSet
from django.conf import settings

router = routers.DefaultRouter()
router.register('profiles',ProfileViewSet)
router.register('skills',SkillsViewSet)
router.register('education',EducationViewSet)
router.register('users',UserViewSet)

urlpatterns = router.urls