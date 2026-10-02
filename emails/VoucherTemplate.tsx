// import { Body, Container, Head, Heading, Hr, Html, Preview, Row, Section, Text } from "@react-email/components";
// import * as React from "react";

// interface VoucherEmailProps {
//   clienteNombre?: string;
//   monto?: string;
//   servicioContratado?: string;
// }

// export const VoucherTemplate = ({
//   clienteNombre = "Juan Pérez",
//   monto = "150.00",
//   servicioContratado = "Traslado Tumbes -> Mancora",
// }: VoucherEmailProps) => (
//   <Html>
//     <Head />
//     <Preview>Tu comprobante de pago de {servicioContratado}</Preview>
//     <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc", padding: "20px" }}>
//       <Container style={{ backgroundColor: "#ffffff", border: "1px solid #e4e7eb", borderRadius: "8px", padding: "40px", maxWidth: "560px", margin: "0 auto" }}>
//         <Heading style={{ color: "#00D1B2", fontSize: "24px", textAlign: "center", marginBottom: "30px" }}>
//           ¡Pago Exitoso!
//         </Heading>
//         <Text style={{ fontSize: "16px", color: "#333" }}>Hola <strong>{clienteNombre}</strong>,</Text>
//         <Text style={{ fontSize: "16px", color: "#555" }}>Tu pago ha sido procesado correctamente. Aquí tienes el resumen de tu compra:</Text>
        
//         <Section style={{ backgroundColor: "#f9fafb", padding: "20px", borderRadius: "6px", margin: "20px 0" }}>
//           <Row style={{ marginBottom: "10px" }}>
//             <Text style={{ margin: 0, fontSize: "14px" }}><strong>Servicio:</strong> {servicioContratado}</Text>
//           </Row>
//           <Row style={{ marginBottom: "10px" }}>
//             <Text style={{ margin: 0, fontSize: "14px" }}><strong>Total Pagado:</strong> S/ {monto}</Text>
//           </Row>
//           <Row>
//             <Text style={{ margin: 0, fontSize: "14px" }}><strong>Método:</strong> Tarjeta en línea</Text>
//           </Row>
//         </Section>
        
//         <Hr style={{ borderColor: "#e4e7eb", margin: "20px 0" }} />
//         <Text style={{ fontSize: "12px", color: "#888", textAlign: "center" }}>
//           Adjunto encontrarás el documento de Términos y Condiciones personalizado.
//         </Text>
//       </Container>
//     </Body>
//   </Html>
// );

// export default VoucherTemplate;

// import { PDFDocument, StandardFonts } from 'pdf-lib';
// import fs from 'fs';

// async function addFormFields() {
//   // Cargar el PDF existente
//   const existingPdfBytes = fs.readFileSync('public/reporteec_ficharuc.pdf');
//   const pdfDoc = await PDFDocument.load(existingPdfBytes);

//   // Crear formulario
//   const form = pdfDoc.getForm();

//   // Añadir campo de texto editable con un ID
//   const page = pdfDoc.getPages()[0];
//   const textField = form.createTextField('campo_nombre'); // ID del campo
//   textField.setText(''); // valor inicial vacío
//   textField.addToPage(page, { x: 358, y: 646, width: 190, height: 15 });

//   // Otro campo
//   const textField2 = form.createTextField('campo_direccion');
//   textField2.addToPage(page, { x: 358, y: 633, width: 190, height: 15 });

//   const textField3 = form.createTextField('campo_monto');
//   textField3.addToPage(page, { x: 358, y: 620, width: 190, height: 15 });

//   // Guardar PDF con campos editables
//   const pdfBytes = await pdfDoc.save();
//   fs.writeFileSync('reporteec_ficharuc_editable.pdf', pdfBytes);
// }

// addFormFields();