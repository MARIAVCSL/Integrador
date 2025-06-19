from django.db import models
  
class Ambientes(models.Model):
    sig = models.IntegerField()
    descricao = models.CharField(max_length=255)
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

    def __str__(self):
        return self.descricao
    

class Sensores(models.Model):
    TIPO_SENSOR = [
        ('temperatura', 'temperatura'),
        ('luminosidade', 'luminosidade'),
        ('umidade', 'umidade'),
        ('contador', 'contador')
    ]
    UNIDADE_MEDIDA = [
        ('°C', '°C'),
        ('Lux', 'Lux'),
        ('%', '%'),
        ('Num', 'Num'),
    ]
    STATUS = [
        ('Ativo', 'Ativo'),
        ('Inativo', 'Inativo')
    ]

    sensor = models.CharField(max_length=255, choices=TIPO_SENSOR)
    mac_addres = models.CharField(max_length=255)
    unidade_med = models.CharField(max_length=10, choices=UNIDADE_MEDIDA)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=50, choices=STATUS)

    def __str__(self):
        return self.sensor
    
class Historico(models.Model):
    sensor = models.ForeignKey(Sensores, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambientes, on_delete=models.CASCADE)
    valor = models.FloatField(max_length=255)
    timestamp = models.DateTimeField()
