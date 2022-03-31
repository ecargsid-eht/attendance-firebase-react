import { Box, Button, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { InfoOutlineIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { onValue, ref } from 'firebase/database';

function Dashboard() {
    const nav = useNavigate();
    const [count,setCount] = useState(0)
    const [present, setPresent] = useState(0)
    let counter = 0
    let presentCount = 0
    useEffect(() => {
        if(localStorage.getItem("user") === null){
            nav("/welcome")
        }
        let countRef = ref(db,"students")
        
        onValue(countRef,(snapshot) => {
            snapshot.forEach((child) => {
                // setCount(2)
                counter++;
                if (child.val()['status'] === 1) {
                    presentCount++
                }
            })
            setCount(counter)
            setPresent(presentCount)
            // console.log(present)
        })
    })
    return (
        <div>
            <Grid px="11pc" mt={10} templateColumns='repeat(2,1fr)' gap={6} color="white">
                <GridItem w='100%' boxShadow="lg" border="1px solid #eee" px={10} py={3} backgroundColor="#6610f2" borderRadius={9}>
                    <Text fontSize="5pc" fontFamily="Catamaran, sans-serif" >{count}</Text>
                    <Divider/>
                    <Flex justifyContent="space-between">
                    <Text fontSize="30px" fontFamily="Catamaran, sans-serif">Total Students</Text>
                    <Button onClick={() => (nav("/students"))} variant="ghost" _hover={{}}><ExternalLinkIcon/></Button>
                    </Flex>
                </GridItem>
                <GridItem w='100%' boxShadow="lg" border="1px solid #eee" px={10} py={3} backgroundColor="blue.400" borderRadius={9}>
                    <Text fontSize="5pc" fontFamily="Catamaran, sans-serif" >{present}</Text>
                    <Divider/>
                    <Flex justifyContent="space-between">
                    <Text fontSize="30px" fontFamily="Catamaran, sans-serif">Total Present Today</Text>
                    <Button variant="ghost" _hover={{}}><ExternalLinkIcon/></Button>
                    </Flex>
                </GridItem>
                {/* <GridItem w='100%' boxShadow="lg" border="1px solid #eee" px={10} py={3} backgroundColor="red.600" borderRadius={9}>
                    <Text fontSize="5pc" fontFamily="Catamaran, sans-serif" >100</Text>
                    <Divider/>
                    <Flex justifyContent="space-between">
                    <Text fontSize="30px" fontFamily="Catamaran, sans-serif">Total Absent</Text>
                    <Button variant="ghost" _hover={{}}><ExternalLinkIcon/></Button>
                    </Flex>
                </GridItem> */}
            </Grid>
           <Box display="flex" justifyContent="center"  mx="15%" mt="100px" py="10px" boxShadow="lg" width="70%" border="1px solid #eee">
               <InfoOutlineIcon mt="3px" me="20px" width={6} height={6} />
               <Text fontFamily="Catamaran, sans-serif" fontSize="20px">The card of "Total Present" and "Total Absent" is refreshed everyday at 12a.m.</Text>
           </Box>
        </div>
    )
}

export default Dashboard