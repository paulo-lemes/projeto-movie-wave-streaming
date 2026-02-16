import { Login } from '@/components/Login';
import { LoginButtonV4 } from '@/components/LoginButtonV4';

interface Props {
  searchParams: { v4: boolean | undefined };
}

export default async function Page({ searchParams }: Props) {
  const v4Login = await searchParams.v4;
  return (
    <Login>
      <LoginButtonV4 v4={v4Login} />
    </Login>
  );
}
