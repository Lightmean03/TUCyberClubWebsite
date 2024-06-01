from rest_framework import serializers
from ...models import Post
from django.contrib.auth import get_user_model

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())

    class Meta:
        model = Post
        fields = '__all__'
    
    def create(self, validated_data):
        return Post.objects.create(**validated_data)
     
    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.ranking = validated_data.get('ranking', instance.ranking)
        instance.teamname = validated_data.get('teamname', instance.teamname)
        instance.Score = validated_data.get('Score', instance.Score)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
