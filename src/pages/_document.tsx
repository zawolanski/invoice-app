import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-bg text-typography dark:bg-bg-dark dark:text-typography-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
