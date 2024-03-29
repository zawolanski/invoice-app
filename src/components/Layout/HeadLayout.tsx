import Head from 'next/head';

export const HeadLayout = () => {
  return (
    <Head>
      <title>Invoices</title>
      <meta name="description" content="Let's manage your invoices effortlessly!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
