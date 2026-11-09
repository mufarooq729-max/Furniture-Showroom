const T = THREE,
  stage = document.getElementById("stage");
const scene = new T.Scene(),
  cam = new T.PerspectiveCamera(40, 1, 0.1, 100),
  ren = new T.WebGLRenderer({ antialias: true, alpha: true });
ren.shadowMap.enabled = true;
stage.prepend(ren.domElement);
scene.add(new T.HemisphereLight(0xffe7d0, 0x3b2013, 0.9));
const sun = new T.DirectionalLight(0xffffff, 0.9);
sun.position.set(4, 6, 3);
sun.castShadow = true;
scene.add(sun);
const floor = new T.Mesh(
  new T.CircleGeometry(4, 48),
  new T.MeshStandardMaterial({ color: 0x3a2217, roughness: 0.9 }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);
let group,
  ry = 0.6,
  rx = 0.35,
  dist = 7,
  auto = true,
  cur,
  mat;
const box = (w, h, d, x, y, z, m) => {
  const o = new T.Mesh(new T.BoxGeometry(w, h, d), m);
  o.position.set(x, y, z);
  o.castShadow = true;
  group.add(o);
  return o;
};
const woodM = () =>
  new T.MeshStandardMaterial({ color: 0x4a2b1a, roughness: 0.6 });
const pillow = new T.MeshStandardMaterial({ color: 0xf0e1cf });
const build = {
  sofa(m) {
    const w = woodM();
    [-1.7, 1.7].forEach((x) => box(0.2, 0.3, 0.9, x, 0.15, 0, w));
    box(3.6, 0.5, 1.6, 0, 0.55, 0, m);
    box(3.6, 1.1, 0.4, 0, 1.15, -0.65, m);
    [-1.8, 1.8].forEach((x) => box(0.35, 0.9, 1.6, x, 0.85, 0, m));
    [-1, 0, 1].forEach((i) => box(1.1, 0.25, 1.2, i * 1.15, 0.92, 0.1, m));
  },
  chair(m) {
    const w = woodM();
    [
      [-0.6, -0.6],
      [0.6, -0.6],
      [-0.6, 0.6],
      [0.6, 0.6],
    ].forEach((p) => box(0.15, 1.1, 0.15, p[0], 0.55, p[1], w));
    box(1.5, 0.18, 1.5, 0, 1.15, 0, m);
    box(1.5, 1.2, 0.15, 0, 1.85, -0.67, m);
  },
  table(m) {
    const w = woodM();
    box(4, 0.25, 2, 0, 1.5, 0, m);
    [
      [-1.7, -0.8],
      [1.7, -0.8],
      [-1.7, 0.8],
      [1.7, 0.8],
    ].forEach((p) => box(0.25, 1.4, 0.25, p[0], 0.7, p[1], m));
    box(3, 0.12, 0.15, 0, 1.2, 0, w);
  },
  bed(m) {
    const w = woodM();
    box(3, 0.5, 4, 0, 0.4, 0, w);
    box(2.8, 0.35, 3.8, 0, 0.8, 0.05, m);
    box(3, 2, 0.3, 0, 1.4, -1.9, m);
    box(1.1, 0.25, 0.6, -0.7, 1.1, -1.3, pillow);
    box(1.1, 0.25, 0.6, 0.7, 1.1, -1.3, pillow);
  },
};
const $ = (id) => document.getElementById(id);
function load(p) {
  cur = p;
  if (group) scene.remove(group);
  group = new T.Group();
  mat = new T.MeshStandardMaterial();
  build[p.model](mat);
  scene.add(group);
  setOpt(0);
  $("name").textContent = p.name;
  $("product-photo").src = p.img;
  $("product-photo").alt = p.name;
  $("price").textContent = money(p.price);
  $("desc").textContent = p.desc;
  $("cat").textContent = p.cat;
  $("spec").innerHTML = p.specs.map((s) => `<li>${s}</li>`).join("");
  $("sw").innerHTML = p.opts
    .map(
      (o, i) =>
        `<button title="${o[0]} – ${o[4]}" aria-label="${o[0]}" style="background:#${o[1].toString(16).padStart(6, 0)}" data-i="${i}"></button>`,
    )
    .join("");
  setOpt(0);
  document.querySelectorAll(".tab").forEach((t) => {
    const active = t.dataset.id === p.id;
    t.classList.toggle("on", active);
    t.setAttribute("aria-pressed", active);
  });
  history.replaceState(0, "", "?p=" + p.id);
}
function setOpt(i) {
  const o = cur.opts[i];
  mat.color.setHex(o[1]);
  mat.roughness = o[2];
  mat.metalness = o[3];
  $("optname").textContent = "Selected: " + o[0] + " · " + o[4];
  document
    .querySelectorAll("#sw button")
    .forEach((b, j) => b.classList.toggle("on", j === i));
}
$("sw").addEventListener(
  "click",
  (e) => e.target.dataset.i && setOpt(+e.target.dataset.i),
);
$("tabs").innerHTML = PRODUCTS.map(
  (p) =>
    `<button class="tab" type="button" data-id="${p.id}" aria-pressed="false">${p.cat}: ${p.name}</button>`,
).join("");
$("tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  const p = tab && PRODUCTS.find((x) => x.id === tab.dataset.id);
  p && load(p);
});
const pts = new Map();
let pd = 0;
const zoom = (d) => (dist = Math.max(3.5, Math.min(12, dist + d)));
stage.addEventListener("pointerdown", (e) => {
  stage.setPointerCapture(e.pointerId);
  pts.set(e.pointerId, e);
  auto = false;
});
stage.addEventListener("pointerup", (e) => {
  pts.delete(e.pointerId);
  pd = 0;
});
stage.addEventListener("pointermove", (e) => {
  if (!pts.has(e.pointerId)) return;
  const o = pts.get(e.pointerId);
  if (pts.size === 1) {
    ry += (e.clientX - o.clientX) * 0.008;
    rx = Math.max(0.05, Math.min(1.3, rx + (e.clientY - o.clientY) * 0.006));
  }
  pts.set(e.pointerId, e);
  if (pts.size === 2) {
    const [a, b] = [...pts.values()],
      d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if (pd) zoom((pd - d) * 0.03);
    pd = d;
  }
});
stage.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    zoom(e.deltaY * 0.005);
  },
  { passive: false },
);
$("zin").onclick = () => zoom(-1);
$("zout").onclick = () => zoom(1);
$("spin").onclick = () => (auto = !auto);
function size() {
  const w = stage.clientWidth,
    h = stage.clientHeight;
  ren.setSize(w, h);
  ren.setPixelRatio(Math.min(devicePixelRatio, 2));
  cam.aspect = w / h;
  cam.updateProjectionMatrix();
}
addEventListener("resize", size);
size();
(function loop() {
  requestAnimationFrame(loop);
  if (auto) ry += 0.005;
  cam.position.set(
    Math.sin(ry) * Math.cos(rx) * dist,
    Math.sin(rx) * dist + 1,
    Math.cos(ry) * Math.cos(rx) * dist,
  );
  cam.lookAt(0, 1, 0);
  ren.render(scene, cam);
})();
load(
  PRODUCTS.find(
    (p) => p.id === new URLSearchParams(location.search).get("p"),
  ) || PRODUCTS[0],
);
