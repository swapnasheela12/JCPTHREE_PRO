const MODULE_LIST_CONFIG_VENDOR = [
    {
        name: 'Node',
        link: 'Node',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_RAN_DL = [
    {
        name: 'Discrepancy Library',
        link: 'DiscrepancyLibrary',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Query Builder',
        link: 'querybuilder',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Selective Parameter Live',
        link: 'selective-parameter-live',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];


const MODULE_LIST_CONFIG_LSMR_DOMAIN = [
    {
        name: 'Vendor',
        link: 'Vendor',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_VENDOR
    }
];

const ADMIN_CONFIGURATION_SM_RAN_LIST = [
    {
        name: 'Package Details',
        link: 'package-details',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_RET_RAN_LIST = [
    {
        name: 'RET',
        link: 'ret',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_GOLDEN_RAN_LIST = [
    {
        name: 'Golden Parameters',
        link: 'golden-parameters',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_CMRECIPE_RAN_LIST = [
    {
        name: 'CM Recipe',
        link: 'cm-recipe',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_NODE_PARAMETER_RAN_LIST = [
    {
        name: 'New Node Parameter',
        link: 'new-node-parameter',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_TEC_RAN_LIST = [
    {
        name: 'Traceport - TCE/ipv6',
        link: 'traceport-tce',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const NETWORK_EMS_SAMSUNG_LIST = [
    {
        name: 'LSMR',
        link: 'LSMR',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const NETWORK_EMS_AIRSPAN_LIST = [
    {
        name: 'Netspan',
        link: 'Netspan',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_PLANNING_SITE_DEPLOYMENT_ODSC_LIST = [
    {
        name: 'Config Template',
        link: 'config-template',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'ODSC SLA Configuration',
        link: 'odsc-sla-config',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Remarks Template',
        link: 'remarks-template',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_ANALYTICS_NW_AL_ANALYTICS = [
    {
        name: 'Algorithm selection',
        link: 'algorithm-selection',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_RAN = [
    {
        name: 'Query',
        link: 'Query',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_RAN_DL
    },
    {
        name: 'Compare',
        link: 'Compare',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];
const MODULE_LIST_CORE = [
    {
        name: 'Compare',
        link: 'Compare',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Discrepancy',
        link: 'Discrepancy',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Query',
        link: 'Query',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_CONFIG_LSMR = [
    {
        name: 'Domain',
        link: 'Domain',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR_DOMAIN
    }
];

const PREDICTION_LAYERS_PLANNED_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DLThroughput',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Best Server Plot',
        link: 'Best Server Plot',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ANALYTICS_NETWORK_QUALITY = [
    {
        name: 'Infill Planning',
        link: 'Infill-Planning',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ANALYTICS_NETWORK_ANOMALIES = [
    {
        name: 'Mis-aligned Sectors',
        link: 'Mis-aligned-Sectors',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Overshooting Cells',
        link: 'Overshooting-Cells',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ANALYTICS_NETWORK_COVERAGE = [
    {
        name: 'Coverage Holes',
        link: 'Coverage-Holes',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Indoor Coverage Holes',
        link: 'Indoor-Coverage-Holes',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ANALYTICS_NETWORK_POI = [
    {
        name: 'Building',
        link: 'Building',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PREDICTION_LAYERS_ONAIR_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Best Server Plot',
        link: 'Best Server Plot',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MEASURED_LAYERS_MB_NETVELOCITY_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Latency',
        link: 'latency',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'UL Throughput',
        link: 'ul-throughput',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'dl-throughput',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MEASURED_LAYERS_BAND_LSR_LIST = [
    {
        name: 'VoLTE Drops',
        link: 'VoLTE-Drops',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DL-Throughput',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Sessions',
        link: 'Sessions',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'RSRP',
        link: 'RSRP',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'CQI',
        link: 'CQI',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_ADT_LIST = [
    {
        name: 'RSRP',
        link: 'RSRP',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'SINR',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DL Throughput',
        link: 'DL-Throughput',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'UL Throughput',
        link: 'UL-Throughput',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'RSRQ',
        link: 'RSRQ',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'CQI',
        link: 'CQI',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DL RB Utilization',
        link: 'DL RB Utilization',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'UL RB Utilization',
        link: 'UL RB Utilization',
        eventName: 'sites-outdoor-esc',
        children: []
    }, {
        name: 'Rank Indicator',
        link: 'Rank Indicator',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MEASURED_LAYERS_BAND_KPI_JP_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Call Muting',
        link: 'Call-Muting',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Call Drop',
        link: 'Call-Drop',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Coverage Experience',
        link: 'Coverage-Experience',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const HYBRID_LAYERS_BAND_KPI_LIST = [
    {
        name: 'KPIs',
        link: 'kpis',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const HYBRID_LAYERS_BAND_SNG_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const HYBRID_LAYERS_BAND_CMC_LIST = [
    {
        name: 'RSRP',
        link: 'rsrp',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'SINR',
        link: 'sinr',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Unique Users',
        link: 'Unique-Users',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Data Volume',
        link: 'Data-Volume',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PERFORMANCE_KPI = [
    {
        name: 'Software Versions',
        link: 'software-versions',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Counter Categories',
        link: 'counter-categories',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_WORKORDERS_ANALYTICS_LIST = [
    {
        name: 'RF OC Workorders',
        link: 'RF OC Workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_POI_JIP_LIST = [
    {
        name: 'NE Data',
        link: 'ne-data',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_CONFIGURATION_SM_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_SM_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_RET_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_RET_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_GOLDEN_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_GOLDEN_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_CMRECIPE_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_CMRECIPE_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_NODE_PARAMETER_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_NODE_PARAMETER_RAN_LIST
    }
];

const ADMIN_CONFIGURATION_TCE_LIST = [
    {
        name: 'RAN',
        link: 'ran',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_TEC_RAN_LIST
    }
];

const PERFORMANCE_IMPACT = [
    {
        name: 'KPI Settings',
        link: 'kpi-settings',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Algorithm Settings',
        link: 'algorithm settings',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_VENDOR = [
    {
        name: 'Vendor',
        link: 'Vendor',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const LOCATION_BOUNDRIES_NETWORK_EMS_LIST = [
    {
        name: 'Samsung',
        link: 'Samsung',
        eventName: 'sites-outdoor-esc',
        children: NETWORK_EMS_SAMSUNG_LIST
    },
    {
        name: 'Airspan',
        link: 'Airspan',
        eventName: 'sites-outdoor-esc',
        children: NETWORK_EMS_AIRSPAN_LIST
    }
];

const LOCATION_BOUNDRIES_POI_LIST_JIO = [
    {
        name: 'JIP',
        link: 'JIP',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'JIEM',
        link: 'JIEM',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_PLANNING_SITE_DEPLOYMENT_LIST = [
    {
        name: 'Site SLA Configuration',
        link: 'site-sla-configuration',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'P2B Admin',
        link: 'p2b-admin',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'ODSC',
        link: 'odsc',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_PLANNING_SITE_DEPLOYMENT_ODSC_LIST
    }
];

const ADMIN_PLANNING_TAC_MODULE_LIST = [
    {
        name: 'MME Pool Architecture',
        link: 'mme-module-architecture',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'TAC Module Admin Panel',
        link: 'tac-module-admin-panel',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_ANALYTICS_SUBSCRIBER_ANALYTICS = [
    {
        name: 'CENA',
        link: 'cena',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Algorithms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    }
];

const ADMIN_ANALYTICS_NETWORK_ANALYTICS = [
    {
        name: 'Algorithms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    }
];

const ADMIN_FAULT_CORRELATION_LIST = [
    {
        name: 'Self Correlation',
        link: 'Self-Correlation',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Alarm Block',
        link: 'Alarm-Block',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Impact Settings',
        link: 'Impact-Settings',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Dampening Time',
        link: 'Dampening-Time',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    },
    {
        name: 'Count Based Mask',
        link: 'Count-Based-Mask',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NW_AL_ANALYTICS
    }
];

const MODULE_LIST_AUDIT = [
    {
        name: 'RAN',
        link: 'RAN',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_RAN
    },
    {
        name: 'Core',
        link: 'Core',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CORE
    }
];

const MODULE_LIST_CHANGE_IMPACT = [
    {
        name: 'RAN',
        link: 'RAN',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_VENDOR
    }
];

const SITES_OnAir_4GMacro_lIST = [
    {
        name: '4G Macro',
        link: 'JCP/Layers/OnAir/Macro/Macro4G',
        eventName: 'sites-onAir-macro-macro4G',
        children: [],
        parentToChild: 'Sites-OnAir-Macro-Macro4G'
    }
];
const SITES_OnAir_4GHpodsc_lIST = [
    {
        name: '4G HP ODSC',
        link: 'JCP/Layers/OnAir/Hpodsc/HPODSC4g',
        eventName: 'sites-onAir-hpodsc-hPODSC4g',
        children: [],
        parentToChild: 'Sites-OnAir-Hpodsc-HPODSC4g'
    }
];
const SITES_OnAir_4GSmallCell_lIST = [
    {
        name: '4G Small Cell',
        link: 'JCP/Layers/OnAir/smallCell/smallCell4g',
        eventName: 'sites-OnAir-smallCell-smallCell4g',
        children: [],
        parentToChild: 'Sites-OnAir-SmallCell-SmallCell4g'
    }
];

const SITES_OnAir_lIST = [
    {
        name: "Macro",
        link: "Macro",
        eventName: 'sites-onAir-Macro',
        children: SITES_OnAir_4GMacro_lIST
    },
    {
        name: 'Hpodsc',
        link: 'JCP/Layers/OnAir/Hpodsc',
        eventName: 'sites-onAir-hpodsc',
        children: SITES_OnAir_4GHpodsc_lIST
    },
    {
        name: 'Outdoor Small Cell',
        link: 'JCP/Layers/OnAir/Small-Cell',
        eventName: 'sites-onAir-small-cell',
        children: SITES_OnAir_4GSmallCell_lIST
    }
];

const SITES_Nominal_4GMacro_lIST = [
    {
        name: '4G Macro',
        link: 'JCP/Layers/Nominal/Macro/Macro4G',
        eventName: 'sites-nominal-macro-macro4G',
        children: [],
        parentToChild: 'Sites-Nominal-Macro-Macro4G'
    }
];
const SITES_Nominal_4GHpodsc_lIST = [
    {
        name: '4G HP ODSC',
        link: 'JCP/Layers/Nominal/Hpodsc/HPODSC4g',
        eventName: 'sites-nominal-hpodsc-hPODSC4g',
        children: [],
        parentToChild: 'Sites-Nominal-Hpodsc-HPODSC4g'
    }
];
const SITES_Nominal_4GSmallCell_lIST = [
    {
        name: '4G Small Cell',
        link: 'JCP/Layers/Nominal/smallCell/smallCell4g',
        eventName: 'sites-Nominal-smallCell-smallCell4g',
        children: [],
        parentToChild: 'Sites-Nominal-SmallCell-SmallCell4g'
    }
];

const SITES_Nominal_lIST = [
    {
        name: "Macro",
        link: "Macro",
        eventName: 'sites-nominal-Macro',
        children: SITES_Nominal_4GMacro_lIST
    },
    {
        name: 'Hpodsc',
        link: 'JCP/Layers/Nominal/Hpodsc',
        eventName: 'sites-nominal-hpodsc',
        children: SITES_Nominal_4GHpodsc_lIST
    }
];

const SITES_Planned_4GMacro_lIST = [
    {
        name: '4G Macro',
        link: 'JCP/Layers/Planned/Macro/Macro4G',
        eventName: 'sites-planned-macro-macro4G',
        children: [],
        parentToChild: 'Sites-Planned-Macro-Macro4G'
    }
];
const SITES_Planned_4GHpodsc_lIST = [
    {
        name: '4G HP ODSC',
        link: 'JCP/Layers/Planned/Hpodsc/HPODSC4g',
        eventName: 'sites-planned-hpodsc-hPODSC4g',
        children: [],
        parentToChild: 'Sites-Planned-Hpodsc-HPODSC4g'
    }
]; 
const SITES_Planned_4GSmallCell_lIST = [
    {
        name: '4G Small Cell',
        link: 'JCP/Layers/Planned/smallCell/smallCell4g',
        eventName: 'sites-Planned-smallCell-smallCell4g',
        children: [],
        parentToChild: 'Sites-Planned-SmallCell-SmallCell4g'
    }
];

const SITES_Planned_lIST = [
    {
        name: "Macro",
        link: "Macro",
        eventName: 'sites-planned-Macro',
        children: SITES_Planned_4GMacro_lIST
    },
    {
        name: 'Hpodsc',
        link: 'JCP/Layers/Planned/Hpodsc',
        eventName: 'sites-planned-hpodsc',
        children: SITES_Planned_4GHpodsc_lIST
    },
    {
        name: 'Outdoor Small Cell',
        link: 'JCP/Layers/Planned/Small-Cell',
        eventName: 'sites-planned-small-cell',
        children: SITES_Planned_4GSmallCell_lIST
    }
];


// const SITES_Nominal_lIST = [
//     {
//         name: 'Macro',
//         link: 'JCP/Layers/Nominal/Macro',
//         eventName: 'sites-nominal-macro',
//         children: [],
//         parentToChild: 'Sites-Nominal-Macro'
//     },
//     {
//         name: 'HP ODSC',
//         link: 'JCP/Layers/Nominal/Hpodsc',
//         eventName: 'sites-nominal-Hpodsc',
//         children: [],
//         parentToChild: 'Sites-Nominal-Hpodsc'
//     },
//     {
//         name: 'Small Cell',
//         link: 'JCP/Layers/Nominal/Small-Cell',
//         eventName: 'sites-nominal-small-cell',
//         children: [],
//         parentToChild: 'Sites-Nominal-Small-Cell'
//     }
// ];

// const SITES_Planned_lIST = [
//     {
//         name: 'Macro',
//         link: 'JCP/Layers/Planned/Macro',
//         eventName: 'sites-planned-macro',
//         children: [],
//         parentToChild: 'Sites-Planned-Macro'
//     },
//     {
//         name: 'HP ODSC',
//         link: 'JCP/Layers/Planned/Hpodsc',
//         eventName: 'sites-planned-Hpodsc',
//         children: [],
//         parentToChild: 'Sites-Planned-Hpodsc'
//     },
//     {
//         name: 'Small Cell',
//         link: 'JCP/Layers/Planned/Small-Cell',
//         eventName: 'sites-planned-small-cell',
//         children: [],
//         parentToChild: 'Sites-Planned-Small-Cell'
//     }
// ];

const ANALYTICS_SUBSCRIBER_LIST = [
    {
        name: 'Anomalies',
        link: 'Anomalies',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Coverage',
        link: 'Coverage',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Quality & Experience',
        link: 'Quality-Experience',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const
    LOCATION_BOUNDRIES_ADMINISTRATIVE_LIST = [
        {
            name: 'Zones',
            link: 'Zones',
            eventName: 'sites-outdoor-esc',
            children: [],
            component: 'ZonesJioDialogComponent'
        },
        {
            name: 'Circles',
            link: 'Circles',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Focus Town',
            link: 'Focus-Town',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Jio Centers',
            link: 'Jio-Centers',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Jio Points',
            link: 'Jio-Points',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Zones',
            link: 'Zones',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Clusters',
            link: 'Clusters',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'Maintenance Points',
            link: 'Maintenance-Points',
            eventName: 'sites-outdoor-esc',
            children: []
        },
        {
            name: 'R4G States',
            link: 'R4G-States',
            eventName: 'sites-outdoor-esc',
            children: []
        }
    ];

const LOCATION_BOUNDRIES_NETWORK_LIST = [
    // {
    //     name: 'EMS',
    //     link: 'EMS',
    //     eventName: 'sites-outdoor-esc',
    //     children: LOCATION_BOUNDRIES_NETWORK_EMS_LIST
    // },
    {
        name: 'TAL',
        link: 'TAL',
        eventName: 'sites-outdoor-esc',
        children: [],
        component: 'TacNetworkDialogComponent'
    },
    {
        name: 'TCA',
        link: 'TCA',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'EMI',
        link: 'EMI',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const LOCATION_BOUNDRIES_CENSUS_LIST = [
    {
        name: 'Town Boundary',
        link: 'Towns',
        eventName: 'sites-outdoor-esc',
        children: [],
        component: 'TownBoundaryDialogComponent'
    },
    {
        name: 'Village Boundary',
        link: 'Villages',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Panchayat Boundary',
        link: 'Panchayat',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DHQ Boundary',
        link: 'DHQ',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Settlement Boundary',
        link: 'Settlement',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'State',
        link: 'State',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'District',
        link: 'District',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Cities',
        link: 'Cities',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const LOCATION_BOUNDRIES_MORPHOLOGY_LIST = [
    {
        name: 'Dense Urban',
        link: 'Dense-Urban',
        eventName: 'sites-outdoor-esc',
        children: [],
        component: 'DenseUrbanDialogComponent'
    },
    {
        name: 'Urban',
        link: 'Urban',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Sub Urban',
        link: 'Sub-Urban',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Industrial',
        link: 'Industrial',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Rural',
        link: 'Rural',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Water Body',
        link: 'Water-Body',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Dense Vegetation',
        link: 'Dense-Vegetation',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const LOCATION_BOUNDRIES_POI_LIST = [
    {
        name: 'Railway Stations',
        link: 'Railway-Stations',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Malls',
        link: 'Malls',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Airports',
        link: 'Airports',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Roads',
        link: 'Roads',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Railway Tracks',
        link: 'Railway-Tracks',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Buildings',
        link: 'Buildings',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Jio Infrastructure',
        link: 'Dense-Urban',
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_POI_LIST_JIO
    }
];

const ANALYTICS_NETWORK_LIST = [
    {
        name: 'Quality & Experience',
        link: 'Quality-Experience',
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_NETWORK_QUALITY
    },
    {
        name: 'Anomalies',
        link: 'Anomalies',
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_NETWORK_ANOMALIES
    },
    {
        name: 'Coverage',
        link: 'Coverage',
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_NETWORK_COVERAGE
    },
    {
        name: 'Point of Interest',
        link: 'Point-of-Interest',
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_NETWORK_POI
    }
];

const SITES_INDOOR_lIST = [
    {
        name: 'Small Cell',
        link: 'Small-Cell',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Wi-Fi',
        link: 'Wi-Fi',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const SITES_NOMINAL_lIST = [
    {
        name: 'Macro',
        link: 'Macro',
        eventName: 'sites-outdoor-esc',
        children: [],
        component: 'NominalMacroDialogComponent'
    },
]

const PREDICTION_LAYERS_BAND_LIST = [
    {
        name: 'Planned',
        link: 'planned',
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_PLANNED_LIST
    },
    {
        name: 'On-Air',
        link: 'on-air',
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_ONAIR_LIST
    }
];

const MEASURED_LAYERS_BAND_LIST = [
    {
        name: 'Netvelocity',
        link: 'Netvelocity',
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_MB_NETVELOCITY_LIST
    },
    {
        name: 'Jio Phone',
        link: 'Jio-Phone',
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_KPI_JP_LIST
    },
    {
        name: 'LSR',
        link: 'LSR',
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_LSR_LIST
    },
    {
        name: 'Accuver Drive Test',
        link: 'Accuver-Drive-test',
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_KPI_ADT_LIST
    }
];

const HYBRID_LAYERS_BAND_LIST = [
    {
        name: 'Smart Network Coverage',
        link: 'Accuver-Drive-test',
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_SNG_LIST
    },
    {
        name: 'Customer Measured Coverage',
        link: 'Customer-Measured-Coverage',
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_CMC_LIST
    }
];

const MODULE_LIST_CONFIG = [
    {
        name: 'LSMR Rehoming',
        link: 'LSMRRehoming',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Trial Management',
        link: 'TrialManagement',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Software Management',
        link: 'softwareManagement',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Parameter Change',
        link: 'parameterchange',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'RQA Scheduling',
        link: 'rqascheduling',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'Traceport',
        link: 'traceport',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    },
    {
        name: 'New Network Element',
        link: 'newnetworkelement',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG_LSMR
    }
];

const MODULE_LIST_ANALYTICS_SA = [
    {
        name: 'User Experience Anaytics',
        link: 'user-experience-analytics',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DashBoards',
        link: 'dashboards',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Workorders',
        link: 'workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_ANALYTICS_NA = [
    {
        name: 'Distance and Bearing Angle Calculator',
        link: 'distance-bearing-calculator',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Workorders',
        link: 'workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Location Coverage Analysis Utility',
        link: 'workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_NV_DEVICES = [
    {
        name: 'Devices Manager',
        link: 'devices manager',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Group Manager',
        link: 'group manager',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_PERFORMANCE_LIST = [
    {
        name: 'Algorithms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'KPI Editor',
        link: 'kpi-editor',
        eventName: 'sites-outdoor-esc',
        children: PERFORMANCE_KPI
    },
    {
        name: 'Change Impact Module',
        link: 'impact-module',
        eventName: 'sites-outdoor-esc',
        children: PERFORMANCE_IMPACT
    }
];

const PLATFORM_DASHBOARD_LIST = [
    {
        name: 'Dashboard Administrator',
        link: 'Dashboard-Administrator',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_DATA_INTEGRITY_LIST = [
    {
        name: 'Audit',
        link: 'Audit',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Workorder',
        link: 'Workorder',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_WORKORDERS_LIST = [
    {
        name: 'Analytics',
        link: 'Analytics',
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_WORKORDERS_ANALYTICS_LIST
    },
    {
        name: 'Performance Management',
        link: 'Performance-Management',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Configuration Management',
        link: 'Configuration-Management',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Fault Management',
        link: 'Fault-Management',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Planning and Deployment',
        link: 'Planning-and-Deployment',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Netvelocity',
        link: 'Netvelocity',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_POI_LIST = [
    {
        name: 'JIP',
        link: 'JIP',
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_POI_JIP_LIST
    }
];

const ADMIN_CONFIGURATION_LIST = [
    {
        name: 'Software Management',
        link: 'software-mangement',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_SM_LIST
    },
    {
        name: 'RET',
        link: 'ret',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_RET_LIST
    },
    {
        name: 'Golden Parameter',
        link: 'golden parameter',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_GOLDEN_LIST
    },
    {
        name: 'CM Recipe',
        link: 'cm-recipe',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_CMRECIPE_LIST
    },
    {
        name: 'New Node Parameter',
        link: 'node-parameter',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_NODE_PARAMETER_LIST
    },
    {
        name: 'Traceport - TEC/ipv6',
        link: 'traceport',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_TCE_LIST
    },
    {
        name: 'Algorithms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_PLANNING_DEPLOYMENT_LIST = [
    {
        name: 'Site Deployment',
        link: 'site-deployment',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_PLANNING_SITE_DEPLOYMENT_LIST
    },
    {
        name: 'TAC Module',
        link: 'tac-module',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_PLANNING_TAC_MODULE_LIST
    }
];

const ADMIN_ANALYTICS_LIST = [
    {
        name: 'Subscriber Analytics',
        link: 'subscriber-analytics',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_SUBSCRIBER_ANALYTICS
    },
    {
        name: 'Network Analytics',
        link: 'network-analytics',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_NETWORK_ANALYTICS
    }
];

const ADMIN_FAULT_LIST = [
    {
        name: 'Correlation Module',
        link: 'correlation-module',
        eventName: 'sites-outdoor-esc',
        children: ADMIN_FAULT_CORRELATION_LIST
    },
    {
        name: 'Algoritms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ADMIN_NETVELOCITY_LIST = [
    {
        name: 'Profile',
        link: 'Profile',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'VoLTE Handset Upload History',
        link: 'VoLTE-Upload-History',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Algoritms',
        link: 'algorithms',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_CONFIGURATION = [
    {
        name: 'Planned Event Calendar',
        link: 'PlannedEventCalendar',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Config Change',
        link: 'ConfigChange',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIG
    },
    {
        name: 'Audit and Query',
        link: 'AuditandQuery',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_AUDIT
    },
    {
        name: 'Workorders',
        link: 'Workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'CM Change Impact',
        link: 'cmchangeimpact',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CHANGE_IMPACT
    },
    {
        name: 'Jobs',
        link: 'jobs',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const SITES_LIST = [
    {
        name: "On-Air",
        icon: "fas fa-user fa-3",
        link: "onAir",
        eventName: 'sites-OnAir-esc',
        children: SITES_OnAir_lIST
    },
    {
        name: "Planned",
        icon: "fas fa-user fa-3",
        link: "planned",
        eventName: 'sites-planned-esc',
        children: SITES_Planned_lIST
    },
    {
        name: "Nominal",
        icon: "fas fa-user fa-3",
        link: "nominal",
        eventName: 'sites-nominal-esc',
        children: SITES_Nominal_lIST
    }
];

const ALARMS_LIST = [
    {
        name: "Macro",
        icon: "fas fa-user fa-3",
        link: "Macro",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Wi-Fi",
        icon: "fas fa-user fa-3",
        link: "Wi-Fi",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Small Cells",
        icon: "fas fa-user fa-3",
        link: "Small-Cells",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const ANALYTICS_LIST = [
    {
        name: "Subscriber",
        icon: "fas fa-user fa-3",
        link: "Subscriber",
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_SUBSCRIBER_LIST
    },
    {
        name: "Network",
        icon: "fas fa-user fa-3",
        link: "Network",
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_NETWORK_LIST
    },
    {
        name: "Others",
        icon: "fas fa-user fa-3",
        link: "Others",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const TOPOLOGIES_LIST = [
    {
        name: "IP",
        icon: "fas fa-user fa-3",
        link: "IP",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Microwave",
        icon: "fas fa-user fa-3",
        link: "Microwave",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "FTTX",
        icon: "fas fa-user fa-3",
        link: "FTTX",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const LOCATION_BOUNDRIES_LIST = [
    {
        name: "Jio",
        icon: "fas fa-user fa-3",
        link: "Administrative-Boundaries",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_ADMINISTRATIVE_LIST
    },
    {
        name: "Morphology",
        icon: "fas fa-user fa-3",
        link: "Morphology",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_MORPHOLOGY_LIST
    },
    {
        name: "Census Data",
        icon: "fas fa-user fa-3",
        link: "Census-Boundaries",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_CENSUS_LIST
    },
    {
        name: "Network",
        icon: "fas fa-user fa-3",
        link: "Network-Boundaries",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_NETWORK_LIST
    },
    {
        name: "Point of Interest",
        icon: "fas fa-user fa-3",
        link: "Point-of-Interest",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_POI_LIST
    }
];

const BASE_MAPS_LIST = [
    {
        name: "Terrain",
        icon: "fas fa-user fa-3",
        link: "Terrain",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Satellite",
        icon: "fas fa-user fa-3",
        link: "Satellite",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Streets Gray Scale",
        icon: "fas fa-user fa-3",
        link: "Streets-Gray-Scale",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Streets Night",
        icon: "fas fa-user fa-3",
        link: "Streets-Night",
        eventName: 'sites-outdoor-esc',

        children: []
    },
    {
        name: "Streets Colored",
        icon: "fas fa-user fa-3",
        link: "Streets-Colored",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MY_LAYERS_LIST = [
    {
        name: "KML",
        icon: "fas fa-user fa-3",
        link: "KML",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Pins",
        icon: "fas fa-user fa-3",
        link: "Pins",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Polygons",
        icon: "fas fa-user fa-3",
        link: "Polygons",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Saved Layers",
        icon: "fas fa-user fa-3",
        link: "Saved-Layers",
        eventName: 'sites-outdoor-esc',
        children: []
    }
]

const PREDICTION_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_BAND_LIST
    },
    {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_BAND_LIST
    },
    {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_BAND_LIST
    },
    {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_BAND_LIST
    }
];

const MEASURED_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_LIST
    },
    {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_LIST
    },
    {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_LIST
    },
    {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_BAND_LIST
    }
];

const HYBRID_LAYERS_LIST = [
    {
        name: "Combined",
        icon: "fas fa-user fa-3",
        link: "combined",
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_LIST
    },
    {
        name: "2300 MHz",
        icon: "fas fa-user fa-3",
        link: "2300MHz",
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_LIST
    },
    {
        name: "1800 MHz",
        icon: "fas fa-user fa-3",
        link: "1800MHz",
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_LIST
    },
    {
        name: "850 MHz",
        icon: "fas fa-user fa-3",
        link: "850MHz",
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_BAND_LIST
    }
];

const MODULE_LIST_ANALYTICS = [
    {

        name: "Subscriber Analysis",
        icon: "fas fa-user fa-3",
        link: "subsciber-analysis",
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_ANALYTICS_SA
    },
    {

        name: "Network Analysis",
        icon: "fas fa-user fa-3",
        link: "network-analysis",
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_ANALYTICS_NA
    }
];
const MODULE_LIST_FAULT = [
    {
        name: "Incident Manager Module",
        icon: "fas fa-user fa-3",
        link: "incident-manager-module",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "Reports",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "work-orders",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        eventName: 'sites-outdoor-esc',

        children: []
    }
];

const MODULE_LIST_NET_VELOCITY = [
    {

        name: "Devices",
        icon: "fas fa-user fa-3",
        link: "devices",
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_NV_DEVICES
    },
    {

        name: "Recipe",
        icon: "fas fa-user fa-3",
        link: "recipe",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "reports",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "DashBoards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const CIA_MODULE_LIST = [
    {
        name: "CIA - Module",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/Change-Impact-Analysis/CIA-Module",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "CIA - KPI Settings",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/Change-Impact-Analysis/CIA-KPI-Settings",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "CIA - Admin Settings",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/Change-Impact-Analysis/CIA-Admin-Settings",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_PERFORMANCE_MANAGEMENT = [
    {

        name: "Report Builder",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/Report-Builder",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "My Performance Reports",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/My-Performance-Reports",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "KPI Editor",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/KPI-Editor",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "MSISDN to Wi-Fi MAC Converter",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Performance-Management/MSISDN-To-Wi-Fi-MAC-Converter",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "Change Impact Analysis",
        icon: "fas fa-user fa-3",
        link: "change-impact-analysis",
        eventName: 'sites-outdoor-esc',
        children: CIA_MODULE_LIST
    },
    {

        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_LIST_PLANNING_DEPLOYMENT = [
    {
        name: "Dashboards",
        icon: "fas fa-user fa-3",
        link: "dashboards",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Reports",
        icon: "fas fa-user fa-3",
        link: "reports",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "workorders",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {

        name: "TAC-TAL Discrepency Audit",
        icon: "fas fa-user fa-3",
        link: "tac-tal-da",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "eNB/SC (Site-level TAC and EMS)",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Planning-Deployment/enbsc",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "LSMR (LSMR Re-homing)",
        icon: "fas fa-user fa-3",
        link: "workorders",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "5G Link Budget",
        icon: "fas fa-user fa-3",
        link: "JCP/Modules/Planning-Deployment/5G-Link-Budget",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const MODULE_ADMINISTRATION_LIST = [
    {
        name: "Performance Management",
        icon: "fas fa-user fa-3",
        link: "performance-management",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_PERFORMANCE_LIST
    },
    {
        name: "Configuration Management",
        icon: "fas fa-user fa-3",
        link: "configuration-management",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_CONFIGURATION_LIST
    },
    {
        name: "Planning and Deployment",
        icon: "fas fa-user fa-3",
        link: "planning-deployment",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_PLANNING_DEPLOYMENT_LIST
    },
    {
        name: "Analytics",
        icon: "fas fa-user fa-3",
        link: "analytics",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_ANALYTICS_LIST
    },
    {
        name: "Fault Management",
        icon: "fas fa-user fa-3",
        link: "fault-mangement",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_FAULT_LIST
    },
    {
        name: "Netvelocity",
        icon: "fas fa-user fa-3",
        link: "net-velocity",
        eventName: 'sites-outdoor-esc',
        children: ADMIN_NETVELOCITY_LIST
    }
];

const USER_ADMINISTRATION_LIST = [
    {
        name: "Access Management",
        icon: "fas fa-user fa-3",
        link: "Access-Management",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Role Management",
        icon: "fas fa-user fa-3",
        link: "Role-Management",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Team Management",
        icon: "fas fa-user fa-3",
        link: "Team-Management",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "User Management",
        icon: "fas fa-user fa-3",
        link: "User-Management",
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: "Work Group Management",
        icon: "fas fa-user fa-3",
        link: "Work-Group-Management",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_ADMINISTRATION_LIST = [
    {
        name: "Dashboard",
        icon: "fas fa-user fa-3",
        link: "Dashboard",
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_DASHBOARD_LIST
    },
    {
        name: "Data Integrity Management",
        icon: "fas fa-user fa-3",
        link: "Data-Integrity-Management",
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_DATA_INTEGRITY_LIST
    },
    {
        name: "Workorders",
        icon: "fas fa-user fa-3",
        link: "Workorders",
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_WORKORDERS_LIST
    },
    {
        name: "Usage Analytics",
        icon: "fas fa-user fa-3",
        link: "Usage-Analytics",
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const PLATFORM_LAYER_LIST = [
    {
        name: "Point of Interest",
        icon: "fas fa-user fa-3",
        link: "Point-of-Interest",
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_POI_LIST
    }
];

const MODULES_LIST = [
    {
        name: 'Configuration Management',
        link: 'ConfigurationManagement',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_CONFIGURATION
    },
    {
        name: 'Analytics',
        link: 'analytics',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_ANALYTICS
    },
    {
        name: 'Fault Management',
        link: 'faultmanagement',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_FAULT
    },
    {
        name: 'Net Velocity',
        link: 'net-velocity',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_NET_VELOCITY
    },
    {
        name: 'Performance Management',
        link: 'performance-management',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_PERFORMANCE_MANAGEMENT
    },
    {
        name: 'Planning and Deployment',
        link: 'planning-deployment',
        eventName: 'sites-outdoor-esc',
        children: MODULE_LIST_PLANNING_DEPLOYMENT
    }
];

const LAYERS_LIST = [
    {
        name: "Sites",
        icon: "fas fa-users fa-3",
        link: "Sites",
        eventName: 'sites-outdoor-esc',
        children: SITES_LIST
    },
    {
        name: "Prediction Layers",
        icon: "fas fa-users fa-3",
        link: "Prediction-Layers",
        eventName: 'sites-outdoor-esc',
        children: PREDICTION_LAYERS_LIST,
        classId: 'prediction-layer-border'
    },
    {
        name: "Measured Layers",
        icon: "fas fa-users fa-3",
        link: "Measured-Layers",
        eventName: 'sites-outdoor-esc',
        children: MEASURED_LAYERS_LIST,
        classId: 'measured-layer-border'
    },
    {
        name: "Hybrid Layers",
        icon: "fas fa-users fa-3",
        link: "Hybrid-Layers",
        eventName: 'sites-outdoor-esc',
        children: HYBRID_LAYERS_LIST,
        classId: 'hybrid-layer-border'
    },
    {
        name: "Alarms",
        icon: "fas fa-users fa-3",
        link: "Alarms",
        eventName: 'sites-outdoor-esc',
        children: ALARMS_LIST,
        classId: 'alarms-border'

    },
    {
        name: "Analytics",
        icon: "fas fa-users fa-3",
        link: "Analytics",
        eventName: 'sites-outdoor-esc',
        children: ANALYTICS_LIST,
        classId: 'analytics-layer-border'
    },
    {
        name: "Topologies",
        icon: "fas fa-users fa-3",
        link: "Topologies",
        eventName: 'sites-outdoor-esc',
        children: TOPOLOGIES_LIST,
        classId: 'topologies-border'
    },
    {
        name: "Locations & Boundaries",
        icon: "fas fa-users fa-3",
        link: "Locations-and-Boundaries",
        eventName: 'sites-outdoor-esc',
        children: LOCATION_BOUNDRIES_LIST,
        classId: 'locations-border'
    },
    {
        name: "Base Maps",
        icon: "fas fa-users fa-3",
        link: "Base-Maps",
        eventName: 'sites-outdoor-esc',
        children: BASE_MAPS_LIST,
        classId: 'base-map-border'
    },
    {
        name: "My Layers",
        icon: "fas fa-users fa-3",
        link: "My-Layers",
        eventName: 'sites-outdoor-esc',
        children: MY_LAYERS_LIST,
        classId: 'my-layers-border'
    }
];

const DASHBOARD_LIST = [
    {
        name: "Custom Dashboards",
        icon: "fas fa-users fa-3",
        link: 'JCP/Reports-and-Dashboards/Dashboards',
        children: []
    }
];

const REPORTS_LIST = [
    {
        name: 'Report Wizard',
        link: 'JCP/Reports-and-Dashboards/Report-Wizard',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'My Reports',
        link: 'JCP/Reports-and-Dashboards/My-Reports',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Dashboards',
        link: 'dashboards',
        eventName: 'sites-outdoor-esc',
        children: DASHBOARD_LIST
    },
    {
        name: 'My Subscriptions',
        link: 'my-subscriptions',
        eventName: 'sites-outdoor-esc',
        children: []
    }
];

const WORKORDERS_RFOCWORKORDERS_CATEGORYWISEWOLISTING_LIST = [
    {
        name: 'Sector Misalignment',
        link: 'JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Overshooting Cell',
        link: 'JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Cell Decongestion',
        link: 'JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Cell-Decongestion',
        eventName: 'sites-outdoor-esc',
        children: []
    }
]

const WORKORDERS_RFOCWORKORDERS_LIST = [
    {
        name: 'Category Wise Workorder Listing',
        link: '',
        eventName: 'sites-outdoor-esc',
        children: WORKORDERS_RFOCWORKORDERS_CATEGORYWISEWOLISTING_LIST
    }
]

const WORKORDERS_LIST = [
    {
        name: 'My Workorders',
        link: 'my-workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'All Workorders',
        link: 'all-workorders',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'Reports',
        link: 'reports',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'DashBoards',
        link: 'dashboards',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'My Approvals',
        link: 'my-approvals',
        eventName: 'sites-outdoor-esc',
        children: []
    },
    {
        name: 'RF OC Workorders',
        link: '',
        eventName: 'sites-outdoor-esc',
        children: WORKORDERS_RFOCWORKORDERS_LIST
    }
];

const ADMINISTRATION_LIST = [
    {
        name: 'Module Management',
        link: 'module-management',
        eventName: 'sites-outdoor-esc',
        children: MODULE_ADMINISTRATION_LIST
    },
    {
        name: 'User Management',
        link: 'user-management',
        eventName: 'sites-outdoor-esc',
        children: USER_ADMINISTRATION_LIST
    },
    {
        name: 'Platform Management',
        link: 'platform-management',
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_ADMINISTRATION_LIST
    },
    {
        name: 'Layer Management',
        link: 'layer-mangement',
        eventName: 'sites-outdoor-esc',
        children: PLATFORM_LAYER_LIST
    }
];

export const LEFTSIDE_MENU_LIST = [
    {
        name: 'Home',
        link: 'JCP/Home',
        icon: 'ic ic-home-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: []
    },
    {
        name: 'Layers',
        link: 'JCP/Layers',
        icon: 'ic ic-layers-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: LAYERS_LIST
    },
    {
        name: 'Modules',
        link: 'Modules',
        icon: 'ic ic-modules-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: MODULES_LIST
    },
    {
        name: 'Reports & Dashboards',
        link: 'Reports & Dashboard',
        icon: 'ic ic-reports',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: REPORTS_LIST
    },
    {
        name: 'Work Orders',
        link: 'workorders',
        icon: 'ic ic-work_Order-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: WORKORDERS_LIST
    },
    {
        name: 'Administration',
        link: 'administration',
        icon: 'ic ic-administration-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: ADMINISTRATION_LIST
    },
    {
        name: 'My JCP',
        link: '/JCP/My-JCP',
        icon: 'ic ic-my_jcp-01',
        eventName: 'sites-outdoor-esc',
        level: 0,
        children: []
    }
];