import "../../../../css/merkit/explore-css/mainMap.css";
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import mapStyle from "./mapStyle.json";

export default function MainMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const locationMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    let destroyed = false;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [78.4867, 20.5937],
      zoom: 4.3,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      maxPitch: 0
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false
      }),
      "bottom-right"
    );

    function showUserLocation(longitude, latitude) {
      if (destroyed) return;

      map.flyTo({
        center: [longitude, latitude],
        zoom: 13,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });

      if (locationMarkerRef.current) {
        locationMarkerRef.current.remove();
      }

      const element = document.createElement("div");

      element.className = "device-location-marker";

      element.innerHTML = `
        <div class="device-location-pulse"></div>
        <div class="device-location-dot"></div>
      `;

      locationMarkerRef.current = new maplibregl.Marker({
        element,
        anchor: "center"
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
    }

    function getDeviceLocation() {
      if (!navigator.geolocation) {
        alert("Location is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("DEVICE LOCATION:", latitude, longitude);

          showUserLocation(longitude, latitude);
        },
        (error) => {
          if (error.code === 1) {
            alert(
              "Location is turned off or permission is denied.\nPlease turn on Location and allow location access for Merkit."
            );
          }

          if (error.code === 2) {
            alert(
              "Your device location is unavailable.\nPlease turn on Location and try again."
            );
          }

          if (error.code === 3) {
            alert(
              "Unable to get your location.\nPlease turn on Location and try again."
            );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    }

    map.on("load", () => {
      if (destroyed) return;

      getDeviceLocation();

      const memories = [
        {
          id: 1,
          username: "anshu",
          lng: 78.4867,
          lat: 17.385,
          title: "Hyderabad Memory 1",
          date: "15 Aug 2026",
          type: "Photo"
        },
        {
          id: 2,
          username: "rahul",
          lng: 78.4967,
          lat: 17.395,
          title: "Hyderabad Memory 2",
          date: "12 Aug 2026",
          type: "Note"
        },
        {
          id: 6,
          username: "vikas",
          lng: 77.5946,
          lat: 12.9716,
          title: "Bangalore Memory 1",
          date: "20 Dec 2025",
          type: "Note"
        },
        {
          id: 7,
          username: "aditi",
          lng: 77.6046,
          lat: 12.9816,
          title: "Bangalore Memory 2",
          date: "18 Dec 2025",
          type: "Photo"
        },
        {
          id: 8,
          username: "arjun",
          lng: 77.5846,
          lat: 12.9616,
          title: "Bangalore Memory 3",
          date: "15 Dec 2025",
          type: "Video"
        },
        {
          id: 9,
          username: "sneha",
          lng: 77.6146,
          lat: 12.9916,
          title: "Bangalore Memory 4",
          date: "10 Dec 2025",
          type: "Photo"
        },
        {
          id: 10,
          username: "kiran",
          lng: 77.5746,
          lat: 12.9516,
          title: "Bangalore Memory 5",
          date: "05 Dec 2025",
          type: "Note"
        },
        {
          id: 11,
          username: "aman",
          lng: 72.8777,
          lat: 19.076,
          title: "Mumbai Memory 1",
          date: "10 Oct 2024",
          type: "Video"
        },
        {
          id: 12,
          username: "riya",
          lng: 72.8877,
          lat: 19.086,
          title: "Mumbai Memory 2",
          date: "08 Oct 2024",
          type: "Photo"
        },
        {
          id: 13,
          username: "karan",
          lng: 72.8677,
          lat: 19.066,
          title: "Mumbai Memory 3",
          date: "05 Oct 2024",
          type: "Note"
        },
        {
          id: 14,
          username: "simran",
          lng: 72.8977,
          lat: 19.096,
          title: "Mumbai Memory 4",
          date: "01 Oct 2024",
          type: "Photo"
        },
        {
          id: 15,
          username: "dev",
          lng: 72.8577,
          lat: 19.056,
          title: "Mumbai Memory 5",
          date: "28 Sep 2024",
          type: "Video"
        },
        {
          id: 16,
          username: "meera",
          lng: 80.2707,
          lat: 13.0827,
          title: "Chennai Memory",
          date: "15 Jul 2024",
          type: "Photo"
        },
        {
          id: 17,
          username: "raj",
          lng: 77.209,
          lat: 28.6139,
          title: "Delhi Memory",
          date: "20 Jun 2024",
          type: "Note"
        },
        {
          id: 18,
          username: "tanya",
          lng: 88.3639,
          lat: 22.5726,
          title: "Kolkata Memory",
          date: "12 May 2024",
          type: "Video"
        },
        {
          id: 19,
          username: "vishal",
          lng: 73.8567,
          lat: 18.5204,
          title: "Pune Memory",
          date: "05 Apr 2024",
          type: "Photo"
        },
        {
          id: 20,
          username: "ishita",
          lng: 75.7873,
          lat: 26.9124,
          title: "Jaipur Memory",
          date: "15 Mar 2024",
          type: "Note"
        }
      ];

      const geojson = {
        type: "FeatureCollection",
        features: memories.map((memory) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [memory.lng, memory.lat]
          },
          properties: {
            id: memory.id,
            title: memory.title,
            username: memory.username,
            date: memory.date,
            type: memory.type
          }
        }))
      };

      map.addSource("memory-capsules", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 55
      });

      const glassMemorySvg = `
<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity=".96"/>
      <stop offset="1" stop-color="#FEF3C7" stop-opacity=".75"/>
    </linearGradient>

    <filter id="s1" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".18"/>
    </filter>
  </defs>

  <rect
    x="4"
    y="4"
    width="72"
    height="72"
    rx="12"
    fill="url(#g1)"
    stroke="#FFFFFF"
    stroke-width="1.5"
    filter="url(#s1)"
  />

  <rect
    x="14"
    y="14"
    width="52"
    height="30"
    rx="7"
    fill="#FFFBEB"
  />

  <path
    d="M40 20l3.5 7.2 8 .7-6 5.2 1.8 7.8-7.3-4-7.3 4 1.8-7.8-6-5.2 8-.7z"
    fill="#F59E0B"
  />

  <rect
    x="16"
    y="51"
    width="48"
    height="5"
    rx="2.5"
    fill="#F59E0B"
  />

  <rect
    x="25"
    y="62"
    width="30"
    height="4"
    rx="2"
    fill="#D6A94A"
  />
</svg>`;

      const glassMemoryImage = new Image();

      glassMemoryImage.onload = () => {
        if (destroyed) return;

        if (!map.hasImage("glass-memory")) {
          map.addImage("glass-memory", glassMemoryImage);
        }

        if (!map.getLayer("glass-memory-tile")) {
          map.addLayer({
            id: "glass-memory-tile",
            type: "symbol",
            source: "memory-capsules",
            filter: ["!", ["has", "point_count"]],
            layout: {
              "icon-image": "glass-memory",
              "icon-size": 0.55,
              "icon-anchor": "bottom",
              "icon-allow-overlap": true
            }
          });
        }


        if (!map.getLayer("memory-cluster")) {
          map.addLayer({
            id: "memory-cluster",
            type: "circle",
            source: "memory-capsules",
            filter: ["has", "point_count"],
            paint: {
              "circle-radius": [
                "step",
                ["get", "point_count"],
                13,
                5,
                15,
                10,
                17,
                25,
                19
              ],
              "circle-color": "#F1F5F9",
              "circle-opacity": 0.92,
              "circle-stroke-color": "#94A3B8",
              "circle-stroke-width": 2
            }
          });
        }

        if (!map.getLayer("memory-cluster-count")) {
          map.addLayer({
            id: "memory-cluster-count",
            type: "symbol",
            source: "memory-capsules",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-size": [
                "step",
                ["get", "point_count"],
                10,
                5,
                11,
                10,
                12,
                25,
                13
              ],
              "text-font": ["Open Sans Bold"],
              "text-allow-overlap": true
            },
            paint: {
              "text-color": "#475569",
              "text-halo-color": "#FFFFFF",
              "text-halo-width": 1
            }
          });
        }

        map.on("click", "memory-cluster", async (event) => {
          const features = map.queryRenderedFeatures(event.point, {
            layers: ["memory-cluster"]
          });

          if (!features.length) return;

          const clusterId = features[0].properties.cluster_id;

          const source = map.getSource("memory-capsules");

          if (!source) return;

          try {
            const zoom = await source.getClusterExpansionZoom(clusterId);

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: Math.min(zoom + 0.3, 18),
              duration: 600
            });
          } catch (error) {
            console.error("Cluster expansion error:", error);
          }
        });

        map.on("click", "glass-memory-tile", (event) => {
          const feature = event.features?.[0];

          if (!feature) return;

          const coordinates = feature.geometry.coordinates.slice();
          const title = feature.properties.title;
          const username = feature.properties.username;
          const date = feature.properties.date;
          const type = feature.properties.type;

          new maplibregl.Popup({
            offset: 18,
            closeButton: false,
            className: "merkit-memory-popup"
          })
            .setLngLat(coordinates)
            .setHTML(`
              <div class="memory-popup">
                <div class="memory-popup-type">${type}</div>
                <div class="memory-popup-title">${title}</div>
                <a href="#" class="memory-popup-username clk">@${username}</a>
                <div class="memory-popup-date">${date}</div>
                <button class="memory-popup-button clk">Explore Memory</button>
              </div>
            `)
            .addTo(map);
        });

        map.on("mouseenter", "memory-cluster", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "memory-cluster", () => {
          map.getCanvas().style.cursor = "";
        });

        map.on("mouseenter", "glass-memory-tile", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "glass-memory-tile", () => {
          map.getCanvas().style.cursor = "";
        });
      };

      glassMemoryImage.onerror = () => {
        console.error("Failed to load glass memory SVG.");
      };

      glassMemoryImage.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(glassMemorySvg);
    });

    return () => {
      destroyed = true;

      if (locationMarkerRef.current) {
        locationMarkerRef.current.remove();
        locationMarkerRef.current = null;
      }

      map.remove();

      mapRef.current = null;
    };
  }, []);

  return (
    <main className="main-map">
      <div ref={mapContainer} className="main-map-container" />
    </main>
  );
}