import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'


type CreateUserFormData = {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

const handleCreateUser: SubmitHandler<CreateUserFormData> = async (value) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(value)
}

export default function CreteUsder() {
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const {errors} = formState;

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar /> 

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)} > 
        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="name" label="Nome Completo" {...register("name")} error={errors.name}/>
            <Input name="email" label="E-mail" {...register('email')} error={errors.email}/>
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="password" label="Senha" type="password" {...register("password")} error={errors.password}/>
            <Input name="password_confirmation" type="password" label="Confirmação da senha" {...register("password_confirmation")} error={errors.password_confirmation}/>
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
           

            <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>
              Salvar
            </Button>
          </HStack>
        </Flex>

        </Box>

      </Flex>
    </Box>
    )
}