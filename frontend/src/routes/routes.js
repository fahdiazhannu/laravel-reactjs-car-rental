import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import AddMobil from '../components/admin/mobil/AddMobil'
import ViewMobil from '../components/admin/mobil/ViewMobil'
import EditMobil from '../components/admin/mobil/EditMobil'
import ListSewa from '../components/admin/order/ListSewa'

const routes = [
{ path: '/admin', exact: true, name: 'Admin' },
{ path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
{ path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
{ path: '/admin/add-category', exact: true, name: 'Category', component: Category },
{ path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
{ path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory },
{ path: '/admin/add-mobil', exact: true, name: 'AddMobil', component: AddMobil },
{ path: '/admin/view-mobil', exact: true, name: 'ViewMobil', component: ViewMobil },
{ path: '/admin/edit-mobil/:id', exact: true, name: 'EditMobil', component: EditMobil },
{ path: '/admin/orders', exact: true, name: 'ListSewa', component: ListSewa },
];

export default routes;