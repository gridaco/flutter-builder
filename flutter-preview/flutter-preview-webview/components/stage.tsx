import React from "react";
import styled from "@emotion/styled";
import { Resizable, ResizeDirection } from "re-resizable";
import useMeasure from "react-use-measure";

/**
 * Resizable stage for widget preview - children will be iframe
 */
export function Stage({
  fullsize = false,
  handleMargin = 16,
  minSize = { width: 100, height: 100 },
  children,
}: React.PropsWithChildren<{
  fullsize?: boolean;
  handleMargin?: number;
  minSize?: { width: number; height: number };
}>) {
  const [ref, bounds] = useMeasure();
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: 400,
    height: 400,
  });

  const onResize = React.useCallback(
    // ResizeCallback
    (
      e: MouseEvent | TouchEvent,
      direction: ResizeDirection,
      ref: HTMLElement,
      d: { width: number; height: number }
    ) => {
      setSize((prev) => ({
        // calculate new size with min & max
        // min = minSize
        // max = bounds
        width: Math.max(
          Math.min(prev.width + d.width, bounds.width),
          minSize.width
        ),
        height: Math.max(
          Math.min(prev.height + d.height, bounds.height),
          minSize.height
        ),
      }));
    },
    [setSize, bounds.width, bounds.height, minSize]
  );

  const handle_shared_style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const Body = () => (
    <Frame data-state={fullsize ? "fullsize" : "staged"}>
      {/* A wrapper for overflow: hidden */}
      {children}
    </Frame>
  );

  return (
    <StageContainer ref={ref}>
      {fullsize ? (
        <Body />
      ) : (
        <ResizableCanvas
          // allow only left, right, bottom
          enable={{
            top: false,
            right: true,
            bottom: true,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          minHeight={minSize.height}
          minWidth={minSize.width}
          handleStyles={{
            left: {
              left: -handleMargin,
              ...handle_shared_style,
            },
            right: {
              right: -handleMargin,
              ...handle_shared_style,
            },
            bottom: {
              bottom: -handleMargin,
              ...handle_shared_style,
            },
          }}
          handleComponent={{
            left: <Handle data-position="left" />,
            right: <Handle data-position="right" />,
            bottom: <Handle data-position="bottom" />,
          }}
          size={size}
          onResize={onResize}
          style={{
            width: fullsize ? "100%" : size.width,
            height: fullsize ? "100%" : size.height,
          }}
        >
          <Body />
        </ResizableCanvas>
      )}
    </StageContainer>
  );
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;

  &[data-state="staged"] {
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.04);
  }

  transition: box-shadow 0.1s ease-in-out, border 0.1s ease-in-out,
    border-radius 0.1s ease-in-out;

  will-change: box-shadow, border, border-radius;
`;

// @ts-ignore
const ResizableCanvas = styled(Resizable)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Handle = styled.div`
  user-select: none;
  z-index: 2;

  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 40px;

  &[data-position="left"] {
    width: 4px;
    height: 80px;

    /* center in parent */
    margin: 0 auto;
  }

  &[data-position="right"] {
    width: 4px;
    height: 80px;
  }

  &[data-position="bottom"] {
    width: 80px;
    height: 4px;
  }

  /* other directions not supported */
`;
