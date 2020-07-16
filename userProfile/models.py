from django.db import models
from django.conf import settings

class Profile (models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


SKILL_LEVEL = (
        ('5','تسلط کامل'),
        ('4','زیاد'),
        ('3','متوسط'),
        ('2','کم'),
        ('1','در حد آشنایی'),   
    )


class Skills (models.Model):
    profile = models.ForeignKey("Profile", related_name='skills', on_delete=models.CASCADE)
    title = models.CharField(max_length=30,null=True,blank=True)
    level = models.CharField(max_length=1,choices=SKILL_LEVEL,default="1")
    
    def __str__(self):
        return self.title

class Education (models.Model):
    profile = models.ForeignKey("Profile",related_name="education",on_delete=models.CASCADE)
    title = models.CharField(max_length=50,null=True,blank=True)
    location = models.CharField(max_length=50,null=True,blank=True)
    start = models.DateField()
    end = models.DateField(null=True,blank=True)


    def __str__(self):
        return self.title

class Description(models.Model):
    profile = models.OneToOneField("Profile",related_name="description",on_delete=models.CASCADE)
    text = models.TextField(default="Please write something about yourself...!")
    update = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text