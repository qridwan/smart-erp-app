import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LoginImage from "../Assets/Images/loginPic.png";

import { auth } from '../firebase';

const Login = () => {
  const [show, setShow] = useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{
    console.log(data);

    auth.signInWithEmailAndPassword(data.email, data.password).catch(error => {
      alert("Error signing in with password and email!");
    });

  };
  return (
    <Container>
      <Row className="w-100 m-0">
        <Col md={6} sm={12} className="p-0">
          <Image src={LoginImage} alt="Login Image" />
        </Col>
        <Col
          md={6}
          sm={12}
          className="py-3 m-0 d-flex justify-content-center align-items-center"
        >
          {show === "login" ? (
            <LoginContainer>
              <GreetingText>Welcome Back</GreetingText>
              <HeadingText>Login to your account</HeadingText>
              <LoginForm>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <Error>Email is required</Error>
                  )}
                  <Label>Password</Label>
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <Error>Password is not valid</Error>}

                  <div className="d-flex justify-content-between">
                    <span>
                      <Label style={{cursor: 'pointer'}}>
                        <input
                          type="checkbox"
                          {...register("toggle")}
                          className="mx-2"
                        />
                        Remember Me
                      </Label>
                    </span>
                    <Label
                      style={{
                        color: "#2C5282",
                        cursor: "pointer",
                      }}
                      onClick={() => setShow("forgotPassword")}
                    >
                      Forget Password?
                    </Label>
                  </div>

                  <SubmitButton type="submit" value="Login Now" />
                </form>
              </LoginForm>
            </LoginContainer>
          ) : (
            <LoginContainer>
              <HeadingText>Reset Password</HeadingText>
              <form>
                <Label>Your Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <Error>Email is required</Error>
                )}
                <SubmitButton type="submit" value="Reset" />
                <Label
                  style={{
                    color: "#2C5282",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setShow("login")}
                >
                  Go to login page
                </Label>
              </form>
            </LoginContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

export const Container = styled.div`
  min-height: 100vh;
  background: #e5e5e5;
`;

export const Image = styled.img`
  max-height: 100vh;
  width: 100%;
  margin: 0;
`;

const LoginContainer = styled.div``;
const GreetingText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  line-height: 24px;
  color: #2d3748;
`;
const HeadingText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 42px;
  color: #1a202c;
  @media only screen and (max-width: 1000px) {
    font-size: 22px;
    line-height: 32px;
  }
`;
const LoginForm = styled.div``;
export const Input = styled.input`
  border: 1px solid rgba(45, 56, 80, 0.7);
  box-sizing: border-box;
  border-radius: 5px;
  display: block;
  width: 350px;
  height: 50px;
  padding: 0 20px;
  color: #2d3748;
  font-size: 14px;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;
export const SubmitButton = styled(Input)`
  background: #0075ff;
  font-weight: 500;
  font-size: 16px;
  margin-top: 25px;
  line-height: 24px;
  border: none;
  color: #ffffff;
`;
const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin: 10px 0;
  color: #4a5568;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
    line-height: 16px;
    margin: 8px 0;
  }
`;
const Error = styled.p`
  font-size: 12px;
  color: red;
`;
