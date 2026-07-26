/** Simplex-style value noise — cheap drift for the particle field. */
const NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform vec3 uPointer;
  uniform float uPixelRatio;

  attribute vec3 aHome;
  attribute vec3 aAlt;
  attribute float aSeed;

  varying float vSeed;
  varying float vExcite;

  ${NOISE}

  void main() {
    vec3 pos = mix(aHome, aAlt, smoothstep(0.0, 1.0, uMorph));

    // Slow organic drift so the field never looks frozen.
    float n = snoise(pos * 0.35 + uTime * 0.12);
    pos += vec3(n, n * 0.7, n * 0.5) * 0.4;

    // Pointer repulsion — points push away from the cursor and brighten.
    // The divisor sets the influence radius in world units (~5 at 9.0); the
    // viewport is ~23 units wide, so anything much smaller reads as no effect.
    vec2 delta = pos.xy - uPointer.xy;
    float falloff = exp(-dot(delta, delta) / 9.0);
    pos.xy += normalize(delta + vec2(0.0001)) * falloff * 2.2;

    vSeed = aSeed;
    vExcite = falloff;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.5 + aSeed * 2.0 + falloff * 3.0) * uPixelRatio * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uGold;
  uniform vec3 uGoldBright;
  uniform vec3 uTeal;
  uniform float uAlpha;

  varying float vSeed;
  varying float vExcite;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.15, d);
    if (alpha < 0.01) discard;

    vec3 base = mix(uGold, uTeal, step(0.82, vSeed));
    vec3 color = mix(base, uGoldBright, vExcite * 0.7);

    gl_FragColor = vec4(color, alpha * uAlpha);
  }
`;
