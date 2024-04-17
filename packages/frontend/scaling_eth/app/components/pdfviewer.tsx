import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';


const lokiInfo = `
Loki, Marvel Evreni'nde tanınan bir karakterdir. Tanrı Odin'in oğlu ve Thor'un kardeşidir. Genellikle yalanlar ve hilelerle tanınır. İskandinav mitolojisinde Loki, tanrı Odin'in kan kardeşidir ve daha çok hilebaz ve entrikacı olarak tasvir edilir. Marvel Sinematik Evreni'nde, Loki'yi Tom Hiddleston canlandırmaktadır.

Loki'nin çeşitli güçleri ve yetenekleri vardır. Dönüşüm yeteneğiyle formunu değiştirebilir, telepati ve telekinezi gibi psionik güçlere sahiptir. Ayrıca, büyü yapma yeteneği ve son derece zeki olması da dikkat çekicidir. Ancak, karakterinin en belirgin özelliği belirsizlik ve karmaşıklıktır. Bazı zamanlarda kahraman olarak, bazı zamanlarda ise kötü niyetli bir düşman olarak karşımıza çıkar.

Loki'nin Marvel Sinematik Evreni'ndeki popülerliği, onun kendi televizyon dizisi olan "Loki"nin yapılmasına neden oldu. Bu dizi, Loki'nin maceralarını ve çeşitli zaman çizgilerinde yaşadığı olayları konu almaktadır.
`;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  container: {
    padding: 40,
    paddingTop: 20
  },
  lokiInfoText: {
    fontSize: 12,
    textAlign: 'justify'
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.lokiInfoText}>{lokiInfo}</Text>
      </View>
    </Page>
  </Document>
);


export default MyDocument;
