import { createJoymap, createQueryModule, QueryModule } from "joymap"
import { MAX_GAMEPADS } from "../config"

const joymap = createJoymap({
  onPoll() {
    // console.log("default poll still here")
  }
})

// We create "gamepads" to embody each separate gamepad
// This is different than the "players" we define in Input class
const gamepads = Array(MAX_GAMEPADS)
  .fill(0)
  .map((player, index) => {
    const module = createQueryModule()
    joymap.addModule(module)

    return {
      // We add 1 to index so it starts from Gamepad1
      name: `Gamepad${index + 1}`,
      module
    }
  })

export { gamepads, joymap }
