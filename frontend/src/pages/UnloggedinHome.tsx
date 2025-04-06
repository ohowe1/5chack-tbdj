import DefaultLayout from "../components/DefaultLayout";
import {
  Button,
  Link
} from '@heroui/react';

export function UnloggedinHome() {
  return (
    <DefaultLayout>
      <div className='mb-3 flex flex-col h-[80vh] items-center justify-center gap-4'>
      <img src="/bountee.svg" alt="Logo" className="h-20 mb-5" />
          <h1 className='text-3xl'>Welcome to <span className="font-bold italic">Bountee</span></h1>
          <p className='mx-2 mb-4 text-center'>Login with your college email account to get started with Bountee, get connected with fellow students, and complete bounties!</p>
          <Button 
            as={Link} 
            href="/login"
          >Continue to Login</Button>
      </div>
    </DefaultLayout>
  );
}

export default UnloggedinHome;







