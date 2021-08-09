import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import React, { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface ChakraLinkrops extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: ChakraLinkrops) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" _hover={{ color: "pink.400" }} {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
