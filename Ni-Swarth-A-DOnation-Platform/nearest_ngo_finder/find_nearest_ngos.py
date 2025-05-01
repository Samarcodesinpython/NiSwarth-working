import pandas as pd
import argparse
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from math import radians, sin, cos, sqrt, atan2

# Haversine formula
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def get_lat_lon_from_address(address):
    geolocator = Nominatim(user_agent="ngo_locator_user")
    geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)
    location = geocode(address)
    if location:
        return location.latitude, location.longitude
    else:
        raise ValueError(f"Could not geocode address: {address}")

def main():
    parser = argparse.ArgumentParser(description="Find top 5 nearest NGOs.")
    parser.add_argument('--lat', type=float, help='Your latitude')
    parser.add_argument('--lon', type=float, help='Your longitude')
    parser.add_argument('--address', type=str, help='Your address (optional, will be geocoded)')
    args = parser.parse_args()

    if args.address:
        lat, lon = get_lat_lon_from_address(args.address)
    elif args.lat is not None and args.lon is not None:
        lat, lon = args.lat, args.lon
    else:
        print("Please provide either --lat and --lon or --address.")
        return

    df = pd.read_csv('ngo_geocoded.csv')
    df = df.dropna(subset=['latitude', 'longitude'])
    df['distance_km'] = df.apply(lambda row: haversine(lat, lon, row['latitude'], row['longitude']), axis=1)
    nearest = df.nsmallest(5, 'distance_km')

    print("Top 5 nearest NGOs:")
    for idx, row in nearest.iterrows():
        print(f"{row['name']} ({row['distance_km']:.2f} km) - {row['address']}")

if __name__ == "__main__":
    main() 