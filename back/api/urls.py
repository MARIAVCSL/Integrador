from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    # Autenticação
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Sensores
    path('sensores/', SensoresView.as_view(), name='sensores-list-create'),
    path('sensores/<int:pk>/', SensoresDetailView.as_view(), name='sensores-detail'),
    path('upload-sensores/', UploadXLSXView.as_view(), name='upload-sensores'),
    path('exportar/sensores/xlsx/', exportar_xlsx_sensores, name='exportar_xlsx_sensores'),

    # Ambientes
    path('ambientes/', AmbientesView.as_view(), name='ambientes-list-create'),
    path('ambientes/<int:pk>/', AmbientesDetailView.as_view(), name='ambiente-detail'),
    path('upload-xlsx/', UploadXLSXView_amb.as_view(), name='upload-xlsx'),
    path('exportar/ambientes/xlsx/', exportar_xlsx_ambientes, name='exportar_xlsx_ambientes'),

    # Historico
    path('historico/', HistoricoView.as_view(), name='historico-list-create'),
    path('historico/<int:pk>/', HistoricoDetailView.as_view(), name='historico-detail'),
    path('upload-historico/', ImportHistoricoView.as_view(), name='upload-historico'),
    path('exportar/historico/xlsx/', exportar_xlsx_historico, name='exportar_xlsx_historico'),
    path('exportar_historico_excel/', exportar_historico_excel),
]
