import React from "react";
import { useState} from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { useContext } from "react";
import { useDispatch } from 'react-redux'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,Button,
  Image,
  Box,
  Heading,
  Input,
  HStack,
  Flex,
  Center,
  ModalCloseButton,
  ModalHeader,
  
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Required from "./Required";
import { useDisclosure } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { addName } from "../../Redux/AuthRedux/action";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [butn, setbutn] = useState();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [pass, setpass] = useState(false);
  const [email, setemail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, setisAuth, Authdata, setAuthData } = useContext(AuthContext);
  const [resdata, setResdata] = useState([]);
  const [incorrect, setinCorrect] = useState(false);
  const navigate=useNavigate();

  const dispatch=useDispatch()


  const handlechange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    const buton = (
      <Box
        fontSize={"13px"}
        mt="19px"
        color={"#ff1f1f"}
        fontWeight="600"
        letterSpacing={"-0.5px"}
      >
        Please enter a valid Email or Mobile Number.
      </Box>
    );
    setbutn(buton);
  };
  let loData1 = [];

  const getData=(body)=>{
    console.log(body)
    let {email,password}=body;

    let send_data={
     email,password
    }

    fetch(`https://silly-tank-top-eel.cyclic.app/user/login`, {
               method: "POST",
               body: JSON.stringify(send_data),
               headers: {
                 "Content-Type": "application/json",
               },
             })
               .then((r)=>r.json())
               .then((res) => {
                   console.log(res);
                   if(res.status=="login successful"){
                    localStorage.setItem("name",JSON.stringify(res.name));
                    localStorage.setItem("token",JSON.stringify(res.token));
                    dispatch(addName(res.name))
                    // addName()
                    onClose();
                    alert("Congratulations...Login Succesfull...!!!")
                     navigate("/")
                   }
               }).catch((e)=>{
                 console.log(e)
               })

 }


  // const getData = () => {
  //   setLoading(true);
  //   fetch(`https://silly-tank-top-eel.cyclic.app/user/login`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       loData1 = res.filter((el) => el.email === loginData.email);
  //       if (loData1.length === 1) {
  //         setisAuth(true);
  //         setAuthData(loData1);
  //       } else {
  //         setinCorrect(true);
  //       }
  //     })

  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false))
  //     .finally(() => {
  //       if (isAuth === true) {
  //         onClose();
  //       }
  //     });
  // };

  const handlesign = () => {
    setpass(true);
    if (loginData.password.length > 6) {
      getData(loginData);
    }
  };
  console.log(loginData);
  console.log("incorrect", incorrect);
  console.log(isAuth);

  return (
    <div>
      <Center onClick={onOpen} fontWeight={"500"} fontSize="15px" w="65px">
        Sign In
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalHeader></ModalHeader>
        <ModalContent w={"420px"}>
          <ModalCloseButton
            borderRadius={"55%"}
            bg="white"
            m={"10px 10px 0px 0px"}
          />
          <ModalBody p={"0px 0px "} borderRadius={"17px 17px 17px 17px  "} >
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
              alt="pic"
              borderRadius={"10px 10px 0px 0px "}
            />
            <Box m={"34px 45px 50px 45px"}>
              <Heading
                fontFamily={" Times, serif"}
                fontWeight="100"
                fontSize={"28px"}
                mb="24px"
                color={"#333368"}
              >
                Sign In
              </Heading>
              <Input
                    type={"email"}
                    name="email"
                    placeholder="Enter E-mail"
                    mb="2%"
                    h={"50px"}
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor={"rgb(206, 206, 223)"}
                    onChange={handlechange}
                  />
                  <Input
                    type={"password"}
                    name="password"
                    placeholder="Enter password"
                    h={"50px"}
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor={"rgb(206, 206, 223)"}
                    onChange={handlechange}
                  />
{/* 
              {pass === false ? (
                <Input
                  name="email"
                  placeholder="Mobile/Email"
                  h={"50px"}
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  onChange={handlechange}
                />
              ) : (
                <Box>
                  <Box fontSize={"17px"} color="#66668e">
                    Enter password for
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    fontFamily={" sans-serif"}
                    mb="22px"
                    color={"#000042"}
                  >
                    <Box fontSize="18px">{loginData.email}</Box>
                    <Box
                      fontSize={"14px"}
                      textDecoration="underline"
                      onClick={() => setpass(false)}
                      cursor="pointer"
                    >
                      {" "}
                      Edit
                    </Box>
                  </Flex>
                  <Input
                    type={"password"}
                    name="password"
                    placeholder="Enter password"
                    h={"50px"}
                    fontSize="16px"
                    focusBorderColor="rgb(206, 206, 223)"
                    borderColor={"rgb(206, 206, 223)"}
                    onChange={handlechange}
                  />
                  <Box
                    textDecoration={"underline"}
                    m="15px 0px 0px 0px"
                    color="#000042"
                    fontSize="14px"
                  >
                    Forget Password
                  </Box>
                  {incorrect === true ? (
                    <Required info="Wrong email or password" />
                  ) : (
                    ""
                  )}
                </Box>
              )} */}
              {loginData.email.includes("@gmail.") ? "" : butn}

              <HStack fontSize="16px">
                <Checkbox mb={"20px"} mt="20px" size="lg" >
                  Get Update on whatsapp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack>
              {loginData.email.includes("@gmail.") ? (
                <Button
                  isLoading={loading}
                  onClick={handlesign}
                  bgColor={"#11daac"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  h="50px"
                  fontSize="18px"
                  _hover={{ backgroundColor: "#11daac" }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  bgColor={"#cccccc"}
                  width="100%"
                  borderRadius={"35px/35px"}
                  fontSize="18px"
                  h="50px"
                  _hover={{ backgroundColor: "#cccccc" }}
                >
                  Sign In
                </Button>
              )}

              <HStack spacing={"0px"} mt="19px">
                <Box fontSize={"14px"}> New member?</Box>
                <Link
                  fontSize={"15px"}
                  fontWeight="500"
                  textDecoration={"underline"}
                >
                  Create an Account
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;