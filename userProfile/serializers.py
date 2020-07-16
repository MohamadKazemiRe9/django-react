from rest_framework import serializers
from .models import Profile , Skills , Education , Description
# from users.models import MyUser
from django.contrib.auth import get_user_model
from users.models import MyUser as User
from rest_framework.authtoken.models import Token
from userProfile.models import Profile

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ('id','profile','title','level')

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ("id",'profile','title','location','start','end')

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ("id",'profile','text','update')

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password':{'write_only':True,"required":True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        profile = Profile.objects.create(user=user)
        Description.objects.create(profile=profile)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializers(many=False)
    skills = SkillsSerializer(many=True)
    education = EducationSerializer(many=True)
    description = DescriptionSerializer(many=False)
    class Meta:
        model = Profile
        fields = ("id",'skills','user',"education","description")