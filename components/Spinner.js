import { DotLoader } from "react-spinners"

const Spinner = () => {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <DotLoader speedMultiplier={3} color={"#555"} />
    </div>
  )
}
export default Spinner
