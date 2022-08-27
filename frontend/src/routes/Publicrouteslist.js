import Home from '../components/frontend/Home';
import About from '../components/frontend/About'
import Contact from '../components/frontend/Contact'

import Login from '../components/frontend/auth/Login'
import Daftar from '../components/frontend/auth/Daftar'
import ViewCategory from '../components/frontend/collections/ViewCategory';
import ViewMobil from '../components/frontend/collections/ViewMobil';
// import Search from '../components/frontend/collections/Search';
import MobilDetail from '../components/frontend/collections/MobilDetail';
import ListSewa from '../components/frontend/ListSewa';
import Checkout from '../components/frontend/Checkout';
import Ahp from '../components/frontend/ahp/ahp';
import Main from '../components/frontend/ahp/Main';
import Page from '../components/frontend/ahp/Page';
import PageResult from '../components/frontend/ahp/PageResult';
import HistoryOrder from '../components/frontend/History';
import MobilHarga from '../components/frontend/collections/MobilHarga';
import MobilFitur from '../components/frontend/collections/MobilFitur';
import MobilBbm from '../components/frontend/collections/MobilBbm';
import MobilKapasitas from '../components/frontend/collections/MobilKapasitas';
import Kriteria from '../components/frontend/collections/Kriteria';
import Invoice from '../components/frontend/Invoice';
import DetailRiwayat from '../components/frontend/DetailRiwayat';


const publicRoutesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/tentang', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/register', exact: true, name: 'Register', component: Daftar },
    { path: '/sewa-mobil', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/mobil/:slug', exact: true, name: 'ViewMobil', component: ViewMobil },
    { path: '/mobil/:category/:mobil', exact: true, name: 'MobilDetail', component: MobilDetail },
    { path: '/detail-sewa', exact: true, name: 'ListSewa', component: ListSewa },
    { path: '/checkout', exact: true, name: 'Checkout', component: Checkout },
    { path: '/ahp', exact: true, name: 'Ahp', component: Ahp },
    { path: '/main', exact: true, name: 'Main', component: Main },
    { path: '/page', exact: true, name: 'Page', component: Page },
    { path: '/pageresult', exact: true, name: 'PageResult', component: PageResult },



    { path: '/riwayat-transaksi', exact: true, name: 'HistoryOrder', component: HistoryOrder },
    { path: '/view-order/:id', exact: true, name: 'DetailRiwayat', component: DetailRiwayat },
    { path: '/kriteria-harga', exact: true, name: 'MobilHarga', component: MobilHarga },
    { path: '/kriteria-fitur', exact: true, name: 'MobilFitur', component: MobilFitur },
    { path: '/kriteria-kapasitas', exact: true, name: 'MobilKapasitas', component: MobilKapasitas },
    { path: '/kriteria-bbm', exact: true, name: 'MobilBbm', component: MobilBbm },
    { path: '/kriteria', exact: true, name: 'Kriteria', component: Kriteria },

    { path: '/invoice', exact: true, name: 'Invoice', component: Invoice },

];



export default publicRoutesList;