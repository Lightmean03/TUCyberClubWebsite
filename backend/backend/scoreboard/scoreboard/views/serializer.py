from rest_framework import serializers
from ...models import ScoreboardEntry

class ScoreboardEntrySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ScoreboardEntry
        fields = ['id', 'username', 'score', 'ranking', 'teamname', 'timestamp']
        read_only_fields = ['id', 'ranking', 'timestamp']