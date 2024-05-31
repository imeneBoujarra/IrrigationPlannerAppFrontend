import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'farmer',
    iconName: 'user',
    route: '/admin/farmer',
  },



  {
    displayName: 'Secteurs',
    iconName: 'arrow-autofit-width',
    route: '/admin/sector',
  },

  {
    displayName: 'Planifications irrigations',
    iconName: 'bucket-droplet',
    route: '/admin/planification',
  },


  {
    displayName: 'Produits',
    iconName: 'vaccine-bottle',
    route: '/admin/product',
  },

  {
    displayName: 'Treatments',
    iconName: 'shield-check',
    route: '/admin/treatment',
  },
  {
    displayName: 'tache',
    iconName: 'brand-asana',
    route: '/admin/tache',
  },

  {
    displayName: 'entrés/sorties',
    iconName: 'report-money',
    route: '/admin/entre',
  },
  {
    displayName: 'depense',
    iconName: 'moneybag',
    route: '/admin/depense',
  },
  {
    displayName: 'cueillette',
    iconName: 'moneybag',
    route: '/admin/cueillette',
  },
  {
    displayName: 'vente',
    iconName: 'coins',
    route: '/admin/vente',
  },
  {
    displayName: 'ouvrier',
    iconName: 'users-group',
    route: '/admin/personel',
  },


];
