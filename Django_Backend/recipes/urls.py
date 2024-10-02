from django.urls import path
from .views import RecipeFilter, UniqueKeysList

urlpatterns = [
    path('recipes_filter/', RecipeFilter.as_view(), name='recipe-filter'),
    path('unique_keys/', UniqueKeysList.as_view(), name='uniqye-keys-list')
]
