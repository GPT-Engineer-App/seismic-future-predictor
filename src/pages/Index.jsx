import { Box, Flex, Text, Button, VStack, HStack, Heading, Container, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaMapMarkedAlt, FaChartLine, FaSearchLocation } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [earthquakes, setEarthquakes] = useState([]);

  // Dummy data for past earthquakes (normally you would fetch this from an API)
  const pastEarthquakes = [
    { id: 1, date: "2021-01-01", magnitude: 5.2, location: "Tokyo" },
    { id: 2, date: "2022-05-11", magnitude: 6.4, location: "Osaka" },
    { id: 5, date: "2023-02-18", magnitude: 4.3, location: "Nagoya" },
    { id: 6, date: "2023-06-07", magnitude: 1.2, location: "Sapporo" },
    { id: 7, date: "2023-11-30", magnitude: 3.5, location: "Fukuoka" },
    // ... more data
  ];

  const predictEarthquakesBasedOnRealData = () => {
    setIsLoading(true);
    // Simulate predictions based on actual past earthquakes
    setTimeout(() => {
      const futureEarthquakes = pastEarthquakes.map((quake) => ({
        id: quake.id + pastEarthquakes.length, // Generate a new id
        date: new Date(new Date(quake.date).setFullYear(new Date(quake.date).getFullYear() + 1)).toISOString().split("T")[0], // Increment the year for prediction
        magnitude: (quake.magnitude + Math.random() * 0.5).toFixed(1), // Slightly alter the magnitude
        location: quake.location,
      }));
      setEarthquakes(futureEarthquakes);
      setIsLoading(false);
      toast({
        title: "Prediction complete",
        description: "Future earthquakes have been predicted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={5}>
        <Heading as="h1" size="2xl">
          Earthquake Prediction Map
        </Heading>
        <Text>Analyze past earthquake data to predict future seismic events and visualize them on a map.</Text>
        <Button leftIcon={<FaSearchLocation />} colorScheme="teal" onClick={predictEarthquakesBasedOnRealData} isLoading={isLoading}>
          Predict Earthquakes
        </Button>
        <SimpleGrid columns={2} spacing={10}>
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading as="h3" size="lg" mb={4}>
              Past Earthquakes
            </Heading>
            <VStack spacing={4}>
              {pastEarthquakes.map((quake) => (
                <HStack key={quake.id} justifyContent="space-between">
                  <Text fontWeight="bold">{quake.date}</Text>
                  <Text>Magnitude: {quake.magnitude}</Text>
                  <Text>{quake.location}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading as="h3" size="lg" mb={4}>
              Predicted Earthquakes
            </Heading>
            <VStack spacing={4}>
              {earthquakes.map((quake) => (
                <HStack key={quake.id} justifyContent="space-between">
                  <Text fontWeight="bold">{quake.date}</Text>
                  <Text>Magnitude: {quake.magnitude}</Text>
                  <Text>{quake.location}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
        <Flex justifyContent="center" alignItems="center" w="100%" h="400px" borderWidth="1px" mt={10}>
          <Button leftIcon={<FaMapMarkedAlt />} colorScheme="blue">
            View on Map
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;
