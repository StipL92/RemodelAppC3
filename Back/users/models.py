from django.db import models

class User(models.Model):
    
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    
    def __str__(self):
        txt = "{0}"
        return txt.format(self.username)