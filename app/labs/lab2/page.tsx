import "./index.css";
import "./MediaQueriesDemo.css";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Flex from "./Flex";
import Float from "./Float";
import ForegroundColors from "./ForegroundColors";
import GridLayout from "./GridLayout";
import Margins from "./Margins";
import MediaQueriesDemo from "./MediaQueriesDemo";
import Padding from "./Padding";
import Positions from "./Positions";
import Selectors from "./Selectors";
import Zindex from "./Zindex";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>

      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel right on the element.
        Although it is very convenient, it is considered bad practice and you
        should avoid using the style attribute.
      </p>

      <h3>Styling with imported CSS</h3>
      <p className="wd-css-document-style">
        This paragraph is styled from the imported CSS document.
      </p>

      <hr />
      <Selectors />
      <hr />
      <ForegroundColors />
      <BackgroundColors />
      <hr />
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <hr />
      <Positions />
      <Zindex />
      <hr />
      <MediaQueriesDemo />
      <hr />
      <Float />
      <GridLayout />
      <Flex />
    </div>
  );
}
