export interface Player {
  name: string
  device: DeviceList
  deviceId: string
}

export type Triplet = [x: number, y: number, z: number]
export type Quad = [x: number, y: number, z: number, w: number]

// Input types (aka "keys")
export type KeyTypesNames = "boolean" | "number"
export type KeyTypes = boolean | number
export interface KeyMap {
  // Name of key (e.g. Jump or Move)
  name: string
  // Defaults to boolean
  type?: KeyTypes
}

export type KeyState = Record<string, KeyTypes>

export enum DeviceList {
  NONE,
  KEYBOARD,
  MOUSE,
  GAMEPAD,
  TOUCH,
  CUSTOM
}

export type PlayerInputState = {
  name: string
  device: DeviceList
  buttons: KeyState
}
export type KeyCallbacks = (e: PlayerInputState) => void
export type InputObserver = {
  player: number
  observer: KeyCallbacks
}
