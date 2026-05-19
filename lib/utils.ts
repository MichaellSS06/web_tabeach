/**
 * Valida que una URL de redirección sea interna para evitar ataques de Open Redirect.
 * @param url La URL a validar.
 * @param defaultUrl La URL por defecto si la validación falla.
 * @returns La URL validada o la por defecto.
 */
export function getSafeRedirect(url: string | null | undefined, defaultUrl: string = "/"): string {
  if (!url) return defaultUrl;

  // Si la URL empieza con / pero no con // (que podría ser un protocolo relativo), es segura.
  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  // Si es una URL absoluta, verificamos que el host coincida con el nuestro.
  // En el cliente, podemos usar window.location.origin.
  try {
    const targetUrl = new URL(url, typeof window !== "undefined" ? window.location.origin : undefined);
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";

    if (targetUrl.origin === currentOrigin) {
      return url;
    }
  } catch {
    // Si falla el parsing, devolvemos la URL por defecto.
  }

  return defaultUrl;
}
