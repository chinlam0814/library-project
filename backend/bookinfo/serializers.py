from rest_framework import serializers
from .models import BookImage, BookInfo

class BookInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookInfo
        fields = '__all__'

class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        fields = '__all__'