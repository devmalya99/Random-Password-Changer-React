import { useState, useCallback, useEffect } from "react";

import "./App.css";

function App() {
  // Initialize state variables for length, numbers, chars, and pass
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  // Callback function to generate password based on the state values
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // If numbers are permitted, add numericals to the string
    if (number) str += "0123456789";

    // If special chars are permitted, add special characters to the string
    if (char) str += "!@#$%^&*()_+₹";

    // Generate password by randomly selecting characters from the string
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    // Set the new password
    setPass(pass);
  }, [length, number, char, setPass]);

  // Call passwordGenerator on component mount and whenever length, number,
  // char values change
  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* Main div for password generator */}
      <div className="w-4/5 xl:w-2/5 lg:w-3/5 md:w-4/5 sm:w-4/5 rounded-md shadow-md p-6 bg-white">
        <h1 className="text-4xl font-bold underline text-center text-black mb-6">
          Password Generator
        </h1>

        {/* Password display and Copy to Clipboard button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={pass}
            className="text-center border-2 border-gray-300 p-2 rounded outline-none bg-gray-50 flex-grow"
            placeholder="Password"
            readOnly
            aria-label="Generated Password"
          />
          <button
            className="outline-none px-3 py-1.5 rounded bg-blue-400 text-white font-semibold text-lg transition duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 focus:ring-2 focus:ring-purple-600 active:bg-purple-700"
            aria-label="Copy to Clipboard"
            onClick={() => {
              navigator.clipboard.writeText(pass);
            }}
          >
            Copy
            <i class="far fa-copy"></i>
          </button>
        </div>

        {/* Password options for length, include numbers, and include symbols */}
        <div className="flex text-sm gap-x-2">
          {/* Password length option */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Include numbers checkbox option */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={(e) => {
                setNumber(e.target.checked);
              }}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          {/* Include symbols checkbox option */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={(e) => {
                setChar(e.target.checked);
              }}
            />
            <label htmlFor="numberInput">Include Symbols</label>
          </div>
        </div>

        {/* Generate Password Button */}
        <div className="mt-6">
          <button
            onClick={passwordGenerator}
            className="w-full py-2 rounded bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold text-lg"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
