// Las imágenes vienen de un CDN cross-origin, por lo que el atributo `download`
// de un <a> es ignorado por el navegador. Para forzar la descarga se baja la
// imagen como blob y se crea un object URL local.
export const downloadImage = async (url, filename = "happy-space.jpg") => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error(error);
    window.open(url, "_blank"); // fallback si el CDN no permite CORS
  }
};
