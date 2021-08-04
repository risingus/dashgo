import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Lima</Text>
          <Text color="gray.300" fontSize="small">
            gustavo.it@outlook.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Gustavo Lima" src="https://avatars.githubusercontent.com/u/42497575?v=4" />
    </Flex>
  );
}
