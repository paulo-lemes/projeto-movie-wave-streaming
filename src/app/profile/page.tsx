import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AccountInfo } from '@/components/AccountInfo';
import { FadeInContent } from '@/components/FadeInContent';
import { ProfileContentSection } from '@/components/ProfileContentSection';

export default async function Profile() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('auth');
  const user = cookieStore.get('userInfo');

  if (!auth || !user) redirect('/login');

  const userInfo = JSON.parse(user.value);

  return (
    <FadeInContent duration={1.5}>
      <AccountInfo user={userInfo} />
      <ProfileContentSection toggle="recommended">Recomendações</ProfileContentSection>
      <ProfileContentSection toggle="watchlist">Lista de interesses</ProfileContentSection>
      <ProfileContentSection toggle="favorite">Favoritos</ProfileContentSection>
      <ProfileContentSection toggle="rated">Avaliações</ProfileContentSection>
    </FadeInContent>
  );
}
