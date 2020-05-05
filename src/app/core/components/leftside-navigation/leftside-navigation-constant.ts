import { HomeJcpThreeComponent } from '../../../home-jcp-three/home-jcp-three.component';
import { MyReportsComponent } from '../../../modules/reports/my-reports/my-reports.component';

const MODULE_LIST_CONFIG_VENDOR = [
    {
        name: 'Node',
        link: 'Node',
        icon: 'fas fa-home',
        level: 6,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_RAN_DL = [
    {
        name: 'Discrepancy Library',
        link: 'DiscrepancyLibrary',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];


const MODULE_LIST_CONFIG_LSMR_DOMAIN = [
    {
        name: 'Vendor',
        link: 'Vendor',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_VENDOR
    }
];

const MODULE_LIST_RAN = [
    {
        name: 'Query',
        link: 'Query',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_RAN_DL
    }
];
const MODULE_LIST_CORE = [
    {
        name: 'Compare',
        link: 'Compare',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Discrepancy',
        link: 'Discrepancy',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Query',
        link: 'Query',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_CONFIG_LSMR = [
    {
        name: 'Domain',
        link: 'Domain',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR_DOMAIN
    }
];

const MODULE_LIST_AUDIT = [
    {
        name: 'RAN',
        link: 'RAN',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_RAN
    },
    {
        name: 'Core',
        link: 'Core',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CORE
    }
];

const MODULE_LIST_CONFIG = [
    {
        name: 'LSMR Rehoming',
        link: 'LSMRRehoming',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Trial Management',
        link: 'TrialManagement',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    }
];

const MODULE_LIST_CONFIGURATION = [
    {
        name: 'Planned Event Calendar',
        link: 'PlannedEventCalendar',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Config Change',
        link: 'ConfigChange',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG
    },
    {
        name: 'Audit and Query',
        link: 'AuditandQuery',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_AUDIT
    }
];

const SITES_LIST = [
    {
         
        name: "Macro",
        icon: "fas fa-user fa-3",
        link: "macro",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
      },
      {
       
        name: "Nominal",
        icon: "fas fa-user fa-3",
        link: "nominal",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
      },
      {
       
        name: "On-Air",
        icon: "fas fa-user fa-3",
        link: "onair",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
      }
]

const MODULES_LIST = [
    {
        name: 'Configuration Management',
        link: 'ConfigurationManagement',
        icon: 'fas fa-home',
        level: 1,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIGURATION
    },
    {
        name: 'Analytics',
        link: 'analytics',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'Fault Management',
        link: 'faultmanagement',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    }
];

const LAYERS_LIST = [
    {
     
        name: "Sites",
        icon: "fas fa-users fa-3",
        link: "layers",
        level: 1,
        component: HomeJcpThreeComponent,
        children: SITES_LIST
    }
];

const REPORTS_LIST = [
    {
        name: 'Report Wizard',
        link: 'reportWizard',
        icon: 'fas fa-home',
        level: 1,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'My Reports',
        link: 'My Reports',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'KPI Builder',
        link: 'kpibuilder',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    }
];

export const LEFTSIDE_MENU_LIST = [
    {
        name: 'Home',
        link: 'Home',
        icon: 'ic ic-home-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: []
    }, 
    {
        name: 'Modules',
        link: 'Modules',
        icon: 'ic ic-modules-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: MODULES_LIST
    }, 
    {
        name: 'Reports & Dashboards',
        link: 'Reports & Dashboard',
        icon: 'ic ic-reports',
        level: 0,
        component: HomeJcpThreeComponent,
        children: REPORTS_LIST
    },
    {
        name: 'Work Orders',
        link: 'workorders',
        icon: 'ic ic-work_Order-01',
        level: 0,
        component: MyReportsComponent,
        children: []
    },
    {
        name: 'Administration',
        link: 'administration',
        icon: 'ic ic-administration-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'My JCP',
        link: 'myJCP',
        icon: 'ic ic-my_jcp-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Layers',
        link: 'Layers',
        icon: 'ic ic-layers-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: LAYERS_LIST
    }
];