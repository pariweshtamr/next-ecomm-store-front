const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex gap-8">
      {tabs.map((tabName) => (
        <span
          key={tabName}
          className={`${
            tabName === active ? "border-b-4 border-b-black " : "text-gray-400"
          } cursor-pointer`}
          onClick={() => onChange(tabName)}
        >
          {tabName}
        </span>
      ))}
    </div>
  )
}
export default Tabs
