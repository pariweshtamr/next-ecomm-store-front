import { BounceLoader } from "react-spinners"

const Spinner = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <BounceLoader speedMultiplier={3} color={"#555"} />
    </div>
  )
}
export default Spinner
