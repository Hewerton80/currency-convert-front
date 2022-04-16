import {
  VscOrganization,
  VscPerson,
  VscBook,
  VscGroupByRefType,
  VscTag,
  VscHome,
} from 'react-icons/vsc'

export enum RouteEnum {
  Home = '/',
  Adms = '/users',
  CreateUser = '/users/create',
  Customers = '/customers',
  Posts = '/posts',
  CreatPosts = '/posts/create',
  Categories = '/categories',
  CreateCategories = '/categories/create',
  Tags = '/tags',
}

interface IMenu {
  title: string
  url: string
  icon: JSX.Element
}

export const menu: IMenu[] = [
  {
    title: 'Home',
    url: RouteEnum.Home,
    icon: <VscHome className="text-xl" />,
  },
  {
    title: 'Administratores',
    url: RouteEnum.Adms,
    icon: <VscOrganization className="text-xl" />,
  },
  {
    title: 'Assinantes',
    url: RouteEnum.Customers,
    icon: <VscPerson className="text-xl" />,
  },
  {
    title: 'Posts',
    url: RouteEnum.Posts,
    icon: <VscBook className="text-xl" />,
  },
  {
    title: 'Categorias',
    url: RouteEnum.Categories,
    icon: <VscGroupByRefType className="text-xl" />,
  },
  {
    title: 'Tags',
    url: RouteEnum.Tags,
    icon: <VscTag className="text-xl" />,
  },
]
