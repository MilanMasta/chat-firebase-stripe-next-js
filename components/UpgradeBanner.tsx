"use client";

import { useSubscriptionStore } from '@/store/store';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const UpgradeBanner = () => {
    const subsctiption = useSubscriptionStore((state) => state.subscription);
    const isPro = subsctiption?.role === 'pro';
    const router = useRouter();
    
    if (isPro) return null;

    return (
        <Button
            onClick={() => router.push('/register')}
            className='w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-center text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all'>
            Upgrade to Pro to unlock all features
        </Button>
    );
};

export default UpgradeBanner;
