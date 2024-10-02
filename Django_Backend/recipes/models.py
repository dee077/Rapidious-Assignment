from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    # ingredients = models.TextField()
    # cuisine = models.CharField(max_length=100)
    # preparation_time = models.IntegerField()
    # instructions = models.TextField()

    def __str__(self):
        return self.title
