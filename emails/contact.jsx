import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const ContactEmail = ({ username, message, email }) => (
  <Html>
    <Head />
    <Preview>You received a message from {username}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi, it's {username},</Text>
        <Text style={paragraph}>{message}</Text>
        <Text style={paragraph}>
          Best,
          <br />
          {username}
        </Text>

        <Hr style={hr} />
        <Text style={paragraph}>{email}</Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
