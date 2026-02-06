import Link from "next/link";
import { Container } from "react-bootstrap";
import "./index.css";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import BootstrapForms from "./BootstrapForms";
import BootstrapGrids from "./BootstrapGrids";
import BootstrapLists from "./BootstrapLists";
import BootstrapNavigation from "./BootstrapNavigation";
import BootstrapTables from "./BootstrapTables";
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
import ReactIconsSampler from "./ReactIconsSampler";
import ScreenSizeLabel from "./ScreenSizeLabel";
import Selectors from "./Selectors";
import Zindex from "./Zindex";

export default function Lab2() {
  return (
    <Container>
      <div id="wd-lab2" className="pb-5">
        <h2>Lab 2 - Cascading Style Sheets</h2>

        <h3>Styling with the STYLE attribute</h3>
        <p>
          Style attribute allows configuring look and feel right on the element.
          Although it&apos;s very convenient it is considered bad practice and you
          should avoid using the style attribute.
        </p>

        <Selectors />
        <ForegroundColors />
        <BackgroundColors />
        <Borders />
        <Padding />
        <Margins />
        <Corners />
        <Dimensions />
        <Positions />
        <Zindex />
        <Float />
        <GridLayout />
        <Flex />
        <MediaQueriesDemo />

        <hr />
        <ReactIconsSampler />

        <hr />
        <h3>Tailwind Exercises</h3>
        <p>
          Continue with the Tailwind section here: <Link href="/labs/lab2/tailwind">Lab 2 Tailwind</Link>
        </p>

        <hr />
        <BootstrapGrids />
        <BootstrapTables />
        <BootstrapLists />
        <BootstrapForms />
        <BootstrapNavigation />
        <ScreenSizeLabel />
      </div>
    </Container>
  );
}
