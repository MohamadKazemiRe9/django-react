from django.urls import path , include
from rest_framework import routers
from .views import ProfileViewSet , SkillsViewSet , EducationViewSet , UserViewSet , DescriptionViewSet
from django.conf import settings

router = routers.DefaultRouter()
router.register('profiles',ProfileViewSet)
router.register('skills',SkillsViewSet)
router.register('education',EducationViewSet)
router.register('users',UserViewSet)
router.register('description',DescriptionViewSet)

urlpatterns = router.urls