import { useState } from "react"
import StarOutline from "./icons/StarOutline"
import StarSolid from "./icons/StarSolid"

const Rating = ({ defaultStars = 0, onChange = () => {}, disabled, size }) => {
  const [starsClicked, setStarsClicked] = useState(defaultStars)
  const five = [1, 2, 3, 4, 5]

  const handleStarClick = (n) => {
    if (disabled) return
    setStarsClicked(n)
    onChange(n)
  }
  return (
    <div className="flex py-2 gap-1">
      {five?.map((n) => (
        <div onClick={() => handleStarClick(n)} key={n}>
          {starsClicked >= n ? (
            <StarSolid
              className={`${!disabled && "cursor-pointer"} ${
                size === "sm" && "w-4 h-4"
              }`}
            />
          ) : (
            <StarOutline
              className={`${!disabled && "cursor-pointer"} ${
                size === "sm" && "w-4 h-4"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
export default Rating
