const ListRender = () => {
  const arr = [1, 2, 3];
  return (
    <div className="father">
      <h1>列表渲染</h1>
      <h2>数组自动展开</h2>
      <div>{arr}</div>
      <h2>列表渲染--map</h2>
      <ul>
        {
          arr.map((item, index) => {
            return <li key={index}>{ item }</li>
          })
        }
      </ul>
      <h2>列表渲染--filter</h2>
      <ul>
        {
          arr
            .filter(item => item === 2)
            .map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}
export default ListRender;