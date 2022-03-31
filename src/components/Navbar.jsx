import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase-config'
import { Link as Option } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const nav = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    nav("/welcome")
  }
  return (
    <div>
      <HStack >
        <Flex width="100%" position="sticky" top={0} zIndex={1}  background="linear-gradient(to right, teal, green)" shadow="sm">
          <Text fontSize="30px" fontFamily="Catamaran, sans-serif" color="white" px={20} py={0} my={3} >
            ATMaker
          </Text>
          <Box width="70%"/>
          <Box color="white"  verticalAlign="center" mt="14px" >
            {(localStorage.getItem("user") !== null)&& <Flex>
            <Button variant="ghost" _hover={{}} onClick={() => nav("/")}>Dashboard</Button>
            <Button variant="ghost" _hover={{}} onClick={() => nav("/attendance")}>Make Attendance</Button>
            <Button variant="ghost" _hover={{}} onClick={handleLogout} mr={9}>Logout</Button>
            </Flex>}
          </Box>
        </Flex>
      </HStack>
    </div>
  )
}

export default Navbar