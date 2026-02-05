export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>

      <h3>Basic row</h3>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red">Column 3</div>
      </div>

      <h3>Flex grow</h3>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>

      <h3>Fixed width + flex</h3>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>

      <h3>All columns grow equally</h3>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-grow-equally">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white wd-grow-equally">
          Column 2
        </div>
        <div className="wd-bg-color-red wd-grow-equally">Column 3</div>
      </div>

      <h3>Proportional relative growth</h3>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-flex-grow-1">Column 1</div>
        <div className="wd-bg-color-blue wd-fg-color-white wd-flex-grow-2">
          Column 2
        </div>
        <div className="wd-bg-color-red wd-flex-grow-4">Column 3</div>
      </div>
    </div>
  );
}
