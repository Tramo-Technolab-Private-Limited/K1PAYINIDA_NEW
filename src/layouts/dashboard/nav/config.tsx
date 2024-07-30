// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const NavConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "My Stats",
    items: [
      {
        title: "Home",
        path: PATH_DASHBOARD.mystats,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Dashboard",
    items: [
      {
        title: "Services",
        path: PATH_DASHBOARD.service.root,
        icon: ICONS.user,
        roles: ["agent"],
        children: [
          {
            title: "Recharge",
            path: PATH_DASHBOARD.service.recharge,
            roles: ["agent"],
          },
          {
            title: "Money Transfer",
            path: PATH_DASHBOARD.service.dmt,
            roles: ["agent"],
          },

          {
            title: "Transfer",
            path: PATH_DASHBOARD.service.transfer,
            roles: ["agent"],
          },
          {
            title: "DMT1",
            path: PATH_DASHBOARD.service.dmt1,
            roles: ["agent"],
          },
          // {
          //   title: "DMT2",
          //   path: PATH_DASHBOARD.service.dmt2,
          //   roles: ["agent"],
          // },
          {
            title: "AEPS",
            path: PATH_DASHBOARD.service.aeps,
            roles: ["agent"],
          },
          {
            title: "Bill Payment",
            path: PATH_DASHBOARD.service.billpayment,
            roles: ["agent"],
          },
          {
            title: "Aadhaar Pay",
            path: PATH_DASHBOARD.service.aadhaarpay,
            roles: ["agent"],
          },
          {
            title: "Payments",
            path: PATH_DASHBOARD.service.payments,
            roles: ["agent"],
          },
        ],
      },
      {
        title: "Network",
        path: PATH_DASHBOARD.network,
        roles: ["distributor", "m_distributor"],
        icon: ICONS.ecommerce,
      },
      {
        title: "Transactions",
        path: PATH_DASHBOARD.transaction.root,
        icon: ICONS.user,
        children: [
          {
            roles: ["agent"],
            title: "My Transactions",
            path: PATH_DASHBOARD.transaction.mytransaction,
          },
          {
            title: "Transactions",
            path: PATH_DASHBOARD.transaction.mytransaction,
            roles: ["distributor", "m_distributor"],
          },
          {
            title: "Fund Flow",
            path: PATH_DASHBOARD.transaction.fundflow,
          },
          {
            title: "Account Statement",
            path: PATH_DASHBOARD.transaction.walletladger,
          },
          {
            title: "Download Reports",
            path: PATH_DASHBOARD.transaction.historicalreports,
          },
          {
            title: " Summary Reports",
            roles: ["distributor", "m_distributor"],
            path: PATH_DASHBOARD.transaction.summaryreports,
          },
        ],
      },
      {
        title: "Schemes",
        path: PATH_DASHBOARD.scheme.root,
        icon: ICONS.user,
        children: [
          {
            title: "All Scheme",
            path: PATH_DASHBOARD.scheme.allscheme,
          },
          {
            title: "BBPS Scheme",
            path: PATH_DASHBOARD.scheme.bbpsscheme,
          },
          // {
          //   title: "Loan Scheme",
          //   path: PATH_DASHBOARD.scheme.loanscheme,
          // },
        ],
      },
      {
        title: "Fund Management",
        path: PATH_DASHBOARD.fundmanagement.root,
        icon: ICONS.user,
        children: [
          {
            title: "My Fund Deposits",
            path: PATH_DASHBOARD.fundmanagement.myfunddeposits,
          },
          {
            title: "AEPS settlement",
            roles: ["agent"],
            path: PATH_DASHBOARD.fundmanagement.aepssettlement,
          },
          {
            title: "Bank Accounts",
            path: PATH_DASHBOARD.fundmanagement.mybankaccount,
          },
          {
            title: "Manage Fund Flow",
            roles: ["distributor", "m_distributor"],

            path: PATH_DASHBOARD.fundmanagement.managefundflow,
          },
          {
            title: "My Fund Requests",
            path: PATH_DASHBOARD.fundmanagement.myfundrequest,
          },
          {
            title: "Wallet to Wallet Transfer",
            path: PATH_DASHBOARD.fundmanagement.Wallettowallet,
          },
        ],
      },
      {
        title: "Setting",
        path: PATH_DASHBOARD.setting,
        icon: ICONS.ecommerce,
      },
      {
        title: "Help & Support",
        path: PATH_DASHBOARD.helpsupport,
        icon: ICONS.ecommerce,
      },
    ],
  },
];

export default NavConfig;
