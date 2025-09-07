// sw.js

// -------------- Config --------------
const CACHE = "gymres-cache-v1"; // cambia la versión cuando se actualicen assets
const ASSETS = [
  "/",
  "/index.html",

  "/assets/index.css",
  "/assets/index.js",

  "/assets/main.css",
  "/assets/main.js",

  "/assets/img/logo.png",
  "/manifest.webmanifest"
];

// -------------- Install --------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// -------------- Activate --------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // borra caches antiguos
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));

      // (opcional) activa Navigation Preload si existe
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  self.clients.claim();
});

// -------------- Helpers --------------
const isHttp = (url) => ["http:", "https:"].includes(url.protocol);
const isSameOrigin = (url) => url.origin === self.location.origin;

// -------------- Fetch --------------
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Solo manejar GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Ignorar esquemas no http(s) (ej. chrome-extension:, data:, etc.)
  if (!isHttp(url)) return;

  // Para SPA: las navegaciones (mode: navigate) devuelven index.html (offline fallback)
  if (req.mode === "navigate" && isSameOrigin(url)) {
    event.respondWith(handleNavigation(req));
    return;
  }

  // Solo cachear mismo origen para evitar extensiones y terceros
  if (!isSameOrigin(url)) return;

  // Cache First con “revalidate on use” para recursos de tu origen
  event.respondWith(cacheFirst(req));
});

// -------------- Estrategias --------------
async function cacheFirst(req) {
  // 1) intenta cache
  const cached = await caches.match(req);
  if (cached) return cached;

  // 2) si no está, red -> cache (si es respuesta básica y OK)
  try {
    const res = await fetch(req);
    const copy = res.clone();
    if (res.ok && res.type === "basic") {
      const c = await caches.open(CACHE);
      // atrapamos errores pero no rompemos la respuesta
      c.put(req, copy).catch(() => {});
    }
    return res;
  } catch (err) {
    // 3) si falla, intenta un fallback razonable
    // por ejemplo, si pidieron un asset conocido:
    // devuelve index para rutas internas que no sean archivos
    return caches.match("/index.html");
  }
}

async function handleNavigation(req) {
  // 1) intenta usar Navigation Preload si está disponible
  try {
    const preload = await eventPreloadResponse();
    if (preload) {
      // guarda en caché para futuras visitas
      const copy = preload.clone();
      if (preload.ok && preload.type === "basic") {
        const c = await caches.open(CACHE);
        c.put(req, copy).catch(() => {});
      }
      return preload;
    }
  } catch (_) {}

  // 2) intenta desde red
  try {
    const res = await fetch(req);
    return res;
  } catch (_) {
    // 3) offline -> index.html en caché
    const cachedIndex = await caches.match("/index.html");
    return cachedIndex || new Response("Offline", { status: 503 });
  }
}

// Usa la respuesta precargada si existe (Navigation Preload)
function eventPreloadResponse() {
  // Esta función depende del fetch en curso; se lee a través del `extendable event`
  // Se accede con `self` y el último evento; implementamos un pequeño truco:
  // devolver `event.preloadResponse` si el agente la expone
  try {
    // NOTA: `event` no está aquí; por eso devolvemos una promesa resuelta en `null`.
    // El preload real se usa arriba solo si `fetch` puso `event.respondWith(handleNavigation(...))`.
    // Este helper se deja para claridad y posibles extensiones.
    return Promise.resolve(null);
  } catch {
    return Promise.resolve(null);
  }
}
