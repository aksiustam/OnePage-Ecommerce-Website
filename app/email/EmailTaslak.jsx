import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTaslak = (props) => {
  const { text } = props;

  return (
    <Html>
      <Head />
      <Preview>MAY Plastik Bilgilendirme Maili</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              src={
                "https://bicakci.aydtanitim.com/assets/images/bicakcilogo.svg"
              }
              width="385"
              height="90"
              alt="logo"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Merhabalar</Text>
            <div dangerouslySetInnerHTML={{ __html: text }} />

            <Text style={paragraph}>
              Teşekkürler
              <br />
              MAY Plastik
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © CopyRight MAYPlastik <br />
              Tatlıcak Mah. Gürçınar Sokak No:60 Karatay - KONYA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default EmailTaslak;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  textAlign: "center",
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 15,
};
