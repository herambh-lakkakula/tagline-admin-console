/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.novel-logiks.com/product/material-dashboard-react
* Copyright 2021 Sunil Lakkakula(https://www.novel-logiks.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Sunil Lakkakula

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ListIcon from "@material-ui/icons/List";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PieChartIcon from "@material-ui/icons/PieChart";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
// import UserListScreen from "views/UserListScreen/UserListScreen.js";
import AdminUsersListPage from "views/AdminUsersListPage/AdminUsersListPage";
import CategoryListScreen from "views/CategoryListScreen";
import SubCategoryListScreen from "views/SubCategoryListScreen";
import ProductListScreen from "views/ProductListScreen";
import BulkListScreen from "views/BulkListScreen";
import DomesticListScreen from "views/DomesticListScreen";
import OrderListScreen from "views/OrderListScreen";
import OrderScreen from "views/OrderScreen";
import Signin from "views/Signin";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Login",
    icon: ViewModuleIcon,
    component: Signin,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: PeopleAltIcon,
    component: AdminUsersListPage,
    layout: "/admin",
  },
  
  {
    path: "/category",
    name: "Category",
    icon: ViewModuleIcon,
    component: CategoryListScreen,
    layout: "/admin",
  },
  {
    path: "/subcategory",
    name: "Sub-Category",
    icon: ViewModuleIcon,
    component: SubCategoryListScreen,
    layout: "/admin",
  },
  {
    path: "/poduct",
    name: "Product",
    icon: ViewModuleIcon,
    component: ProductListScreen,
    layout: "/admin",
  },
 
  {
    path: "/orders",
    name: "Orders",
    icon: ListIcon,
    component: OrderListScreen,
    layout: "/admin",
  },
  
  {
    path: "/reports",
    name: "Reports",
    icon: AssessmentIcon,
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: PieChartIcon,
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
