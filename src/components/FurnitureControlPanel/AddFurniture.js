import { Box, Button, Container, FormControl, FormHelperText, Grid, GridItem, Heading, Input, InputGroup, List, ListItem, Select, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import useFileUpload from 'react-use-file-upload';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useStateIfMounted } from 'use-state-if-mounted'
import { useNavigate } from 'react-router-dom';
import { createSubscriptionAsync } from '../../redux/subscriptions/thunks';
import { getConfigAsync, uploadFileAsync } from '../../redux/azure/thunks';
import { insertFirestoreAsync } from '../../redux/firestore/thunks';


const AddFurniture = () => {
    const { user } = useSelector(state => state.user)
    const { subscription } = useSelector(state => state.subscription)
    const { successfulUpload } = useSelector(state => state.azure)
    const { successfulInsert } = useSelector(state => state.firestore)
    const [displayUploadProgress, setDisplayUploadProgress] = useState("none")
    const [hasFinishedUploading, setHasFinishedUploading] = useState(false)
    const [hasFinishedQueryingNoSQL, setHasFinishedQueryingNoSQL] = useState(false)

    const dispatch = useDispatch();

    const [content, setContent] = useState([])


    const [fileNamesAndPrices, setFileNamesAndPrices] = useState([])


    useEffect(() => {
        setHasFinishedUploading(successfulUpload)
    }, [successfulUpload])

    useEffect(() => {
        setHasFinishedQueryingNoSQL(successfulInsert)
    }, [successfulInsert])

    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const handleInputChange = (index, e) => {
        const values = [...fileNamesAndPrices];
        const newValue = e.target.name;
        values[index][newValue] = e.target.value;
        setFileNamesAndPrices(values)
        console.log(values)
    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            itemvalues: [{}]
        });
    };

    var inputRef = useRef();

    async function upload() {
        try {
            if (fileNamesAndPrices.length + subscription.occupiedCap > subscription.furnitureCap) {
                console.log("Not enough space. Please upgrade subscription")
            } else {
                setDisplayUploadProgress('block')
                dispatch(uploadFileAsync(files))
                let data = {
                    Id: user.id,
                    Type: subscription.type,
                    Price: subscription.price,
                    FurnitureCap: subscription.furnitureCap,
                    OccupiedCap: subscription.occupiedCap + fileNamesAndPrices.length
                }
                dispatch(createSubscriptionAsync(data))
                setFiles([]);
                initConfig();
                handleReset();
                setFileNamesAndPrices([]);
            }
        } catch (error) {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(files)
        console.log(fileNamesAndPrices)

        var furniturePiecesData = []

        fileNamesAndPrices.forEach(element => {
            furniturePiecesData.push({
                "Name": element.Name,
                "CompanyName": user.companyName,
                "Price": element.Price,
                "Room": element.Room
            })
        });
        var fileArray = []

        if (files[0].name.split('.').pop() === 'unity3d') {

            fileArray.push({
                "FileName": files[0].name,
                "FurniturePieces": furniturePiecesData
            })

            fileArray.push({
                "FileName": files[1].name,
                "furniturePieces": []
            })
        } else {
            fileArray.push({
                "FileName": files[1].name,
                "FurniturePieces": furniturePiecesData
            })

            fileArray.push({
                "FileName": files[0].name,
                "furniturePieces": []
            })
        }

        var firestoreData = {
            "CompanyName": user.companyName,
            "Files": fileArray,
        }

        console.log(JSON.stringify(firestoreData))

        dispatch(insertFirestoreAsync(firestoreData))
        upload()
    };

    const initConfig = async () => {
        dispatch(getConfigAsync());
    }

    const addFile = (e) => {
        if (e.target.value.split('.').pop() === 'unity3d' || e.target.value.split('.').pop() === 'manifest') {
            const arr = Array.from(e.target.files);
            arr.forEach((file, index) => {
                if (file.name.split('.').pop() === 'manifest') {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const text = e.target.result;
                        var newText = text.split(/\.|\/|\r?\n/);
                        for (let i = 0; i < newText.length; i++) {
                            if (newText[i] === 'prefab') {
                                setFileNamesAndPrices(fileNamesAndPrices => [...fileNamesAndPrices, { "Name": newText[i - 1], "Price": 0, "Room": "Other" }]);
                            }
                        }
                    }
                    reader.readAsText(file)
                }
            });
            setFiles(e, 'a')
        } else {
            alert("Wrong file extension!")
        }
    }

    useEffect(() => {
        setContent([])
        if(files.length === 1) {
            alert("Please select both files!");
            removeFile(0)
        } else 
        for (let i = 0; i < files.length; i += 2) {
            setContent(<Grid templateColumns={{ base: "100%", md: "50% 50%" }} mb={4}>
                <GridItem textAlign="center" width="100%" pb={20} pt={20} backgroundColor="whiteAlpha.600" borderRadius="5px" mr={2}>
                    <Box width="100%" textAlign="center">
                        <Text color="black" fontSize="2rem">{fileNamesAndPrices.length === 0 ? "Loading..." : ("Found " + fileNamesAndPrices.length + " furniture models.")}</Text>
                        <Text color="brown">FileName: {files[i].name}</Text>
                        <Text color="black">FileName: {files[i + 1].name}</Text>
                        <Button colorScheme="blackAlpha" onClick={() => {
                            removeFile(1);
                            removeFile(2);
                        }}
                        >Clear</Button>
                    </Box>
                </GridItem>
                <GridItem width="100%" backgroundColor="whitesmoke" borderRadius="5px" ml={2} position="relative" color="white">
                    {fileNamesAndPrices.map((field, index) => (
                        <Container p={4} key={index}>
                            <FormControl>
                                <InputGroup>
                                    <Stack width="100%" mb={2}>
                                        <Text color="black">Name of the furniture piece:</Text>
                                        <Input
                                            backgroundColor="gray.200"
                                            color="black"
                                            type="text"
                                            placeholder="Furniture name"
                                            autoComplete="on"
                                            name="Name"
                                            disabled
                                            value={field.Name}
                                            onChange={(e) => {
                                                handleInputChange(index, e);
                                            }}
                                        />
                                    </Stack>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Stack width="100%" mb={2}>
                                        <Text color="black">Price in RON per piece:</Text>
                                        <Input
                                            backgroundColor="gray.200"
                                            color="black"
                                            type="number"
                                            placeholder="Furniture price"
                                            autoComplete="on"
                                            name="Price"
                                            value={field.Price}
                                            onChange={(e) => {
                                                handleInputChange(index, e);
                                            }}
                                        />
                                    </Stack>
                                </InputGroup>
                            </FormControl>
                            <Stack>
                                <Text color="black">Room:</Text>
                                <Select
                                    color="black"
                                    backgroundColor="gray.200"
                                    name="Room" value={field.Room}
                                    onChange={(e) => {
                                        handleInputChange(index, e);
                                    }}>
                                    <option>LivingRoom</option>
                                    <option>Bathroom</option>
                                    <option>Bedroom</option>
                                    <option>Kitchen</option>
                                    <option>StorageRoom</option>
                                    <option>Office</option>
                                    <option>Gym</option>
                                    <option>Closet</option>
                                    <option>Attic</option>
                                    <option>Other</option>
                                </Select>
                            </Stack>

                        </Container>))}
                </GridItem>
            </Grid>)
        }

    }, [fileNamesAndPrices, files, removeFile])

    return (
        <>
            <Container maxW="container.xl">
                <Text fontSize="3rem" p={8} fontWeight="bold" color="#1C4532">Add furniture:</Text>
                <Text fontSize="1.5rem" p={1} color="#1C4532">Add the Unity AssetBundle files: (.unity3d) and the (.unity3d.manifest) and then fill in the required information for each furniture piece:</Text>
                {displayUploadProgress === 'none' ? <>{fileNames.length === 0 ?
                    <Grid templateColumns={{ base: "100%", md: "50% 50%" }}>
                        <GridItem textAlign="center" width="100%" pb={20} pt={20} backgroundColor="whiteAlpha.600" borderRadius="5px" mr={2}>
                            <Button colorScheme="blue" onClick={() => inputRef.current.click()}>Select files</Button>
                            <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => addFile(e)} />
                        </GridItem>

                        <GridItem width="100%" backgroundColor="whitesmoke" borderRadius="5px" ml={2} position="relative" color="white">



                        </GridItem>
                    </Grid> : <>
                        {content}
                    </>}
                    <Box textAlign="center" m="8">
                        <Button onClick={handleSubmit} p="7" colorScheme="facebook" m={2}>Upload</Button>
                    </Box></> :
                    <>
                        {hasFinishedUploading === false || hasFinishedQueryingNoSQL === false ? <>
                            <Text fontSize="3rem" p={4} fontWeight="bold" color="#1C4532">Uploading...</Text>
                            <Text fontSize="1.5rem" p={4} color="#1C4532">Please do not close this window. A confimartion message will appear one the upload is finished.</Text>
                        </> : <>
                            <Text fontSize="3rem" p={4} fontWeight="bold" color="#1C4532">Done!</Text>
                            <Text fontSize="1.5rem" p={4} color="#1C4532">You may close this window or navigate to another page.</Text>
                        </>
                        }
                    </>}

            </Container>
        </>
    )
}

export default AddFurniture