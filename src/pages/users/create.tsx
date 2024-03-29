import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";


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


export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response  = await api.post('users', {
      user: {
        ...user,
        createdAt: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const {errors} = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  }

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