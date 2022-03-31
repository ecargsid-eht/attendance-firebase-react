import { AspectRatio, Box, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase-config'
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const nav = useNavigate()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  let errorMessage = null


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    localStorage.setItem("user",user.uid)
    nav("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    errorMessage = error.message;
  });
  }
  return (
    // <Container height="100vh">
    <div>
      <AspectRatio ratio={21 / 10.11}>
        <Image src="https://wallpapersmug.com/download/2560x1440/47e6d5/stack-books.jpg"
        />
      </AspectRatio>
      <Text paddingLeft="200px" paddingRight="500px" fontSize="8pc" position="fixed" lineHeight={1} fontFamily="Catamaran, sans-serif" top={10} marginTop={200} left={0} color='white'>Attendance just made simple!</Text>

      {/* <Button position="fixed" variant="solid" _hover={{cursor:"pointer"}} top={350} right={160} color="white" fontSize={40} fontFamily="Catamaran, sans-serif" border={0} borderRadius="20px" background="linear-gradient(to right, teal, green)" height={70} width={280} >Get Started</Button> */}


      <Box position="fixed" boxShadow="xl" background="#eee" top={250} right={100} fontFamily="Catamaran, sans-serif" fontSize={20} fontWeight={500} height={400} width={370} border="none" borderRadius="30px" padding="20px">
        <Text fontSize={40} bgGradient="linear(to-r, teal, green)" bgClip="text" textDecoration="underline green">Get Started!</Text>
      <FormControl paddingTop={30}>
        <FormLabel htmlFor='email' color="grey" fontSize={20} mb={0}>Email address</FormLabel>
        <Input size="lg" id='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' borderWidth={3} borderRadius={30} placeholder='Enter your email.' />
        <Text color='red'>{errorMessage}</Text>

        <FormLabel htmlFor='email' color="grey" fontSize={20} paddingTop={8} mb={0}>Password</FormLabel>
        <Input size="lg" id='email' type='password' value={password} onChange={(e) => setPassword(e.target.value)} borderWidth={3} borderRadius={30} placeholder='Enter your password.'/>

        <Button width="full" onClick={handleLogin} bgGradient="linear(to-r,teal,green)" _hover={"bgGradient=linear(to-r,teal,green)"} color="white" fontSize={20} mt={10}>LOGIN</Button>
      </FormControl>
      </Box>
    </div>
    /* </Container> */

  )
}

export default Welcome