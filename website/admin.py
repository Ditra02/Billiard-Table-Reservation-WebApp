from django.contrib import admin
from .models import Table, Waiting

# Register your models here.
class TableList(admin.ModelAdmin):
    list_display = ('player', 'start', 'play_time', 'finish', 'table_number')
    
    ordering = ['id']

admin.site.register(Table, TableList)

class WaitingList(admin.ModelAdmin):
    list_display = ('player', 'play_time', 'queue', 'is_served')

admin.site.register(Waiting, WaitingList)