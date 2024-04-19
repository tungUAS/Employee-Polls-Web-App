import React from "react";

const ButtonGoBackTo = ({
  text,
  handleClick,
  dataTestId,
}: {
  text: string;
  handleClick: () => void;
  dataTestId: string | null;
}) => {
  return (
    <button onClick={handleClick} data-testid={dataTestId}>
      {text}
    </button>
  );
};

export default ButtonGoBackTo;
