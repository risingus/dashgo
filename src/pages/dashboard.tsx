import { Box, Flex, SimpleGrid, Text, theme} from "@chakra-ui/react";
import {Header} from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from 'next/dynamic';

const Chart  =  dynamic(() => import('react-apexcharts'), {
  ssr: false
})
const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show:false
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-07-22T00:00:00.000Z',
      '2021-07-23T00:00:00.000Z',
      '2021-07-24T00:00:00.000Z',
      '2021-07-25T00:00:00.000Z',
      '2021-07-26T00:00:00.000Z',
      '2021-07-27T00:00:00.000Z',
      '2021-07-28T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const series = [
  {
    name: 'series1', data: [31, 120, 10, 28, 51, 37, 199]
  }
]

export default function Dashboard() {
  return(
    <Flex direction="column" h="100vh">  
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">

          <Box p="8" bg="gray.800" borderRadius={8} pb="4" >
              <Text fontSize="large" mb="4" >Inscritos da semana</Text>
              <Chart type="area" height={160} options={options} series={series} />
          </Box>

          <Box p="8" bg="gray.800" borderRadius={8} >
              <Text fontSize="large" mb="4" >Taxa de abertura</Text>
              <Chart type="area" height={160} options={options} series={series} />
          </Box>

        </SimpleGrid>
      </Flex>
    </Flex>
    
  )
}