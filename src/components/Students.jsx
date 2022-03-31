import React, { useEffect, useState } from 'react'
import {
    Table, Text, Thead, Tbody, Tr, Th, Td, Container, Divider, Flex, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, FormControl, FormLabel, Input, Image, Skeleton, Select, Grid, GridItem, Progress
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { db, storage } from '../firebase-config'
import { uploadBytesResumable, ref as refFile, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Students() {

    const nav = useNavigate()
    const [image, setImage] = useState("")

    function deleteHandler(key) {

        let deleteRef = remove(ref(db, `students/${key}`))
    }

    function imageHandler(e) {
        setImageProgress(1)
        if (e.target.files[0]) {
            let file = e.target.files[0]
            const refStorage = refFile(storage, `/student_images/${file.name}`)

            const upload = uploadBytesResumable(refStorage, file)

            upload.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setImageProgress(progress)
            }, (error) => console.log(error),
                () => {
                    getDownloadURL(upload.snapshot.ref).then((url) => setImage(url));
                })

        }
    }

    useEffect(() => {

        if(localStorage.getItem("user") === null){
            nav("/welcome")
        }
        var students = ref(db, "students")

        onValue(students, (snapshot) => {
            let data = []
            snapshot.forEach((child) => {
                var value = child.val()
                value['key'] = child.key
                data = [...data, value]
            })
            setStudents(data)
        })

        setImageProgress(0)
    }, [])

    function handleAdd() {
        var details = push(ref(db, "students"))

        set(details, {
            name: name,
            roll: roll,
            course: course,
            semester: semester,
            image: image,
            status:0
        })

        setName("")
        setRoll("")
        setCourse("")
        setSemester("")
        setImage("")
        setImageProgress(0)
        onClose()
    }
    const [students, setStudents] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("")
    const [roll, setRoll] = useState("")
    const [course, setCourse] = useState("")
    const [semester, setSemester] = useState("")

    const [imageProgress, setImageProgress] = useState(0)

    return (
        <div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Student</ModalHeader>
                    <ModalCloseButton />

                    <Divider />
                    <ModalBody>
                        <FormControl>
                            <FormLabel paddingTop={7}>Student Name</FormLabel>
                            <Input type="text" placeholder='Enter Student Name.' value={name} onChange={(e) => setName(e.target.value)} />

                            <Grid templateColumns="repeat(2,1fr)" gap={3}>
                                <GridItem>
                                    <FormLabel paddingTop={7}>Student Roll</FormLabel>
                                    <Input type="number" placeholder='Enter Student Roll Number.' value={roll} onChange={(e) => setRoll(e.target.value)} />
                                </GridItem>

                                <GridItem>
                                    <FormLabel paddingTop={7}>Select Course</FormLabel>
                                    <Select placeholder='Select Course' value={course} onChange={(e) => setCourse(e.target.value)} >
                                        <option value="MCA">MCA</option>
                                        <option value="BCA">BCA</option>
                                        <option value="Btech">Btech</option>
                                    </Select>
                                </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(2,1fr)" gap={3}>
                                <GridItem>
                                    <FormLabel paddingTop={7}>Select Semester</FormLabel>
                                    <Select placeholder='Select Semester.' value={semester} onChange={(e) => setSemester(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        {
                                            (course === "BCA" || course === "Btech") && <>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </>
                                        }

                                        {
                                            (course === "Btech") && <>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                            </>
                                        }
                                    </Select>
                                </GridItem>

                                <GridItem>
                                    <FormLabel paddingTop={7}>Upload Image</FormLabel>
                                    <Input paddingTop={2} type="file" onChange={(e) => imageHandler(e)} />
                                    {(imageProgress !== 100) && <><Text color="red">not uploaded</Text><Progress size="xs" isIndeterminate /></>}
                                    {(imageProgress === 100) && <><Text color="green">uploaded</Text></>}
                                </GridItem>
                            </Grid>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleAdd} w="full" colorScheme='green'>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Container pb="40px" pt="0" px="0" maxWidth="container.lg" border="1px solid #eee" borderRadius="10px" boxShadow="lg" mt="10">
                <Flex justifyContent="space-between">
                    <Text padding="10px" fontSize="30px" backgroundColor="#eee" fontFamily="Catamaran, sans-serif" borderTopRadius="10px">Students List</Text>
                    <Button onClick={onOpen} variant="solid" borderRadius="50%" size="lg" fontSize="30px" mt="2" me="3" px="2" pb="2">+</Button>
                </Flex>
                <Divider mb="40px" />
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>STUDENT ROLL</Th>
                            <Th>STUDENT NAME</Th>
                            <Th>STUDENT IMAGE</Th>
                            <Th>COURSE</Th>
                            <Th>SEMESTER</Th>
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
                                    <Td><Skeleton height='20px' /></Td>
                                </Tr>

                            </>}
                        {students.map((student) => (
                            <Tr key={student.key}>
                                <Td>{student.roll}</Td>
                                <Td>{student.name}</Td>
                                <Td><Image src={student.image} width={20} height="80px" /></Td>
                                <Td>{student.course}</Td>
                                <Td>Semester {student.semester}</Td>
                                <Td isNumeric>
                                    <Button onClick={() => deleteHandler(student.key)} colorScheme="red"><DeleteIcon /></Button>

                                </Td>
                            </Tr>
                        ))}

                    </Tbody>

                </Table>
            </Container>
        </div>
    )
}

export default Students