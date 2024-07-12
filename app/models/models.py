from typing import NamedTuple, Optional

class Location(NamedTuple) :
    lat:        Optional[float] = None
    lon:        Optional[float] = None
    name:       Optional[str]   = None
    state:      Optional[str]   = None
    country:    Optional[str]   = None

class Climate(NamedTuple) :
    uvi:        Optional[float] = None
    temp:       Optional[float] = None
    clouds:     Optional[float] = None
    pressure:   Optional[float] = None
    humidity:   Optional[float] = None
    visibility: Optional[float] = None
    dates:      Optional[list]  = None
    temps:      Optional[list]  = None