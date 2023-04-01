import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export const requireAuth = async (context: GetServerSidePropsContext, cb: (context: Session | null) => unknown) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        pernament: false,
      },
    };
  }

  return cb(session);
};
