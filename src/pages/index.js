import React, { useState } from "react";
import ReactDOM from "react-dom";

import { animated, useSpring } from "react-spring";
import styled, { ThemeProvider } from "styled-components";

import { Box, Container, Heading, Typography, Flex, theme } from "../../ui";

import "../../ui/molecules/global-styles/global.css";

const img =
  "https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const AnimatedItem = styled(animated(Flex))`
  cursor: pointer;
`;
AnimatedItem.defaultProps = {
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "column",
  color: "text100",
  size: 200,
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  border: "8px solid"
};

const AnimatedBox = styled(animated(Box))``;
AnimatedBox.defaultProps = {};

const ProgressBar = styled(Box)``;
ProgressBar.defaultProps = {
  height: 18,
  width: "100%",
  border: 1
};

function App() {
  const [clicked, setClicked] = useState(false);

  const {
    size,
    counter,
    progress,
    counterFontColor,
    ...springProps
  } = useSpring({
    progress: clicked ? "100%" : "0%",
    size: clicked ? 300 : 200,
    counter: clicked ? 100 : 0,
    counterFontColor: clicked ? "#fff" : "#000",
    backgroundPosition: clicked ? "50% 100%" : "50% 0%",
    from: {
      progress: "0%",
      size: 200,
      counter: 0,
      counterFontColor: "#000",
      backgroundPosition: "50% 0%"
    }

    // to: {
    //   progress: clicked ? "100%":"0%", //rather they have used directly uptop
    //   size: 300,
    //   counter: 0,
    //   counterFontColor: "#000",
    //   backgroundPosition: "50% 0%"
    // }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box bg="bg100" minHeight="100vh" py={1}>
        <Container>
          <Heading textAlign="center">React Spring Example - useSpring</Heading>
          <Typography textAlign="center">
            Click on the box to trigger animation
          </Typography>
          <Flex my={2} justifyContent="center">
            <ProgressBar>
              <AnimatedBox
                bg="blue"
                height="100%"
                style={{ width: progress }}
              />
            </ProgressBar>
            <AnimatedBox
              position="absolute"
              fontSize={0}
              style={{ color: counterFontColor }}
            >
              {counter.interpolate((val) => Math.floor(val) + "%")}
            </AnimatedBox>
          </Flex>
          <Flex
            height={330}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <AnimatedItem
              style={{ height: size, width: size, ...springProps }}
              onClick={() => setClicked(!clicked)}
            />
            <AnimatedBox opacity={0.6}>
              {counter.interpolate((val) => Math.floor(val) + "%")}
            </AnimatedBox>
          </Flex>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
