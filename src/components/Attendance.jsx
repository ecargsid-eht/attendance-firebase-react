import React, { useEffect, useState } from 'react'
import { Table, Text, Thead, Tbody, Tr, Th, Td, Container, Divider, Flex, Button, Skeleton, Grid, GridItem } from '@chakra-ui/react'

import { child, get, onValue, push, ref, remove, set, update } from 'firebase/database';
import { db } from '../firebase-config'
import { useNavigate } from 'react-router-dom';

function Attendance() {
    const nav = useNavigate()
    const [students, setStudents] = useState([])
    // const [reset,setReset] = useState(false)

    // function resetAttendance() {
    //     let studentsData = ref(db, "students")
    //     let data = [...students]

    //     onValue(studentsData, (snapshot) => {
    //         snapshot.forEach((child) => {
    //             var value = child.val()
    //             value['key'] = child.key
    //             data = [...data,value]
    //         })
    //         data.forEach((datum) => {   
    //             // console.log(datum.name)
    //             var reset = ref(db, "students/" + datum.key)
    //             update(reset, { ...datum, status: 0 }) //firebase
    //             datum = {...datum,status:0} // data update
    //         })

    //     })
    //         // setStudents([])
    //     setReset(true)
    //     console.log(data)

    // }

    function resetAttendance(){
        console.log("data")
        let resetData = [...students]
        resetData.forEach((datum) => {
            console.log(datum.key)
            let resetDatum = ref(db,"students/"+datum.key)
            update(resetDatum,{status:0})
        })

    }

    function statusHandler(key, roll, name, course, image, semester, status) {
        // if (status === 0) {
            let student = ref(db, "students/" + key)
            update(student, {
                roll: roll,
                name: name,
                image: image,
                course: course,
                semester: semester,
                status: 1
            })
        // }
    }




    useEffect(() => {
        if(localStorage.getItem("user") === null){
            nav("/welcome")
        }
        let students = ref(db, "students")

        onValue(students, (snapshot) => {
            let data = []
            snapshot.forEach((child) => {
                var value = child.val()
                value['key'] = child.key
                data = [...data, value]
            })
            setStudents(data)
        })

    }, [])


    return (
        <div>

            <Button onClick={() => resetAttendance()} variant="solid" ms="8pc" mt={30} colorScheme="green">Reset Attendance</Button>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                    <Container pb="40px" pt="0" px="0" mr={2} maxWidth="container.sm" border="1px solid #eee" borderRadius="10px" boxShadow="lg" mt="10">
                        <Flex justifyContent="space-between">
                            <Text padding="10px" fontSize="30px" backgroundColor="#eee" fontFamily="Catamaran, sans-serif" borderTopRadius="10px">Present Students</Text>
                        </Flex>
                        <Divider mb="40px" />
                        <Table variant='simple' size="sm">
                            <Thead>
                                <Tr>
                                    <Th>STUDENT ROLL</Th>
                                    <Th>STUDENT NAME</Th>
                                    <Th>COURSE</Th>
                                    <Th>SEMESTER</Th>
                                    <Th>Status</Th>
                                    <Th isNumeric>STATUS</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(students.length === 0) &&
                                    <>
                                        <Tr>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                        </Tr>

                                    </>}
                                {students.map((student) => (
                                    (student.status === 1) && <>
                                        <Tr key={student.key}>
                                            <Td>{student.roll}</Td>
                                            <Td>{student.name}</Td>
                                            <Td>{student.course}</Td>
                                            <Td>Semester {student.semester}</Td>
                                            <Td>{student.status}</Td>
                                            <Td isNumeric>
                                                <Text bg="green.100" p={2} borderRadius={10} colorScheme="red" pr={3} py={3}>Present</Text>

                                            </Td>
                                        </Tr>
                                    </>

                                ))}

                            </Tbody>

                        </Table>
                    </Container>
                </GridItem>

                <GridItem>
                    <Container pb="40px" pt="0" px="0" ml={2} maxWidth="container.sm" border="1px solid #eee" borderRadius="10px" boxShadow="lg" mt="10">
                        <Flex justifyContent="space-between">
                            <Text padding="10px" fontSize="30px" backgroundColor="#eee" fontFamily="Catamaran, sans-serif" borderTopRadius="10px">Remaining</Text>
                        </Flex>
                        <Divider mb="40px" />
                        <Table variant='simple' size="sm">
                            <Thead>
                                <Tr>
                                    <Th>STUDENT ROLL</Th>
                                    <Th>STUDENT NAME</Th>
                                    <Th>COURSE</Th>
                                    <Th>SEMESTER</Th>
                                    <Th>STATUS</Th>
                                    <Th isNumeric>ACTION</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(students.length === 0) &&
                                    <>
                                        <Tr>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                            <Td><Skeleton height='20px' /></Td>
                                        </Tr>

                                    </>}
                                {students.map((student) => (
                                    (student.status !== 1) && <>
                                        <Tr key={student.key}>
                                            <Td>{student.roll}</Td>
                                            <Td>{student.name}</Td>
                                            <Td>{student.course}</Td>
                                            <Td>Semester {student.semester}</Td>
                                            <Td> {student.status}</Td>
                                            <Td isNumeric>
                                                <Button onClick={() => statusHandler(student.key, student.roll, student.name, student.course, student.image, student.semester, student.status)} colorScheme="green">P</Button>
                                            </Td>
                                        </Tr>
                                    </>
                                ))}

                            </Tbody>

                        </Table>
                    </Container>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Attendance;