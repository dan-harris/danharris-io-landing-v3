async function contentLoaded() {
  const backgroundImageFadeInModule = await import("background-image-fade-in");
  backgroundImageFadeInModule.default(
    ".lazy-load-bg-img",
    600,
    "background-size: auto; background-position: center center;",
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
  );
}

document.addEventListener("DOMContentLoaded", contentLoaded);
