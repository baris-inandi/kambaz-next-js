import Add from "./Add";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ClientComponentDemo from "./ClientComponentDemo";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import Highlight from "./Highlight";
import House from "./House";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import PathParameters from "./PathParameters";
import ServerComponentDemo from "./ServerComponentDemo";
import SimpleArrays from "./SimpleArrays";
import Spreader from "./Spreader";
import Square from "./Square";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import VariableTypes from "./VariableTypes";
import VariablesAndConstants from "./VariablesAndConstants";
import TodoList from "./todos/TodoList";

export default function Lab3() {
  console.log("Hello World!");

  return (
    <div id="wd-lab3" className="container">
      <h2>Lab 3</h2>

      <h3>3.2 Introduction to JavaScript</h3>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />

      <h3>3.3 JavaScript Functions</h3>
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />

      <h3>3.4 JavaScript Data Structures</h3>
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreader />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />

      <h3>3.5 Dynamic Styling</h3>
      <Classes />
      <Styles />

      <h3>3.6 Client and Server Components</h3>
      <ClientComponentDemo />
      <ServerComponentDemo />

      <h3>3.7 Parameterizing Components</h3>
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        ratione eaque illo minus cum, saepe totam vel nihil repellat nemo
        explicabo excepturi consectetur. Modi omnis minus sequi maiores,
        provident voluptates.
      </Highlight>
      <hr />
      <PathParameters />

      <h3>3.8 Rendering a Data Structure</h3>
      <TodoList />

      <h3>3.9 Debugging</h3>
      <p>
        Open browser developer tools and check the console for logged output.
      </p>
    </div>
  );
}
