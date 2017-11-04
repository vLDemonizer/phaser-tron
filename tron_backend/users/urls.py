from django.conf.urls import url, include

from .views import GameView


urlpatterns = [
    url(r'', GameView.as_view(), name="game"),
]