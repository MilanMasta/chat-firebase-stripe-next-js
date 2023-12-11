import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import DarkModeToggle from './DarkModeToggle'
import Logo from './Logo'
import UserButton from './UserButton'
import Link from 'next/link';
import { MessagesSquareIcon } from 'lucide-react';
import CreateChatButton from './CreateChatButton';
import UpgradeBanner from './UpgradeBanner';

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-gray-900'>
      <nav className='flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto'>
        <div className="mr-4">
          <Logo />
        </div>

        <div className='flex-1 flex items-center justify-end space-x-4'>
          {session ? (
            <>
              <Link
                className="flex ml-4 z-50"
                href={'/chat/'} prefetch={false}>
                <MessagesSquareIcon className='text-black dark:text-white' />
              </Link>
              <div className="ml-4 z-50">
                <CreateChatButton />
              </div>
            </>
          ) : (
            <Link
              href={'/pricing'}
              className="flex ml-4 z-50"
            >
              Pricing
            </Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
      <UpgradeBanner />
    </header>
  )
}

export default Header