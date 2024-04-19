import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  container: {
    padding: 40,
    paddingTop: 20,
  },
  lokiInfoText: {
    fontSize: 12,
    textAlign: "justify",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: "center",
  },
});

const MyDocument = ({ ipfsData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text>Name: {ipfsData && ipfsData.name}</Text>
          <Text>Description: {ipfsData && ipfsData.description}</Text>
          {/* Dosya türüne göre, uygun bileşeni kullanabiliriz */}
          {ipfsData && ipfsData.file && ipfsData.file.type === "image" ? (
            <Image style={styles.image} src={ipfsData.file.url} />
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;

