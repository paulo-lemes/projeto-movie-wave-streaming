'use client'

import React, { ReactNode } from 'react'
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Modal } from '@/components/Modal';

export function DefaultLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
      <Modal />
      <Footer />
    </>
  );
}
