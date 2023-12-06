
import LogoImage from '@logos/black.svg'
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from './ui/aspect-ratio'

const Logo = () => {
  return (
    <Link href="/" prefetch={false} className='pverflow-hidden'>
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className='flex item-center justify-center'
        >
          <Image
            priority
            src={LogoImage}
            alt='Logo'
            height={20}
            className="dark:filter dark:invert"
          />
        </AspectRatio>
      </div>
    </Link>
  )
}

export default Logo
