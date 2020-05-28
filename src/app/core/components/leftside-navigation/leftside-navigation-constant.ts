import { HomeJcpThreeComponent } from '../../../home-jcp-three/home-jcp-three.component';
import { MyReportsComponent } from 'src/app/main-modules/reports-dashboards/my-reports/my-reports.component';
import { LandingHomeComponent } from 'src/app/home-jcp-three/landing-home/landing-home.component';


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
    },
    {
        name: 'Query Builder',
        link: 'querybuilder',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Selective Parameter Live',
        link: 'selective-parameter-live',
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

const ADMIN_CONFIGURATION_SM_RAN_LIST = [
    {
        name: 'Package Details',
        link: 'package-details',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_RET_RAN_LIST = [
    {
        name: 'RET',
        link: 'ret',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_GOLDEN_RAN_LIST = [
    {
        name: 'Golden Parameters',
        link: 'golden-parameters',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_CMRECIPE_RAN_LIST = [
    {
        name: 'CM Recipe',
        link: 'cm-recipe',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_NODE_PARAMETER_RAN_LIST = [
    {
        name: 'New Node Parameter',
        link: 'new-node-parameter',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_TEC_RAN_LIST = [
    {
        name: 'Traceport - TCE/ipv6',
        link: 'traceport-tce',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const NETWORK_EMS_SAMSUNG_LIST = [
    {
        name: 'LSMR',
        link: 'LSMR',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const NETWORK_EMS_AIRSPAN_LIST = [
    {
        name: 'Netspan',
        link: 'Netspan',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_PLANNING_SITE_DEPLOYMENT_ODSC_LIST = [
    {
        name: 'Config Template',
        link: 'config-template',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'ODSC SLA Configuration',
        link: 'odsc-sla-config',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Remarks Template',
        link: 'remarks-template',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
    }
];

// const ADMIN_ANALYTICS_SB_AL_ANALYTICS = [
//     {
//         name: 'Algorithm selection',
//         link: 'algorithm-selection',
//         icon: 'fas fa-home',
//         level: 5,
//         component: HomeJcpThreeComponent,
//         children: []
//     }
// ];

const ADMIN_ANALYTICS_NW_AL_ANALYTICS = [
    {
        name: 'Algorithm selection',
        link: 'algorithm-selection',
        icon: 'fas fa-home',
        level: 5,
        component: HomeJcpThreeComponent,
        children: []
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
    },
    {
        name: 'Compare',
        link: 'Compare',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
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

const PREDICTION_LAYERS_PLANNED_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DLThroughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Best Server Plot',
        link: 'Best Server Plot',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_NETWORK_QUALITY = [
    {
        name: 'Infill Planning',
        link: 'Infill-Planning',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_NETWORK_ANOMALIES = [
    {
        name: 'Mis-aligned Sectors',
        link: 'Mis-aligned-Sectors',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Overshooting Cells',
        link: 'Overshooting-Cells',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_NETWORK_COVERAGE = [
    {
        name: 'Coverage Holes',
        link: 'Coverage-Holes',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Indoor Coverage Holes',
        link: 'Indoor-Coverage-Holes',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_NETWORK_POI = [
    {
        name: 'Building',
        link: 'Building',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PREDICTION_LAYERS_ONAIR_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Best Server Plot',
        link: 'Best Server Plot',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MEASURED_LAYERS_MB_NETVELOCITY_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Latency',
        link: 'latency',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'UL Throughput',
        link: 'ul-throughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'dl-throughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MEASURED_LAYERS_BAND_LSR_LIST = [
    {
        name: 'VoLTE Drops',
        link: 'VoLTE-Drops',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DL-Throughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Sessions',
        link: 'Sessions',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'RSRP',
        link: 'RSRP',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'CQI',
        link: 'CQI',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_ADT_LIST = [
    {
        name: 'RSRP',
        link: 'RSRP',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'SINR',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DL-Throughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'UL Throughput',
        link: 'UL-Throughput',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'RSRQ',
        link: 'RSRQ',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'CQI',
        link: 'CQI',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DL RB Utilization',
        link: 'DL RB Utilization',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'UL RB Utilization',
        link: 'UL RB Utilization',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },{
        name: 'Rank Indicator',
        link: 'Rank Indicator',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_JP_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Call Muting',
        link: 'Call-Muting',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Call Drop',
        link: 'Call-Drop',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Coverage Experience',
        link: 'Coverage-Experience',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const HYBRID_LAYERS_BAND_KPI_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const HYBRID_LAYERS_BAND_SNG_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const HYBRID_LAYERS_BAND_CMC_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Unique Users',
        link: 'Unique-Users',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Data Volume',
        link: 'Data-Volume',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PERFORMANCE_KPI =[
    {
        name: 'Software Versions',
        link: 'software-versions',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Counter Categories',
        link: 'counter-categories',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_WORKORDERS_ANALYTICS_LIST = [
    {
        name: 'RF OC Workorders',
        link: 'RF OC Workorders',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_POI_JIP_LIST = [
    {
        name: 'NE Data',
        link: 'ne-data',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_CONFIGURATION_SM_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_SM_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_RET_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_RET_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_GOLDEN_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_GOLDEN_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_CMRECIPE_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_CMRECIPE_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_NODE_PARAMETER_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_NODE_PARAMETER_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_TCE_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_TEC_RAN_LIST
    }
];

const PERFORMANCE_IMPACT = [
    {
        name: 'KPI Settings',
        link: 'kpi-settings',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Algorithm Settings',
        link: 'algorithm settings',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_VENDOR = [
    {
        name: 'Vendor',
        link: 'Vendor',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_NETWORK_EMS_LIST = [
    {
        name: 'Samsung',
        link: 'Samsung',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: NETWORK_EMS_SAMSUNG_LIST
    },
    {
        name: 'Airspan',
        link: 'Airspan',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: NETWORK_EMS_AIRSPAN_LIST
    }
];

const LOCATION_BOUNDRIES_POI_LIST_JIO = [
    {
        name: 'JIP',
        link: 'JIP',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'JIEM',
        link: 'JIEM',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_PLANNING_SITE_DEPLOYMENT_LIST = [
    {
        name: 'Site SLA Configuration',
        link: 'site-sla-configuration',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'P2B Admin',
        link: 'p2b-admin',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'ODSC',
        link: 'odsc',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_PLANNING_SITE_DEPLOYMENT_ODSC_LIST
    }
];

const ADMIN_PLANNING_TAC_MODULE_LIST = [
    {
        name: 'MME Pool Architecture',
        link: 'mme-module-architecture',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'TAC Module Admin Panel',
        link: 'tac-module-admin-panel',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_ANALYTICS_SUBSCRIBER_ANALYTICS = [
    {
        name: 'CENA',
        link: 'cena',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Algorithms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    }
];

const ADMIN_ANALYTICS_NETWORK_ANALYTICS = [
    {
        name: 'Algorithms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    }
];

const ADMIN_FAULT_CORRELATION_LIST = [
    {
        name: 'Self Correlation',
        link: 'Self-Correlation',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Alarm Block',
        link: 'Alarm-Block',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Impact Settings',
        link: 'Impact-Settings',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Dampening Time',
        link: 'Dampening-Time',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Count Based Mask',
        link: 'Count-Based-Mask',
        icon: 'fas fa-home',
        level: 4,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
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

const MODULE_LIST_CHANGE_IMPACT = [
    {
        name: 'RAN',
        link: 'RAN',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_VENDOR
    }
];

const SITES_OUTDOOR_lIST = [
    {
        name: 'Macro',
        link: 'Macro',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'ESC',
        link: 'ESC',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Small Cell',
        link: 'Small-Cell',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Wi-Fi',
        link: 'Wi-Fi',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Competitor',
        link: 'Competitor',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_SUBSCRIBER_LIST = [
    {
        name: 'Anomalies',
        link: 'Anomalies',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Coverage',
        link: 'Coverage',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Quality & Experience',
        link: 'Quality-Experience',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_ADMINISTRATIVE_LIST = [
    {
        name: 'Zones',
        link: 'Zones',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Circles',
        link: 'Circles',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Focus Town',
        link: 'Focus-Town',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Jio Centers',
        link: 'Jio-Centers',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Jio Points',
        link: 'Jio-Points',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Zones',
        link: 'Zones',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Clusters',
        link: 'Clusters',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Maintenance Points',
        link: 'Maintenance-Points',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'R4G States',
        link: 'R4G-States',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_NETWORK_LIST = [
    {
        name: 'EMS',
        link: 'EMS',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_NETWORK_EMS_LIST
    },
    {
        name: 'TAC',
        link: 'TAC',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_CENSUS_LIST = [
    {
        name: 'Towns',
        link: 'Towns',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Villages',
        link: 'Villages',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Panchayat',
        link: 'Panchayat',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DHQ',
        link: 'DHQ',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Settlement',
        link: 'Settlement',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'State',
        link: 'State',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'District',
        link: 'District',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Cities',
        link: 'Cities',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_MORPHOLOGY_LIST = [
    {
        name: 'Dense Urban',
        link: 'Dense-Urban',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Urban',
        link: 'Urban',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Sub Urban',
        link: 'Sub-Urban',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Industrial',
        link: 'Industrial',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Rural',
        link: 'Rural',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Water Body',
        link: 'Water-Body',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Dense Vegetation',
        link: 'Dense-Vegetation',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_POI_LIST = [
    {
        name: 'Railway Stations',
        link: 'Railway-Stations',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Malls',
        link: 'Malls',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Airports',
        link: 'Airports',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Roads',
        link: 'Roads',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Railway Tracks',
        link: 'Railway-Tracks',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Buildings',
        link: 'Buildings',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Jio Infrastructure',
        link: 'Dense-Urban',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_POI_LIST_JIO
    }
];

const ANALYTICS_NETWORK_LIST = [
    {
        name: 'Quality & Experience',
        link: 'Quality-Experience',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_NETWORK_QUALITY
    },
    {
        name: 'Anomalies',
        link: 'Anomalies',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_NETWORK_ANOMALIES
    },
    {
        name: 'Coverage',
        link: 'Coverage',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_NETWORK_COVERAGE
    },
    {
        name: 'Point of Interest',
        link: 'Point-of-Interest',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_NETWORK_POI
    }
];

const SITES_INDOOR_lIST = [
    {
        name: 'Small Cell',
        link: 'Small-Cell',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Wi-Fi',
        link: 'Wi-Fi',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PREDICTION_LAYERS_BAND_LIST = [
    {
        name: 'Planned',
        link: 'planned',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_PLANNED_LIST
    },
    {
        name: 'On-Air',
        link: 'on-air',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_ONAIR_LIST
    }
];

const MEASURED_LAYERS_BAND_LIST = [
    {
        name: 'Netvelocity',
        link: 'Netvelocity',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_MB_NETVELOCITY_LIST
    },
    {
        name: 'Jio Phone',
        link: 'Jio-Phone',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_KPI_JP_LIST
    },
    {
        name: 'LSR',
        link: 'LSR',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_LSR_LIST
    },
    {
        name: 'Accuver Drive Test',
        link: 'Accuver-Drive-test',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_KPI_ADT_LIST
    }
];

const HYBRID_LAYERS_BAND_LIST = [
    {
        name: 'Smart Network Coverage',
        link: 'Accuver-Drive-test',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_SNG_LIST
    },
    {
        name: 'Customer Measured Coverage',
        link: 'Customer-Measured-Coverage',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_CMC_LIST
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
    },
    {
        name: 'Software Management',
        link: 'softwareManagement',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Parameter Change',
        link: 'parameterchange',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'RQA Scheduling',
        link: 'rqascheduling',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Traceport',
        link: 'traceport',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'New Network Element',
        link: 'newnetworkelement',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CONFIG_LSMR
    }
];

const MODULE_LIST_ANALYTICS_SA = [
    {
        name: 'User Experience Anaytics',
        link: 'user-experience-analytics',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'DashBoards',
        link: 'dashboards',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Workorders',
        link: 'workorders',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_ANALYTICS_NA = [
    {
        name: 'Distance and Bearing Angle Calculator',
        link: 'distance-bearing-calculator',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Workorders',
        link: 'workorders',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Location Coverage Analysis Utility',
        link: 'workorders',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_NV_DEVICES = [
    {
        name: 'Devices Manager',
        link: 'devices manager',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Group Manager',
        link: 'group manager',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_PERFORMANCE_LIST = [
    {
        name: 'Algorithms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'KPI Editor',
        link: 'kpi-editor',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PERFORMANCE_KPI
    },
    {
        name: 'Change Impact Module',
        link: 'impact-module',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PERFORMANCE_IMPACT
    }
];

const PLATFORM_DASHBOARD_LIST = [
    {
        name: 'Dashboard Administrator',
        link: 'Dashboard-Administrator',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_DATA_INTEGRITY_LIST = [
    {
        name: 'Audit',
        link: 'Audit',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Workorder',
        link: 'Workorder',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_WORKORDERS_LIST = [
    {
        name: 'Analytics',
        link: 'Analytics',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PLATFORM_WORKORDERS_ANALYTICS_LIST
    },
    {
        name: 'Performance Management',
        link: 'Performance-Management',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Configuration Management',
        link: 'Configuration-Management',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Fault Management',
        link: 'Fault-Management',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Planning and Deployment',
        link: 'Planning-and-Deployment',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Netvelocity',
        link: 'Netvelocity',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_POI_LIST = [
    {
        name: 'JIP',
        link: 'JIP',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: PLATFORM_POI_JIP_LIST
    }
];

const ADMIN_CONFIGURATION_LIST = [
    {
        name: 'Software Management',
        link: 'software-mangement',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_SM_LIST
    },
    {
        name: 'RET',
        link: 'ret',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_RET_LIST
    },
    {
        name: 'Golden Parameter',
        link: 'golden parameter',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_GOLDEN_LIST
    },
    {
        name: 'CM Recipe',
        link: 'cm-recipe',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_CMRECIPE_LIST
    },
    {
        name: 'New Node Parameter',
        link: 'node-parameter',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_NODE_PARAMETER_LIST
    },
    {
        name: 'Traceport - TEC/ipv6',
        link: 'traceport',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_TCE_LIST
    },
    {
        name: 'Algorithms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_PLANNING_DEPLOYMENT_LIST = [
    {
        name: 'Site Deployment',
        link: 'site-deployment',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_PLANNING_SITE_DEPLOYMENT_LIST
    },
    {
        name: 'TAC Module',
        link: 'tac-module',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_PLANNING_TAC_MODULE_LIST
    }
];

const ADMIN_ANALYTICS_LIST = [
    {
        name: 'Subscriber Analytics',
        link: 'subscriber-analytics',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_SUBSCRIBER_ANALYTICS
    },
    {
        name: 'Network Analytics',
        link: 'network-analytics',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_NETWORK_ANALYTICS
    }
];

const ADMIN_FAULT_LIST = [
    {
        name: 'Correlation Module',
        link: 'correlation-module',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: ADMIN_FAULT_CORRELATION_LIST
    },
    {
        name: 'Algoritms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ADMIN_NETVELOCITY_LIST = [
    {
        name: 'Profile',
        link: 'Profile',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'VoLTE Handset Upload History',
        link: 'VoLTE-Upload-History',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Algoritms',
        link: 'algorithms',
        icon: 'fas fa-home',
        level: 3,
        component: HomeJcpThreeComponent,
        children: []
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
    },
    {
        name: 'Workorders',
        link: 'Workorders',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'CM Change Impact',
        link: 'cmchangeimpact',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_CHANGE_IMPACT
    },
    {
        name: 'Jobs',
        link: 'jobs',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        icon: 'fas fa-home',
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const SITES_LIST = [
    {   
        name: "Outdoor",
        icon: "fas fa-user fa-3",
        link: "Outdoor",
        level: 2,
        component: HomeJcpThreeComponent,
        children: SITES_OUTDOOR_lIST
    },
    {
        name: "Indoor",
        icon: "fas fa-user fa-3",
        link: "indoor",
        level: 2,
        component: HomeJcpThreeComponent,
        children: SITES_INDOOR_lIST
    }
];

const ALARMS_LIST = [
    {
        name: "Macro",
        icon: "fas fa-user fa-3",
        link: "Macro",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Wi-Fi",
        icon: "fas fa-user fa-3",
        link: "Wi-Fi",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Small Cells",
        icon: "fas fa-user fa-3",
        link: "Small-Cells",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const ANALYTICS_LIST = [
    {
        name: "Subscriber",
        icon: "fas fa-user fa-3",
        link: "Subscriber",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_SUBSCRIBER_LIST
    },
    {
        name: "Network",
        icon: "fas fa-user fa-3",
        link: "Network",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_NETWORK_LIST
    },
    {
        name: "Others",
        icon: "fas fa-user fa-3",
        link: "Others",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const TOPOLOGIES_LIST = [
    {
        name: "IP",
        icon: "fas fa-user fa-3",
        link: "IP",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Microwave",
        icon: "fas fa-user fa-3",
        link: "Microwave",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "FTTX",
        icon: "fas fa-user fa-3",
        link: "FTTX",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const LOCATION_BOUNDRIES_LIST = [
    {
        name: "Administrative Boundaries",
        icon: "fas fa-user fa-3",
        link: "Administrative-Boundaries",
        level: 2,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_ADMINISTRATIVE_LIST
    },
    {
        name: "Network Boundaries",
        icon: "fas fa-user fa-3",
        link: "Network-Boundaries",
        level: 2,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_NETWORK_LIST
    },
    {
        name: "Census Boundaries",
        icon: "fas fa-user fa-3",
        link: "Census-Boundaries",
        level: 2,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_CENSUS_LIST
    },
    {
        name: "Morphology",
        icon: "fas fa-user fa-3",
        link: "Morphology",
        level: 2,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_MORPHOLOGY_LIST
    },
    {
        name: "Point of Interest",
        icon: "fas fa-user fa-3",
        link: "Point-of-Interest",
        level: 2,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_POI_LIST
    }
];

const BASE_MAPS_LIST = [
    {
        name: "Terrain",
        icon: "fas fa-user fa-3",
        link: "Terrain",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Satellite",
        icon: "fas fa-user fa-3",
        link: "Satellite",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Streets Gray Scale",
        icon: "fas fa-user fa-3",
        link: "Streets-Gray-Scale",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Streets Night",
        icon: "fas fa-user fa-3",
        link: "Streets-Night",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Streets Colored",
        icon: "fas fa-user fa-3",
        link: "Streets-Colored",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MY_LAYERS_LIST = [
    {
        name: "KML",
        icon: "fas fa-user fa-3",
        link: "KML",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Pins",
        icon: "fas fa-user fa-3",
        link: "Pins",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Polygons",
        icon: "fas fa-user fa-3",
        link: "Polygons",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Saved Layers",
        icon: "fas fa-user fa-3",
        link: "Saved-Layers",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
]

const PREDICTION_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_BAND_LIST
      },
      {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_BAND_LIST
      },
      {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_BAND_LIST
      },
      {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_BAND_LIST
      }
];

const MEASURED_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_LIST
        },
    {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_LIST
    },
    {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_LIST
    },
    {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_BAND_LIST
    }
];

const HYBRID_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        level: 2,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_LIST
        },
    {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_LIST
    },
    {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_LIST
    },
    {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        level: 2,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_BAND_LIST
    }
];

const MODULE_LIST_ANALYTICS = [
    {
       
        name: "Subscriber Analysis",
        icon: "fas fa-user fa-3",
        link: "subsciber-analysis",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_ANALYTICS_SA
      },
      {
       
        name: "Network Analysis",
        icon: "fas fa-user fa-3",
        link: "network-analysis",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_ANALYTICS_NA
      }
];
const MODULE_LIST_FAULT = [
    {
        name: "Incident Manager Module",
        icon: "fas fa-user fa-3",
        link: "incident-manager-module",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "Reports",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "work-orders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_NET_VELOCITY = [
    {
       
        name: "Devices",
        icon: "fas fa-user fa-3",
        link: "devices",
        level: 2,
        component: HomeJcpThreeComponent,
        children: MODULE_LIST_NV_DEVICES
    },
    {
       
        name: "Recipe",
        icon: "fas fa-user fa-3",
        link: "recipe",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "reports",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_PERFORMANCE_MANAGEMENT = [
    {
       
        name: "Report Builder",
        icon: "fas fa-user fa-3",
        link: "report-builder",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "My Performance Reports",
        icon: "fas fa-user fa-3",
        link: "my-performance-reports",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "KPI Editor",
        icon: "fas fa-user fa-3",
        link: "kpi-editor",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "MSISDN to Wi-Fi MAC Converter",
        icon: "fas fa-user fa-3",
        link: "mac-converter",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Change Impact Analysis",
        icon: "fas fa-user fa-3",
        link: "change-impact-analysis",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_LIST_PLANNING_DEPLOYMENT = [
    {  
        name: "Dashboards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "reports",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
       
        name: "TAC-TAL Discrepency Audit",
        icon: "fas fa-user fa-3",
        link: "tac-tal-da",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "eNB/SC (Site-level TAC and EMS)",
        icon: "fas fa-user fa-3",
        link: "site-level-tac-ems",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "LSMR (LSMR Re-homing)",
        icon: "fas fa-user fa-3",
        link: "workorders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const MODULE_ADMINISTRATION_LIST = [
    {
        name: "Performance Management",
        icon: "fas fa-user fa-3",
        link: "performance-management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_PERFORMANCE_LIST
    },
    {
        name: "Configuration Management",
        icon: "fas fa-user fa-3",
        link: "configuration-management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_CONFIGURATION_LIST
    },
    {
        name: "Planning and Deployment",
        icon: "fas fa-user fa-3",
        link: "planning-deployment",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_PLANNING_DEPLOYMENT_LIST
    },
    {
        name: "Analytics",
        icon: "fas fa-user fa-3",
        link: "analytics",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_ANALYTICS_LIST
    },
    {
        name: "Fault Management",
        icon: "fas fa-user fa-3",
        link: "fault-mangement",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_FAULT_LIST
    },
    {
        name: "Netvelocity",
        icon: "fas fa-user fa-3",
        link: "net-velocity",
        level: 2,
        component: HomeJcpThreeComponent,
        children: ADMIN_NETVELOCITY_LIST
    }
];

const USER_ADMINISTRATION_LIST = [
    {
        name: "Access Management",
        icon: "fas fa-user fa-3",
        link: "Access-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Role Management",
        icon: "fas fa-user fa-3",
        link: "Role-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Team Management",
        icon: "fas fa-user fa-3",
        link: "Team-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "User Management",
        icon: "fas fa-user fa-3",
        link: "User-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: "Work Group Management",
        icon: "fas fa-user fa-3",
        link: "Work-Group-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_ADMINISTRATION_LIST = [
    {
        name: "Dashboard",
        icon: "fas fa-user fa-3",
        link: "Dashboard",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PLATFORM_DASHBOARD_LIST
    },
    {
        name: "Data Integrity Management",
        icon: "fas fa-user fa-3",
        link: "Data-Integrity-Management",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PLATFORM_DATA_INTEGRITY_LIST
    },
    {
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "Workorders",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PLATFORM_WORKORDERS_LIST
    },
    {
        name: "Usage Analytics",
        icon: "fas fa-user fa-3",
        link: "Usage-Analytics",
        level: 2,
        component: HomeJcpThreeComponent,
        children: []
    }
];

const PLATFORM_LAYER_LIST = [
    {
        name: "Point of Interest",
        icon: "fas fa-user fa-3",
        link: "Point-of-Interest",
        level: 2,
        component: HomeJcpThreeComponent,
        children: PLATFORM_POI_LIST
    }
];

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
        children: MODULE_LIST_ANALYTICS
    },
    {
        name: 'Fault Management',
        link: 'faultmanagement',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: MODULE_LIST_FAULT
    },
    {
        name: 'Net Velocity',
        link: 'net-velocity',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: MODULE_LIST_NET_VELOCITY
    },
    {
        name: 'Performance Management',
        link: 'performance-management',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: MODULE_LIST_PERFORMANCE_MANAGEMENT
    },
    {
        name: 'Planning and Deployment',
        link: 'planning-deployment',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: MODULE_LIST_PLANNING_DEPLOYMENT
    }
];

const LAYERS_LIST = [
    // {
    //     name: "Default",
    //     icon: "fas fa-users fa-3",
    //     link: "JCP/Layers",
    //     level: 1,
    //     component: HomeJcpThreeComponent,
    //     children: []
    // },
    {
        name: "Sites",
        icon: "fas fa-users fa-3",
        link: "Sites",
        level: 1,
        component: HomeJcpThreeComponent,
        children: SITES_LIST
    },
    {
        name: "Prediction Layers",
        icon: "fas fa-users fa-3",
        link: "Prediction-Layers",
        level: 1,
        component: HomeJcpThreeComponent,
        children: PREDICTION_LAYERS_LIST
    },
    {
        name: "Measured Layers",
        icon: "fas fa-users fa-3",
        link: "Measured-Layers",
        level: 1,
        component: HomeJcpThreeComponent,
        children: MEASURED_LAYERS_LIST
    },
    {
        name: "Hybrid Layers",
        icon: "fas fa-users fa-3",
        link: "Hybrid-Layers",
        level: 1,
        component: HomeJcpThreeComponent,
        children: HYBRID_LAYERS_LIST
    },
    {
        name: "Alarms",
        icon: "fas fa-users fa-3",
        link: "Alarms",
        level: 1,
        component: HomeJcpThreeComponent,
        children: ALARMS_LIST
    },
    {
        name: "Analytics",
        icon: "fas fa-users fa-3",
        link: "Analytics",
        level: 1,
        component: HomeJcpThreeComponent,
        children: ANALYTICS_LIST
    },
    {
        name: "Topologies",
        icon: "fas fa-users fa-3",
        link: "Topologies",
        level: 1,
        component: HomeJcpThreeComponent,
        children: TOPOLOGIES_LIST
    },
    {
        name: "Locations and Boundaries",
        icon: "fas fa-users fa-3",
        link: "Locations-and-Boundaries",
        level: 1,
        component: HomeJcpThreeComponent,
        children: LOCATION_BOUNDRIES_LIST
    },
    {
        name: "Base Maps",
        icon: "fas fa-users fa-3",
        link: "Base-Maps",
        level: 1,
        component: HomeJcpThreeComponent,
        children: BASE_MAPS_LIST
    },
    {
        name: "My Layers",
        icon: "fas fa-users fa-3",
        link: "My-Layers",
        level: 1,
        component: HomeJcpThreeComponent,
        children: MY_LAYERS_LIST
    }
];

const REPORTS_LIST = [
    {
        name: 'Report Wizard',
        link: 'JCP/Reports-and-Dashboard/Report-Wizard',
        icon: 'fas fa-home',
        level: 1,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'My Reports',
        link: 'JCP/Reports-and-Dashboard/My-Reports',
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
    },
    {
        name: 'My Subscriptions',
        link: 'my-subscriptions',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    }
];

const WORKORDERS_LIST = [
    {
        name: 'My Workorders',
        link: 'my-workorders',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'All Workorders',
        link: 'all-workorders',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'DashBoards',
        link: 'dashboards',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    },
    {
        name: 'My Approvals',
        link: 'my-approvals',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: []
    }
];

const ADMINISTRATION_LIST = [
    {
        name: 'Module Management',
        link: 'module-management',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: MODULE_ADMINISTRATION_LIST
    },
    {
        name: 'User Management',
        link: 'user-management',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: USER_ADMINISTRATION_LIST
    },
    {
        name: 'Platform Management',
        link: 'platform-management',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: PLATFORM_ADMINISTRATION_LIST
    },
    {
        name: 'Layer Management',
        link: 'layer-mangement',
        level: 1,
        component: HomeJcpThreeComponent,
        icon: 'fas fa-home',
        children: PLATFORM_LAYER_LIST
    }
];

export const LEFTSIDE_MENU_LIST = [
    {
        name: 'Home',
        link: 'JCP/Home',
        icon: 'ic ic-home-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: []
    },
    {
        name: 'Layers',
        link: 'JCP/Layers',
        icon: 'ic ic-layers-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: LAYERS_LIST
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
        children: WORKORDERS_LIST
    },
    {
        name: 'Administration',
        link: 'administration',
        icon: 'ic ic-administration-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: ADMINISTRATION_LIST
    },
    {
        name: 'My JCP',
        link: 'myJCP',
        icon: 'ic ic-my_jcp-01',
        level: 0,
        component: HomeJcpThreeComponent,
        children: []
    }
];