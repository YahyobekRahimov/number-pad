import { useEffect, useState } from "react";
import "./App.css";
import styled from "@emotion/styled";
import Backspace from "/src/assets/backspace.svg?react";

const companies = [
   {
      codes: [90, 91],
      icon: "https://beeline.uz/favicon.ico",
   },
   {
      codes: [94, 93, 50],
      icon: "https://ucell.uz/img/favicon.ico",
   },
   {
      codes: [33],
      icon: "https://humans.uz/app-icons/favicon-32x32.png",
   },
   {
      codes: [99, 98, 77, 95],
      icon: "https://uztelecom.uz/images/favicon.ico",
   },
];

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, "+", 0];

const Container = styled.div`
   width: 100%;
   max-width: 700px;
   padding-right: 160px;
   padding-left: 160px;
   margin-right: auto;
   margin-left: auto;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

const InputWrapper = styled.div`
   border: 1px solid #555;
   border-radius: 1rem;
   display: flex;
   padding: 20px;
   color: black;
   margin-bottom: 20px;
`;

const NumberInput = styled.div`
   border: none;
   font-size: 2rem;
   width: 100%;
   min-height: 40px;
   color: ${(props) => (props.isWrong ? "red" : "black")};
   &:focus {
      outline: none;
   }
`;

const NumberButton = styled.button`
   border: 1px solid #555;
   background: #dddcdc;
   padding: 10px 20px;
   cursor: pointer;
   border-radius: 0.3rem;
   font-size: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const NumbersWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   gap: 20px;
`;
function App() {
   const [phoneNumber, setPhoneNumber] = useState("");
   const [wrongCode, setWrongCode] = useState(false);
   const [picture, setPicture] = useState(
      "https://w7.pngwing.com/pngs/228/740/png-transparent-flag-of-uzbekistan-computer-icons-flag-miscellaneous-flag-grass.png"
   );
   function handleSpaceBetweenNumbers(prev, char) {
      let result = prev;

      if (prev.length == 4) {
         result = prev + " ";
      } else if (prev.length == 7) {
         result = prev + " ";
      } else if (prev.length == 11) {
         result = prev + "-";
      } else if (prev.length == 14) {
         result = prev + "-";
      } else {
         result = prev;
      }

      if (char == "+" && prev.length != 0) {
         return prev;
      }

      if (result.length + 1 == 7) {
         handleAreaCode(result + char);
      }

      return result + char;
   }

   function handleAreaCode(num) {
      const areaCode = Number(
         num.slice([num.length - 2], num.length)
      );
      for (let i = 0; i < companies.length; i++) {
         const company = companies[i];
         if (company.codes.includes(areaCode)) {
            setPicture(company.icon);
            setWrongCode(false);
            return;
         } else {
            setPicture(
               "https://w7.pngwing.com/pngs/228/740/png-transparent-flag-of-uzbekistan-computer-icons-flag-miscellaneous-flag-grass.png"
            );
            setWrongCode(true);
         }
      }
   }

   function handleButtonClick(character) {
      setPhoneNumber((prev) => {
         return handleSpaceBetweenNumbers(prev, character);
      });
   }
   function handleDelete() {
      setPhoneNumber((prev) => {
         if (
            isNaN(prev[prev.length - 1]) ||
            prev[prev.length - 1] == " "
         ) {
            return prev.slice(0, prev.length - 2);
         }
         return prev.slice(0, prev.length - 1);
      });
   }
   return (
      <>
         <Container>
            Example: <b>+998 XX XXX-XX-XX</b>
         </Container>
         <Container>
            <InputWrapper>
               <div className="flex items-center justify-center w-[3rem] h-[3rem]">
                  <img src={picture} alt="Icon" />
               </div>
               <NumberInput isWrong={wrongCode}>
                  {phoneNumber}
               </NumberInput>
            </InputWrapper>
            <NumbersWrapper>
               {numberList.map((character, index) => (
                  <NumberButton
                     onClick={() => handleButtonClick(character)}
                     key={index}
                  >
                     {character}
                  </NumberButton>
               ))}
               <NumberButton onClick={() => handleDelete()}>
                  <Backspace className="h-[2rem] w-max" />
               </NumberButton>
            </NumbersWrapper>
         </Container>
      </>
   );
}

export default App;
