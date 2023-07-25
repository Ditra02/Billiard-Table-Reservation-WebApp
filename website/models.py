from django.db import models
from django.db.models import F
import datetime

class Table(models.Model):
    player = models.CharField(max_length=200, null=False, blank=True, default='EMPTY')
    table_number = models.IntegerField(null=True, blank=True, unique=True, default=0)
    
    start = models.TimeField(null=True, blank=True, auto_now=True) # auto_now setiap di save waktu start terupdate
    play_time = models.DurationField(null=True, blank=True)
    finish = models.TimeField(null=True, blank=True)
    
    
    def __str__(self):
        return self.player

class Waiting(models.Model):
    player = models.CharField(max_length=200, null=True, blank=False)
    play_time = models.DurationField(null=True, blank=True, default=datetime.time(hour=0, minute=0, second=0))
    queue = models.IntegerField(null=True, blank=True, unique=False)
    is_served = models.BooleanField(default=False)
    
    @classmethod # decorator yang membuat method ini dapat dipanggil dengan kelas tidak dengan instance atau objek
    def update_queue(cls):
        # Get the minimum queue number of the served entries
        min_served_queue = cls.objects.filter(is_served=True).aggregate(models.Min('queue'))['queue__min']

        # Update the queue numbers of unserved entries
        cls.objects.filter(is_served=False).update(queue=F('queue') - min_served_queue)

        # Clear the served entries from the waiting list
        cls.objects.filter(is_served=True).delete()

    def __str__(self):
        return self.player
    
    '''
    method ini berfungsi untuk mengupdate angka antrian(objek) yang belum dilayani dan menghapus
    antrian yang sudah dilayani.
    
    step
    1. mendapatkan angka antrian terkecil dari antrian yang sudah dilayani menggunakan method aggregate bersama dengan fungsi 'Min'.

    2. line 29, mengupdate angka dari antrian yang belum dilayani dengan mengurangi angka antrian yang sudah dilayani dari angka antrian saat itu menggunakan fungsi F untuk menunjuk nilai saat itu dari field queue.
    
    3.setelah mengupdate angka antrian, line 32, menghapus antrian yang sudah dilayani dari waiting list menggunakan method delete.
    
    cls == self
    '''