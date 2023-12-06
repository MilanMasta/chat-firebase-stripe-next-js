"use client"
import { subscriptionRef } from '@/lib/converters/Subscription';
import { useSubscriptionStore } from '@/store/store';
import { onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react'

function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user?.id),
      (snapshot) => {
        if (snapshot.empty) {
          setSubscription(null);
        } else {
          setSubscription(snapshot.docs[0].data());
        }
      }, (err) => {
        console.log(err);
      }
    );
  }, [session, setSubscription]);

  return (
    <>{children}</>
  )
}

export default SubscriptionProvider