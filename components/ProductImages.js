import Image from "next/image"
import { useState } from "react"

const ProductImages = ({ images }) => {
  const [activeImg, setActiveImg] = useState(images?.[0])
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={activeImg}
        alt="active-prod-img"
        className="max-w-full max-h-[400px] h-full"
        width={400}
        height={400}
      />

      <div className="flex flex-grow-0 gap-2 mt-4">
        {images.map((img, i) => (
          <div
            key={i}
            className={`${
              activeImg === img
                ? "border-2 border-black"
                : " border border-solid border-[#aaa] opacity-80"
            } rounded-sm gap-2 h-[70px] w-[70px] p-2 cursor-pointer`}
            onClick={() => setActiveImg(img)}
          >
            <Image
              src={img}
              alt="prod-img"
              width={500}
              height={500}
              className={`${activeImg === img ? "" : ""} max-w-full max-h-full`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductImages
