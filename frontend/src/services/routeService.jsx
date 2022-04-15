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
import ServicePage from '../pages/ServicePage';
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
    description: 'Produtos',
    icon: <ProductsIcon />,
    component: <ProductsPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/products/:id',
    description: 'Produto',
    icon: null,
    component: <ProductPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/services',
    description: 'Serviços',
    icon: <ServicesIcon />,
    component: <ServicesPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/services/:id',
    description: 'Serviço',
    icon: null,
    component: <ServicePage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/kb',
    description: 'Base de Conhecimento',
    icon: <KnowledgeBaseIcon />,
    component: <KnowledgeBasePage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/forum',
    description: 'Fórum',
    icon: <ForumIcon />,
    component: <ForumPage />,
  },
  {
    id: idServiceGetNewId(),
    path: '/support',
    description: 'Suporte',
    icon: <SupportIcon />,
    component: <SupportPage />,
  },
];
