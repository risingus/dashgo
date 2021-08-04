import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function CreteUsder() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar /> 

        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}> 
        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="name" label="Nome Completo" />
            <Input name="email" label="E-mail" />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="password" label="Senha" type="password" />
            <Input name="password_confirmation" type="password" label="Confirmação da senha" />
          </SimpleGrid>
        </VStack>

        <Flex justify="flex-end" mt="8">
          <HStack spacing="4">

            <Link
              href="/users"
              passHref
            >
              <Button as="a" colorScheme="whiteAlpha" >
                Cancelar
              </Button>
            </Link>
           

            <Button colorScheme="pink" >
              Salvar
            </Button>
          </HStack>
        </Flex>

        </Box>

      </Flex>
    </Box>
    )
}