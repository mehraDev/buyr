export interface IconsManifest {
  src: string;
  sizes: string;
  type: string;
}

export interface Manifest {
  short_name: string;
  name: string;
  icons: IconsManifest[];
  start_url: string;
  display: string;
  theme_color: string;
  background_color: string;
}

// async function updateManifestFile(profileId: string): Promise<void> {
//   try {
//     const response = await fetch("manifest.json");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const manifest: Manifest = await response.json();
//     console.log("updating manifest file");
//     manifest.icons = getIconsForProfile(profileId);

//     const blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
//     const manifestUrl = URL.createObjectURL(blob);

//     // Remove any existing manifest before appending a new one
//     const existingLink = document.head.querySelector('link[rel="manifest"]');
//     if (existingLink) {
//       document.head.removeChild(existingLink);
//     }

//     // Attach the updated manifest to the document
//     const link = document.createElement("link");
//     link.rel = "manifest";
//     link.href = manifestUrl;
//     document.head.appendChild(link);
//   } catch (error) {
//     console.error("Error updating manifest:", error);
//   }
// }

// function getIconsForProfile(profileId: string): Icon[] {
//   return [
//     {
//       src: `/path/to/icons/${profileId}/icon-192x192.png`, // Use template literals for clean string concatenation
//       sizes: "192x192",
//       type: "image/png",
//     },
//     // ... include other sizes if necessary
//   ];
// }

function getPWARecommendedIcons(): string[] {
  return ["192x192", "512x512"]; // Example sizes
}

const createDefaultManifest = (shortName: string, name: string, icons: IconsManifest[], startUrl: string): Manifest => {
  return {
    short_name: shortName,
    name: name,
    icons: icons,
    start_url: startUrl,
    display: "standalone",
    theme_color: "#5E2E88",
    background_color: "#FFFFFF",
  };
};

function injectManifest(manifest: Manifest | null) {
  console.log("updating manifest file");
  if (!manifest) return;

  const blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
  const manifestUrl = URL.createObjectURL(blob);

  const existingLink = document.head.querySelector('link[rel="manifest"]');
  if (existingLink) {
    document.head.removeChild(existingLink);
  }

  const link = document.createElement("link");
  link.rel = "manifest";
  link.href = manifestUrl;
  document.head.appendChild(link);
}
// export default updateManifestFile;
export { createDefaultManifest, injectManifest, getPWARecommendedIcons };
