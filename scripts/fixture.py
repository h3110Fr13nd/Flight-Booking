

from main.models import *
from main.utils import  createWeekDays, addPlaces, addDomesticFlights
def run():
    if len(Week.objects.all()) == 0:
        createWeekDays()

    if len(Place.objects.all()) == 0:
        addPlaces()

    if len(Flight.objects.all()) == 0:
        addDomesticFlights()
        print("Flights added successfully.")

