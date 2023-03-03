import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';

import axios from '../utils/axios.js';

export default function Home() {
  const fun = async () => {
    const res = await axios.post('/auth/register', {
      name: 'bobas bobas',
      email: 'bob@test.com',
      password: 'test123',
      country: 'IN',
      points: 0,
    });
    console.log(res.data);
  };

  fun();
  return 'hi';
}
