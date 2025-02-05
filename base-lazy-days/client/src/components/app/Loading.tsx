import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  // will use React Query `useIsFetching` to determine whether or not to display
  const isFetching = useIsFetching(); // for now, just don't display
  const display = isFetching ? "inherit" : "none";

  return (
    <>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
      <span style={{position: 'fixed', bottom: '10px', left: '10px', color: 'red', fontSize: '40px', fontWeight: 'bold', zIndex: 999}}>{isFetching}</span>
    </>
  );
}
