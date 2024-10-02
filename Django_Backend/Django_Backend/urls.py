from django.contrib import admin
from django.urls import path, include
from recipes.views import RecipeList

urlpatterns = [
    path('', RecipeList.as_view(), name='recipe-list'),
    path('admin/', admin.site.urls),
    path('api/', include('recipes.urls')),
]
