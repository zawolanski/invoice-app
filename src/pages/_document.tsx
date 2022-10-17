import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head />
      <body className="bg-bg text-typography-dark dark:bg-bg-dark dark:text-typography">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
