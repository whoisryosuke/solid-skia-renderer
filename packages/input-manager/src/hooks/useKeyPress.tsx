import { useEffect, useState } from "react"

// Modified the useKeyPress from useHooks: https://usehooks.com/useKeyPress/
// Takes a `pressMethod` that will run continuously "every frame" (1/60 second - not locked tho)
// And also accepts a `downMethod` and `upMethod` for a single call
// And still returns a simple true/false for the keypress for convenience/use in React
// Ideally all the methods should be an properties of 1 object so user doesn't have to set noop functions to get deeper params
export default function useKeyPress(targetKey: string, pressMethod?: () => void, downMethod?: () => void, upMethod?: () => void): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)
  // If pressed key is our target key then set to true
  function downHandler({ key }): void {
    if (key === targetKey) {
      setKeyPressed(true)
      downMethod?.()
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }): void => {
    if (key === targetKey) {
      setKeyPressed(false)
      upMethod?.()
    }
  }

  // This is the "continuous" press magic
  // When the user presses key,
  // we set the `pressMethod` to run constantly using setInterval
  useEffect(() => {
    let interval
    if (keyPressed && pressMethod) {
      // We loop the function to simulate it happening every frame
      interval = setInterval(pressMethod, 1000 / 60)
    }
    // This clears interval when component dismounts so it won't keep running
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [keyPressed, pressMethod])

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}
