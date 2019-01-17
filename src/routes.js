import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Poster from './views/Resources/Potser.vue'
import goodList from './views/Resources/GoodsList.vue'
import curriculumList from './views/Resources/Curriculum.vue'
import user from './views/Resources/GoodsClassify.vue'
import Page4 from './views/order/Page4.vue'
import Page5 from './views/order/Page5.vue'
import User from './views/nav3/User.vue'
import videoList from './views/Resources/videoList'
import echarts from './views/charts/echarts.vue'
import assemble from './views/activity/Assemble'
import bargain from './views/activity/Bargain'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '资源管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '海报管理', hidden: true },
            { path: '/poster', component: Poster, name: '海报管理' },
            { path: '/user', component: user, name: '商品分类' },
            { path: '/good/list', component: goodList, name: '商品管理' },
            { path: '/curriculum/list', component: curriculumList, name: '课程管理' },
            { path: '/video/list', component: videoList, name: '教程视频' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/userList', component: User, name: '用户列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据分析',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '活动管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/bargain', component: bargain, name: '砍价管理' },
            { path: '/assemble', component: assemble, name: '拼团管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;