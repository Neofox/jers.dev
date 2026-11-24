/// <reference types="@vgpu/wgsl/wgsl-types" />
import { draw, frame, init, surface } from "vgpu"
import landscape from "./terrain.wgsl"

export async function mount(canvas: HTMLCanvasElement, onLost: () => void) {
  const gpu = await init({ powerPreference: "low-power" })
  try {
    const target = surface(gpu, canvas, { dpr: Math.min(devicePixelRatio, 1.4), clearColor: [0.039, 0.06, 0.055, 1] })
    const params = { size: [canvas.clientWidth, canvas.clientHeight], aim: [0.5, 0.5], sweep: -2 }
    const terrain = draw(gpu, {
      shader: landscape,
      vertices: 6,
      // Six vertices per sample, including the connecting lines and scattered scan returns.
      instances: 420 * 128 + 420 * 26 + 2600,
      blend: "alpha",
      set: { p: params },
    })
    await terrain.compile(target)
    gpu.lost.then(onLost)
    return (aim: number[], sweep: number) => {
      terrain.set({ p: { size: [canvas.clientWidth, canvas.clientHeight], aim, sweep } })
      frame(gpu, f => f.pass(target, terrain))
    }
  } catch (error) {
    gpu.dispose()
    throw error
  }
}
