export const mapPoiPin = (collectionName:string, features: any,iconName:string, fontSize: number, fading : number)=>{

    const featureCollection = {
        name: collectionName,
        type: "FeatureCollection",
        features:[]
    }
    features.forEach((poi: any) => {
      const featureTitle =
          {
            type: "Feature",
            geometry: poi.geometry,
            properties: {
              //name: poi.properties.name,
              background: "rgba(35,46,50,1)",
              borderRadius: 8,
              fontSize: fontSize,
              padding: 10,
              anchorOffset: { y: 86, x: 0 },
              icon: iconName,
              fadeDistance: fading,

            },
          };
        const featureFlag =
          {
            type: "Feature",
            geometry: poi.geometry,
            properties: {
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: 20,
              name: "|",
              anchorOffset: { y: 36, x: 0 },
              fadeDistance: fading,

            },
          };
        // @ts-ignore -- corrently no types available
          featureCollection.features.push(featureTitle);
          // @ts-ignore -- corrently no types available
          featureCollection.features.push(featureFlag);
        });

    return featureCollection;
}
