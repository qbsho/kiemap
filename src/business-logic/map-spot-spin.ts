export const mapSpotPin = (collectionName: string, features: any, iconName: string, fontSize: number, fading: number) => {

  const featureCollection = {
    name: collectionName,
    type: "FeatureCollection",
    features: []
  }
  features.forEach((poi: any) => {
    const featureIcon =
    {
      type: "Feature",
      geometry: poi.geometry,
      properties: {
        anchorOffset: {
          "y": 70,
          "x": 0
        },
        borderRadius: 20,
        padding: 8,
        borderWidth: 2,
        background: "#e46200",
        icon: iconName,
        fontSize: 16,
        name: poi.properties?.Name
      }
    };

    const featureCircle =
    {
      type: "Feature",
      geometry: poi.geometry,
      properties: {
        color: "#ddd",
        fontSize: 8,
        anchor: "center",
        icon: "circle-o"
      }
    }

    const featureAnchor =
    {
      type: "Feature",
      geometry: poi.geometry,
      properties: {
        selectable: false,
        color: "#e46200",
        fontSize: 40,
        name: "|",
        anchorOffset: {
          "y": 3,
          "x": 0
        },
        anchor: "bottom"
      }
    }

    const defaults = {
      properties: {
        color: "white",

        collapseDistance: 6000,
        fadeDistance: fading
      }
    }

    // @ts-ignore -- corrently no types available
    featureCollection.features.push(featureIcon);
    // @ts-ignore -- corrently no types available
    featureCollection.features.push(featureCircle);
    // @ts-ignore -- corrently no types available
    featureCollection.features.push(featureAnchor);
    // @ts-ignore -- corrently no types available
    featureCollection.defaults = defaults;

  });

  return featureCollection;
}
