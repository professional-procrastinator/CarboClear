import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';

import axios from '../utils/axios.js';
import TasksCard from '@/modules/cards/tasks/index.js';
import Layout from '@/components/Layout/index.js';

export default function Home() {
  return <Layout>hi</Layout>;
}
