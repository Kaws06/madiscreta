// Configuración inicial
const ubicaciones = {
  "Universidad Nacional de Ingenieria": [-12.024, -77.050],
  "Saga Falabella": [-12.119, -77.030],
  "Estación Javier Prado": [-12.092, -77.035],
  "Urbanizacion Los Jardines": [-12.013, -77.058],
  "Jiron Comandante Montero Rosas": [-12.155, -77.022],
  "Cerro San Cosme": [-12.067, -77.004],
  "Casa de la Literatura Peruana": [-12.045, -77.028],
  "El Rosedal": [-12.129, -77.013],
};

// Inicializa el mapa
const map = L.map("map").setView([-12.046, -77.030], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Añade ubicaciones al mapa
Object.entries(ubicaciones).forEach(([nombre, coord]) => {
  L.marker(coord).addTo(map).bindPopup(nombre);
});

// Llena los selects
const origenSelect = document.getElementById("origen");
const destinoSelect = document.getElementById("destino");
Object.keys(ubicaciones).forEach((lugar) => {
  const option1 = new Option(lugar, lugar);
  const option2 = new Option(lugar, lugar);
  origenSelect.add(option1);
  destinoSelect.add(option2);
});

// Ruta con calles reales
let control; // Para eliminar rutas previas
document.getElementById("calcularRuta").addEventListener("click", () => {
  const origen = origenSelect.value;
  const destino = destinoSelect.value;

  if (origen === destino) {
    alert("El origen y el destino no pueden ser iguales.");
    return;
  }

  // Elimina la ruta anterior, si existe
  if (control) {
    map.removeControl(control);
  }

  // Calcula y muestra la ruta en base a las calles
  control = L.Routing.control({
    waypoints: [
      L.latLng(...ubicaciones[origen]),
      L.latLng(...ubicaciones[destino]),
    ],
    routeWhileDragging: false,
    showAlternatives: false,
    createMarker: function(i, waypoint, n) {
      return L.marker(waypoint.latLng).bindPopup(
        i === 0 ? "Origen: " + origen : "Destino: " + destino
      );
    },
    language: 'es'
  }).addTo(map);
});
