import React, { useState } from "react";
import { css } from "@emotion/react";
import { InputGroup, Input, InputRightElement, Box } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const inputStyle = css`
  border-radius: 15px;
  background-color: #fafafa;
  &:hover {
    background-color: #fafafa;
  }
  &:focus {
    background: #fff;
  }
`;

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form>
      <Box>
        <InputGroup>
          <Input
            variant="filled"
            css={inputStyle}
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
            value={inputValue}
          />
          <InputRightElement>
            <BiSearch fontSize="20px" />
          </InputRightElement>
        </InputGroup>
      </Box>
    </form>
  );
};

export default Search;
