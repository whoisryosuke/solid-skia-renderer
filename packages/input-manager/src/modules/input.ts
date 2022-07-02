import { DeviceList, PlayerInputState, KeyState, KeyTypes, KeyCallbacks, InputObserver } from "../types"

// type DeviceList = 'none' | 'keyboard' | 'mouse' | 'gamepad' | 'touch' | 'custom'

/**
 * System for unifying input across different devices (gamepad, keyboard, etc)
 * using "input actions" similar to Unity's Input System
 *
 * You essentially pass a hashmap of keys (like Jump) and default value (like false)
 * and let other input device APIs update this class using that data model.
 *
 * This resolves issue of inputs not matching (e.g. W key and DPadUp for forward movement)
 *
 * @see: https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Actions.html
 */
export default class Input {
  // This might get renamed to "devices" to remove confusion
  // since ideally only 1 device per "player" here anyway
  public players: PlayerInputState[] = []
  // Observers for input. This receives all players input.
  public observers: Set<InputObserver> = new Set()

  /**
   * Initialize or override current key mapping
   * @param keys Big object with input names and default values
   */
  setInputMap(keys: KeyState, player = 0) {
    if (this.players[player]) {
      this.players[player].buttons = { ...keys }
    } else {
      throw Error(`Couldn't find that player`)
    }
  }

  /**
   * Sets key to value provided
   * usually used by input devices like gamepad to update input state
   * @param keyName
   * @param value
   */
  setButton(keyName: string, value: KeyTypes, player: number, device: DeviceList) {
    // console.log("setting button", player, keyName, device)
    this.players[player].buttons[keyName] = value
    this.players[player].device = device
    // Loop through all observers and send key data thru callback function
    this.observers.forEach(({ player: playerIndex, observer }) => playerIndex === player && observer(this.players[player]))
  }

  /**
   * Provides the current state of an input action (e.g. Jump = false)
   * @param keyName The "key" (or name) of action you want state for
   */
  getKey(keyName: string, player = 0) {
    return this.players?.[player]?.buttons[keyName]
  }

  /**
   * Adds a new player with blank input mapping
   * @param playerIndex Optional. Manually set index of player.
   * @returns Index of new player
   */
  addPlayer(name: string, device: DeviceList): number {
    // Get the new index of the player
    // We let user pass in an index, or increment automatically
    let newPlayerIndex = this.players.length

    // We create the new player
    // No keys are set! We expect user to manage this
    this.players.push({
      name,
      device: device,
      buttons: {}
    })

    return newPlayerIndex
  }

  /**
   * Removes player by name from mapping
   * @param playerIndex Optional. Manually set index of player.
   * @returns Index of new player
   */
  removePlayer(name: string) {
    this.players.filter((player) => player.name !== name)
  }

  /**
   * Gets the index of player by name provided.
   * @param name Name of player you created using `addPlayer`
   */
  getPlayerIndex(playerName: string) {
    return this.players.findIndex((player) => player.name === playerName)
  }

  addObserver(player: number, observer: KeyCallbacks) {
    this.observers.add({ player, observer })
  }

  removeObserver(player: number, observer: KeyCallbacks) {
    this.observers.delete({ player, observer })
  }
}
