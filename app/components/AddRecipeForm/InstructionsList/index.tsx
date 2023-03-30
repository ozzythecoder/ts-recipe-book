import { useContext } from "react";
import { FormContext } from "../FormContext";

const InstructionsList = () => {
  const { instructionsIn } = useContext(FormContext);

  return instructionsIn ? (
    <ol>
      {instructionsIn.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  ) : null;
};

export default InstructionsList;
