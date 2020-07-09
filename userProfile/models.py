from django.db import models
from django.conf import settings

class Profile (models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE)
    description = models.TextField(null=True,blank=True)
    # skill = models.ManyToManyField("Skills" , related_name="skills")
    education = models.ManyToManyField("Education" , related_name="education")

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
    title = models.CharField(max_length=20)
    start = models.DateField()
    end = models.DateField()


    def __str__(self):
        return self.title