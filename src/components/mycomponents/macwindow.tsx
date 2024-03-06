'use client';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Card } from '../ui/card';

// Define the typing and blinking animations
const typingAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// Styled component for the typing cursor
const TypingCursor = styled.span<{ steps: number }>`
  &::after {
    content: '|';
    animation: ${typingAnimation} 2s steps(${props => props.steps}) infinite,
      ${blinkAnimation} 2s infinite;
    display: inline-block;
    vertical-align: text-bottom;
  }
`;

// Styled component for the code snippet
const CodeSnippet = styled.code`
  display: block;
  white-space: pre-wrap;
  overflow: hidden;
`;

const MacBrowserWindow = () => {
  const [typedCode, setTypedCode] = useState('');
  const showCode = true;

  useEffect(() => {
    // Define the code snippet
    const code = `deef HelloWorld()\n\treturn "Welcome to College of Computer Studies!"\nprint(HelloWorld())`;
    let index = 0;

    // Start the typing animation
    const timeout = setInterval(() => {
      setTypedCode(prevCode => prevCode + code[index]);
      index++;

      // Stop the animation when the code is fully typed
      if (index === code.length - 1) {
        clearInterval(timeout);
      }
    }, 150);

    // Clean up the interval on component unmount
    return () => clearInterval(timeout);
  }, []);

  return (
    <Card className="flex flex-col bg-gray-300 rounded-lg shadow-lg sm:w-96 md:w-2/3 lg:w-3/4 xl:w-max overflow-hidden mx-auto">
      <div className="flex max-h-full items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="text-2xl flex w-max flex-col items-center justify-start flex-1 p-4 text-black">
        <CodeSnippet>
          {showCode && typedCode}
          {showCode && <TypingCursor steps={typedCode.length} />}
        </CodeSnippet>
      </div>
    </Card>
  );
};

export default MacBrowserWindow;