import pandas as pd
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
import time

# Load NGO data
input_csv = 'ngo_data.csv'
df = pd.read_csv(input_csv)

# Initialize geocoder
geolocator = Nominatim(user_agent="ngo_locator")
geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)

def get_lat_lon(address):
    try:
        location = geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except Exception as e:
        print(f"Error geocoding {address}: {e}")
        return None, None

# Geocode addresses
lats = []
lons = []
for addr in df['address']:
    lat, lon = get_lat_lon(addr)
    lats.append(lat)
    lons.append(lon)
    print(f"Geocoded: {addr} -> {lat}, {lon}")
    time.sleep(1)  # To respect Nominatim's rate limit

df['latitude'] = lats
df['longitude'] = lons

df.to_csv('ngo_geocoded.csv', index=False)
print("Geocoding complete. Saved to ngo_geocoded.csv.") 