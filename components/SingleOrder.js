const SingleOrder = ({ line_items, createdAt, ...rest }) => {
  return (
    <div className="my-[10px] py-[10px] border-b border-b-solid border-b-[#ddd] flex justify-between items-center">
      <div>
        <time className="text-[#555] sm:text-[10px]">
          {new Date(createdAt).toLocaleString("en-GB")}
        </time>
        <div className="text-[12px] sm:text-[10px] leading-[1rem] mt-[5px] text-[#888]">
          {rest.fName} {rest.lName} <br />
          {rest.email} <br />
          {rest.street}, {rest.city}, {rest.postalCode}, {rest.country}
        </div>
      </div>
      <div>
        {line_items.map((item, i) => (
          <div key={i} className="font-[500] text-sm mb-2 sm:text-[10px]">
            <span className="text-[#aaa]">{item.quantity} X</span>{" "}
            {item.price_data.product_data.name}
          </div>
        ))}
      </div>
    </div>
  )
}
export default SingleOrder
