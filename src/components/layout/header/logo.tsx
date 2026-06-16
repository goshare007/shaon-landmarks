import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import logoSrc from '@/assets/logo.png';

export default function Logo() {
  return (
    <Link to='/' className='flex-none'>
      <div className='flex items-center gap-2.5'>
        <Image
          src={logoSrc}
          alt='Shaon Landmarks & Housing'
          layout='constrained'
          width={144}
          height={36}
          className='h-6 w-auto md:h-8 mb-2 md:mb-3'
        />
        <span className=' tracking-wide uppercase font-extrabold text-black md:text-xl leading-none'>
          Shaon Landmarks
        </span>
      </div>
    </Link>
  );
}
