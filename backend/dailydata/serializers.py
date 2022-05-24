from rest_framework import serializers
from .models import DataInfo

class DataInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataInfo
        fields = '__all__'