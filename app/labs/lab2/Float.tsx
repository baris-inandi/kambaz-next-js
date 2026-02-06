export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float</h2>
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <div className="wd-float-done"></div>
      </div>
      <h3>Floating image</h3>
      <img
        src="/images/reactjs.jpg"
        alt="Floating sample"
        className="wd-float-right ms-2 mb-2"
      />
      <p>
        This image is floated to the right. Content in this paragraph wraps on
        the left side and below the image as the text flows naturally around it.
      </p>
      <div className="wd-float-done"></div>
    </div>
  );
}
