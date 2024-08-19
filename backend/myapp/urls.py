from django.urls import path
from .views import get_items, add_item

urlpatterns = [
    path('items/', get_items),
    path('items/add/', add_item),
]
