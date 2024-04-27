// base code and ducumentation for the api and overlay system provided by google.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13.5,
    center: {
      lat: 38.940348,
      lng: -92.32905
    },
    mapTypeId: "roadmap",
  });
  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(38.92096, -92.34802),
    new google.maps.LatLng(38.95865, -92.30070),
  );
  let image = "Combined downtowncampus map.png";

  class ParkingMapOverlay extends google.maps.OverlayView {
    bounds;
    image;
    div;
    constructor(bounds, image) {
      super();
      this.bounds = bounds;
      this.image = image;
    }
    onAdd() {
      this.div = document.createElement("div");
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";

      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.position = "absolute";
      this.div.appendChild(img);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();

      panes.overlayLayer.appendChild(this.div);
    }
    // Using the bounds positionds to convert to pixel points
    draw() {
      const overlayProjection = this.getProjection();
      const sw = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getSouthWest(),
      );
      const ne = overlayProjection.fromLatLngToDivPixel(
        this.bounds.getNorthEast(),
      );

      // overlay rezise
      if (this.div) {
        this.div.style.left = sw.x + "px";
        this.div.style.top = ne.y + "px";
        this.div.style.width = ne.x - sw.x + "px";
        this.div.style.height = sw.y - ne.y + "px";
      }
    }
    onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        delete this.div;
      }
    }
    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }
    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }

  const overlay = new ParkingMapOverlay(bounds, image);

  overlay.setMap(map);

  const toggleButton = document.createElement("button");

  toggleButton.textContent = "Toggle Overlay";
  toggleButton.classList.add("custom-map-control-button");

  toggleButton.addEventListener("click", () => {
    overlay.toggle();
  });
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);
}

window.initMap = initMap;