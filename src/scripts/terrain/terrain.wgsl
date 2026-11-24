struct Params {
  size: vec2f,
  aim: vec2f,
  sweep: f32,
}
@group(0) @binding(0) var<uniform> p: Params;

struct Point {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
  @location(1) corner: vec2f,
}

fn hash(cell: vec2f) -> f32 {
  return fract(sin(dot(cell, vec2f(39.346, 11.135))) * 4375.154);
}

fn noise(position: vec2f) -> f32 {
  let cell = floor(position);
  let t = fract(position);
  let weight = t * t * (3.0 - 2.0 * t);
  let lower = mix(hash(cell), hash(cell + vec2f(1, 0)), weight.x);
  let upper = mix(hash(cell + vec2f(0, 1)), hash(cell + 1.0), weight.x);
  return mix(lower, upper, weight.y);
}

fn height(world: vec2f) -> f32 {
  let bend = world.x + 0.64 * sin(world.y * 1.46) + 0.14 * sin(world.y * 4.2);
  let ridge = exp(-1.3 * pow(abs(bend - 0.64), 1.36)) + 0.77 * exp(-1.7 * pow(abs(bend + 2.35), 1.48));
  let slope = 0.48 + 0.34 * noise(world * 1.43) + 0.17 * noise(world * 3.7);
  return ridge * slope + 0.12 * noise(world * 5.9) + 0.05 * noise(world * 10.3);
}

@vertex fn vs_main(@builtin(instance_index) id: u32, @builtin(vertex_index) vertex: u32) -> Point {
  let corners = array<vec2f, 6>(vec2f(-1,-1), vec2f(1,-1), vec2f(-1,1), vec2f(-1,1), vec2f(1,-1), vec2f(1,1));
  let corner = corners[vertex];
  let samples = 420u * 128u;
  let scatterStart = samples + 420u * 26u;
  let ribbon = id >= samples && id < scatterStart;
  let scatter = id >= scatterStart;
  var column = id % 420u;
  var row = id / 420u;
  if (ribbon) {
    column = (id - samples) % 420u;
    row = ((id - samples) / 420u) * 5u;
  }
  if (scatter) {
    column = u32(hash(vec2f(f32(id), 9.4)) * 419.0);
    row = u32(hash(vec2f(f32(id), 3.2)) * 127.0);
  }

  let across = (f32(column) + select(0.0, (corner.x + 1.0) * 0.5, ribbon)) / 419.0;
  let depth = f32(row) / 127.0;
  let span = clamp(p.size.x / p.size.y, 0.65, 1.6) / 1.6;
  let world = vec2f((across - 0.5) * span * (5.1 + 3.9 * (1.0 - depth)) + 0.7, depth * 4.6);
  let elevation = height(world);
  let x = (across - 0.5) * 1.36 + 0.5 + (p.aim.x - 0.5) * 0.05 * (depth - 0.2);
  let ground = 0.62 + pow(depth, 1.28) * 0.65 - elevation * (0.31 + 0.17 * depth)
             + (p.aim.y - 0.5) * 0.028 * (depth + 0.2);
  let lift = exp(-abs(x + 0.17 * ground - p.sweep) * 31.0);
  let dust = pow(hash(vec2f(f32(id), 4.5)), 2.0) * (0.037 + 0.097 * lift);
  let y = ground - lift * (0.012 + 0.018 * depth) - select(0.0, dust, scatter);

  let crest = smoothstep(0.35, 0.98, elevation);
  let light = exp(-abs(x + 0.17 * y - p.sweep) * 26.0);
  let major = select(0.0, 1.0, row % 8u == 0u);
  let radius = mix(0.70, 1.44, depth) + 0.25 * major + 0.50 * light;
  let stretch = vec2f(mix(1.0, 1.72, major), 0.75);
  let offset = select(corner * stretch * radius, vec2f(0.0, corner.y * (0.46 + 0.30 * depth)), ribbon);
  let tint = mix(vec3f(0.04,0.31,0.23), vec3f(0.44,0.94,0.66), clamp(crest * 0.75 + depth * 0.19 + major * 0.18, 0.0, 1.0));
  let color = mix(tint, vec3f(0.82,0.77,0.48), smoothstep(0.62, 1.0, elevation) * 0.48);
  let fade = mix(0.43, 1.0, max(smoothstep(0.29, 0.67, x), smoothstep(0.70, 0.95, y)));
  let grain = hash(vec2f(f32(column), f32(row)));
  var alpha = (0.23 + 0.62 * crest + 0.12 * grain + 0.15 * major) * fade + 0.28 * light;
  if (ribbon) { alpha = (0.24 + 0.40 * crest + 0.34 * light) * fade; }
  if (scatter) { alpha *= 0.26 + light * 0.55; }

  var point: Point;
  point.position = vec4f((vec2f(x,y) + offset / p.size) * vec2f(2,-2) + vec2f(-1,1), 0.0, 1.0);
  point.color = vec4f(mix(color, vec3f(0.96,1.0,0.70), light * 0.97), alpha);
  point.corner = select(corner, vec2f(0.0,corner.y), ribbon);
  return point;
}

@fragment fn fs_main(point: Point) -> @location(0) vec4f {
  return vec4f(point.color.rgb, point.color.a * (1.0 - smoothstep(0.40, 1.0, length(point.corner))));
}
