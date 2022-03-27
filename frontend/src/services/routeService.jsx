import { AiOutlineHome as HomeIcon } from 'react-icons/ai';
import { MdDevicesOther as ProductsIcon } from 'react-icons/md';
import { MdOutlineCloud as ServicesIcon } from 'react-icons/md';
import { BiBook as KnowledgeBaseIcon } from 'react-icons/bi';
import { MdOutlineForum as ForumIcon } from 'react-icons/md';
import { BiBuoy as SupportIcon } from 'react-icons/bi';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import ServicesPage from '../pages/ServicesPage';
import KnowledgeBasePage from '../pages/KnowledgeBasePage';
import ForumPage from '../pages/ForumPage';
import SupportPage from '../pages/SupportPage';

import { idServiceGetNewId } from './idService';

export const APP_ROUTES = [
  {
    id: idServiceGetNewId(),
    path: '/',
    description: 'Home',
    icon: <HomeIcon />,
    component: <HomePage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/products',
    description: 'Products',
    icon: <ProductsIcon />,
    component: <ProductsPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/products/:id',
    description: 'Product',
    icon: null,
    component: <ProductPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/services',
    description: 'Services',
    icon: <ServicesIcon />,
    component: <ServicesPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/kb',
    description: 'Knowledge Base',
    icon: <KnowledgeBaseIcon />,
    component: <KnowledgeBasePage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/forum',
    description: 'Forum',
    icon: <ForumIcon />,
    component: <ForumPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/support',
    description: 'Support',
    icon: <SupportIcon />,
    component: <SupportPage />,
  },
];
