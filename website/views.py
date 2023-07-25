from django.shortcuts import render, HttpResponse, redirect
from django.db.models import Q
from .models import Table, Waiting
import datetime as dt
import time
from django.contrib import messages
from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth.models import User
# from .models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required


def loginPage(request):
    context = {
        'page':'login',
    }
    
    if not request.user.is_authenticated:
        if request.method == "POST":
            username = request.POST.get('username').lower()
            password = request.POST.get('password')
            
            
            try:
                # cari ada akun dengan email itu
                user = User.objects.get(username=username)
            except:
                # jika tidak ada akun dengan email itu
                # messages.error(request=request, message='The Account is not registered')
                context['no_account'] = 'The Account is not registered'
                return render(request=request, template_name='login.html', context=context)
                
            # give us error or return User object that matches email and pass credentials
            user = authenticate(request=request, username=username, password=password)
            
            # jika user ter autentikasi
            if user is not None:
                login(request=request, user=user)
                return redirect('home')
            
            # akunnya terdaftar dengan email, tapi password salah
            else:
                # messages.error(request=request, message='Username or password incorrect')
                context['no_authentication'] = 'Username or password is incorrect'
        
        return render(request=request, template_name='login.html', context=context)

    else:
        return redirect('home')

    # return render(request=request, template_name='login.html', context=context)

def logoutPage(request):
    logout(request=request)
    return redirect('home')
    

def home(request):
    context = {'page':'home'}
    return render(request=request, template_name='home.html', context=context)

@login_required(login_url='login')
def adminInput(request):
    if request.method == 'POST':
        if request.POST.get('tambah_informasi'):
            time.sleep(1.25)
            
            start_time = dt.datetime.now() # type : datetime.time
            play_time = request.POST.get('play_time')
            play_time = dt.datetime.strptime(play_time, '%H:%M').time() # jadiin string time ke type datetime.time
            play_time = dt.timedelta(hours=play_time.hour, minutes=play_time.minute)
            finish = (start_time + play_time).time() # jumlahin waktu mulai dan waktu bermain
            
            table = Table.objects.get(table_number=request.POST.get('table_number')) # ambil objek table
            table.player = request.POST.get('player').lower()
            table.start = start_time
            table.play_time = play_time
            table.finish = finish
            table.save()
            return redirect('input-admin')

        elif request.POST.get('tambah_waiting'):
            time.sleep(1.25)
            
            player = request.POST.get('player')
            
            play_time = request.POST.get('play_time')
            play_time = dt.datetime.strptime(play_time, '%H:%M').time() # jadiin string time ke type datetime.time
            play_time = dt.timedelta(hours=play_time.hour, minutes=play_time.minute)
            
            queue = len(Waiting.objects.all()) + 1
            
            waiting = Waiting.objects.create(player=player, play_time=play_time, queue=queue)
            waiting.save()
            
            return redirect('input-admin')
            
        elif request.POST.get('set_table'):
            time.sleep(1.25)
            
            player = request.POST.get('player').lower()
            table_num = request.POST.get('table_number')

            # waktu mulai, waktu main, waktu berakhir
            start_time = dt.datetime.now()                              # type : datetime.time
            play_time = request.POST.get('play_time')
            play_time = dt.datetime.strptime(play_time, '%H:%M').time() # jadiin string time ke type datetime.time
            play_time = dt.timedelta(hours=play_time.hour, minutes=play_time.minute)
            finish = (start_time + play_time).time()                    # jumlahin waktu mulai dan waktu bermain
            
            table = Table.objects.get(table_number=table_num) # ambil objek table
            table.player = player
            table.start = start_time
            table.play_time = play_time
            table.finish = finish
            table.save()
            
            
            id_waiting = request.POST.get('queue')
            waiting = Waiting.objects.get(queue=id_waiting)
            waiting.is_served = True
            waiting.save()
            
            # Update the queue numbers and remove served entries
            Waiting.update_queue()
           
            return redirect('input-admin')
            
    
    else:
        tables = Table.objects.all()
        waitings = Waiting.objects.all()
        
        json_table = serializers.serialize('json', tables)
        json_waiting = serializers.serialize('json', waitings)
        
        # True jika penuh False jika ada yg kosong
        full = True if not Table.objects.filter(Q(player__icontains='EMPTY')) else False
        
        context = {
            'page':'input-admin',
            'hor_tables': tables[:8],
            'ver_tables': tables[8:],
            'full' : full,
            'waitings':waitings,
            'json_waiting': json_waiting,
            'json_table': json_table
            }
        
        return render(request=request, template_name='input.html',context=context)
    

def viewTables(request):
    tables = Table.objects.all()
    json_table = serializers.serialize('json', tables)

    waitings = Waiting.objects.all()
    

    context = {
        'page':'preview',
        'hor_tables': tables[:8],
        'ver_tables': tables[8:],
        'json_table': json_table,
        'waitings':waitings,
    }
    return render(request=request, template_name='view.html', context=context)


def test(request):
    queryset = Waiting.objects.all()
    json_data = serializers.serialize('json', queryset)
    
    return render(request=request, template_name='test.html', context={'json_data': json_data})