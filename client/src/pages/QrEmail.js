// src/emails/QrEmail.js
import React from "react";
import { Html, Head, Body, Container, Text, Img } from "@react-email/components";
 
const QrEmail = ({ qrCodeUrl }) => (
<Html>
<Head />
<Body style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f9f9f9" }}>
<Container style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#ffffff" }}>
<Text style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
          ¡Tu QR está listo!
</Text>
<Text>
          Escanea el siguiente código QR para acceder a tu evento:
</Text>
<Img src={qrCodeUrl} alt="QR Code" style={{ margin: "20px auto", display: "block", maxWidth: "100%" }} />
<Text>
          Si tienes algún problema, no dudes en contactarnos.
</Text>
</Container>
</Body>
</Html>
);
 
export default QrEmail;