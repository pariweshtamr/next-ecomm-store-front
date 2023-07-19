import { useCallback, useEffect, useState } from "react"
import Rating from "./Rating"
import { getAllReviews, submitReview } from "@/lib/axiosHelper"
import { toast } from "react-hot-toast"
import Spinner from "./Spinner"

const ProductReviews = ({ product }) => {
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const postReview = async () => {
    const { status, message } = await submitReview({
      title,
      comment,
      rating,
      product: product._id,
    })

    if (status === "success") {
      toast.success(message)
      setTitle("")
      setComment("")
      setRating(0)
      fetchReviews()
    }
  }

  const fetchReviews = useCallback(async () => {
    setIsLoading()
    const revs = await getAllReviews(product._id)
    setReviews(revs)
    setIsLoading(false)
  }, [product._id])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return (
    <div className="py-16">
      <h2 className="text-[1.2rem] font-bold mb-[20px]">Product Reviews</h2>
      <div className="grid grid-cols-2 gap-[40px] md:grid-cols-1 md:gap-[30px]">
        <div className="bg-white rounded-md p-8 h-max">
          <h3 className="text-[1rem] font-[600] mt-[5px]">Add a review</h3>
          <Rating onChange={setRating} />
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Write something about the product..."
            className="w-full border p-2 rounded-md"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <div>
            <button className="btn-default my-2" onClick={postReview}>
              Submit your review
            </button>
          </div>
        </div>

        <div className="bg-white rounded-md p-8 h-max">
          <h3 className="text-[1rem] font-[600] mt-[5px]">All reviews</h3>
          {isLoading && <Spinner />}
          {!reviews?.length && (
            <p className="text-center text-2xl py-5">No reviews :(</p>
          )}

          {reviews?.length > 0 &&
            reviews?.map((review) => (
              <div
                key={review._id}
                className="border-t border-[#eee] rounded-md py-1 mt-3 mb-4"
              >
                <div className="flex items-center justify-between">
                  <Rating
                    disabled={true}
                    defaultStars={review.rating}
                    size="sm"
                  />
                  <time className="text-xs text-[#aaa] font-[400]">
                    {new Date(review.createdAt).toLocaleString("en-GB")}
                  </time>
                </div>

                <h3 className="text-lg mb-1 font-[500] text-[#333]">
                  {review.title}
                </h3>

                <p className="text-xs leading-[1.2rem] text-[#555]">
                  {review.comment}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default ProductReviews
