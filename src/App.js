import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { Container, Content, Row } from "./styles";

const rows = [
  ['C', 'X', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', ',', '='],
];

const operators = ['+', '-', '*', '/', '%'];

function App() {
  const [currentExpression, setCurrentExpression] = useState('');

  const handleConcatenateDigit = (newSymbol) => {
    if (operators.includes(newSymbol)) {
      if (currentExpression === '') {
        return;
      }

      if (operators.some((operator) => currentExpression.includes(operator))) {
        handleCalculate();
      }
      
      const lastSymbol = currentExpression[currentExpression.length - 1];
      if (operators.includes(lastSymbol) && newSymbol !== lastSymbol) {
        setCurrentExpression(currentExpression.slice(0, -1));
      }
      
    }

    setCurrentExpression(prev => `${prev}${newSymbol}`);
  }

  const handleCalculate = () => {
    const operator = operators.find((operator) => currentExpression.includes(operator));
    const [firstNumber, secondNumber] = currentExpression.split(operator);
    const firstNumberParsed = parseFloat(firstNumber);
    const secondNumberParsed = parseFloat(secondNumber);

    let result = 0;

    if (operator === '+') {
      result = firstNumberParsed + secondNumberParsed;
    }

    if (operator === '-') {
      result = firstNumberParsed - secondNumberParsed;
    }

    if (operator === '*') {
      result = firstNumberParsed * secondNumberParsed;
    }

    if (operator === '/') {
      result = firstNumberParsed / secondNumberParsed;
    }

    if (operator === '%') {
      result = firstNumberParsed % secondNumberParsed;
    }

    setCurrentExpression(`${result}`);
  }

  const handleOnClick = (buttonValue) => {
    if (buttonValue === '=') {
      handleCalculate();
      return;
    }

    if (buttonValue === 'C') {
      setCurrentExpression('');
      return;
    }

    if (buttonValue === 'X') {
      setCurrentExpression(prev => `${prev}`.slice(0, -1));
      return;
    }

    handleConcatenateDigit(buttonValue);
  }

  return (<>
    <Container>
      <Content>
        <Input value={currentExpression}/>
        {rows.map((row) => 
          <Row>
            {row.map((value) => <Button label={value} onClick={() => handleOnClick(value)}/>)}
          </Row>
        )}
      </Content>
    </Container>
  </>
  )
}

export default App;
