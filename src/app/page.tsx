import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src="/assets/images/profile.png" alt="profile" />
      </div>
      <div className="flex">
        <p className="text-xl">Make Internet Great Again.</p>
      </div>
    </div>
  );
}
