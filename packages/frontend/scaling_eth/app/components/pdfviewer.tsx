import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffdab5", // PeachPuff
    padding: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 220,
    marginBottom: 20,
  },
  pdfLink: {
    color: "blue",
    textDecoration: "underline",
    textAlign: "center",
    marginTop: 10,
  },
});

const MyDocument = ({ ipfsData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>Product Information</Text>
          <Text style={styles.text}>Name: {ipfsData ? ipfsData.name : ""}</Text>
          <Text style={styles.text}>Description: {ipfsData ? ipfsData.description : ""}</Text>
          
          {ipfsData && ipfsData.file && ipfsData.file.type === "image" ? (
            <Image style={styles.image} src={ipfsData.file.url} />
          ) : ipfsData && ipfsData.file && ipfsData.file.type === "pdf" ? (
            <embed src={ipfsData.file.url} width="500" height="375" type="application/pdf" />
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;


