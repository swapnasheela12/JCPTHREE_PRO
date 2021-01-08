export const OVERVIEW_COLDEFS = [
    {
        headerName: "Type",
        field: "type",
        width: 400
    },
    {
        headerName: "Structure Bifurcation",
        field: "bifurcation",
        width: 320
    },
    {
        headerName: "Structure Field Name",
        field: "field-name",
        width: 320
    }
];

export const PORTDETAILS_SPLITTER1 = [
    {
        headerName: "SOURCE DETAILS",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "Splitter1",
                headerClass: 'child-header',
                children: [
                    {
                        headerName: "SOURCE ENTITY (SPLITTER1)",
                        field: "source-entity",
                        width: 250
                    },
                    {
                        headerName: "SOURCE PORT ()",
                        field: "source-port",
                        width: 250
                    }
                ]
            }
        ]
    },
    {
        headerName: "DESTINATION DETAILS",
        headerClass: "text-align-group-header",
        width: 320,
        children: [
            {
                headerName: "OLT",
                headerClass: 'child-header',
                children: [
                    {
                        headerName: "DESTINATION ENTITY (OLT)",
                        field: "destination-entity",
                        width: 250
                    },
                    {
                        headerName: "DESTINATION PORT (OLT_PORT)",
                        field: "destination-port",
                        width: 250
                    }
                ]
            }
        ]
    }
]

export const STRUCTURE_DETAILS = [
    {
        headerName: "Object Id",
        field: "id",
        width: 400,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "Equipment Name",
        field: "eqipmentName",
        width: 320,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "Structure Name",
        field: "structureName",
        width: 320
    },
    {
        headerName: "RJ Network Entity Id",
        field: "rjEntityId",
        width: 320
    },
    {
        headerName: "RJ Device Code",
        field: "rjDeviceCode",
        width: 320
    },
    {
        headerName: "RJ Equipment RJID",
        field: "rjEquipmentRJID",
        width: 320
    }
]

export const EQUIPMENT_DETAILS = [
    {
        headerName: "Object Id",
        field: "OBJECT_ID",
        width: 200,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "Structure Name",
        field: "STRUCTURE_NAME",
        width: 250,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "RJ Network Id",
        field: "RJ_NETWORK_ID",
        width: 250,
        cellRenderer: ''
    },
    {
        headerName: "RJ Structure Type",
        field: "RJ_STRUCTURE_TYPE",
        width: 250
    },
    {
        headerName: "RJ Structure RJID",
        field: "RJ_STRUCTURE_RJID",
        width: 250
    }
]

export const AG2_PORT_DETAILS = [
    {
        headerName: "AG2 Source",
        field: "AG2_Source",
        width: 250
    },
    {
        headerName: "AG2 Source Port",
        field: "AG2_Source_Port",
        width: 250
    },
    {
        headerName: "AG2 Destination",
        field: "AG2_Destination",
        width: 250
    },
    {
        headerName: "AG2 Destination Port",
        field: "AG2_Destination_Port",
        width: 250
    },
    {
        headerName: "OLT NAME",
        field: "OLT_NAME",
        width: 250,
        cellRenderer: "anchorRenderer"

    },
    {
        headerName: "EAST/WEST_Side_OLT_Port",
        field: "EAST/WEST Side OLT Port",
        width: 250
    }
]

export const ONT_PORT = [
    {
        headerName: "Site Circle",
        field: "SITE_CIRCLE",
        width: 250
    },
    {
        headerName: "Site State",
        field: "SITE_STATE",
        width: 250
    },
    {
        headerName: "Jio Center",
        field: "JIO_CENTER",
        width: 250
    },
    {
        headerName: "Site City",
        field: "SITE_CITY",
        width: 250
    },
    {
        headerName: "Building Id",
        field: "Building_Id",
        width: 250
    },
    {
        headerName: "ONT Name",
        field: "ONT_NAME",
        width: 250
    },
    {
        headerName: "GPON Id",
        field: "GPON_ID",
        width: 250
    },
    {
        headerName: "MAC_Address",
        field: "MAC_Address",
        width: 250
    },
    {
        headerName: "ACS Serial Number",
        field: "ACS_Serial_Number",
        width: 250
    },
    {
        headerName: "ONT Description",
        field: "ONT_Description",
        width: 250
    },
    {
        headerName: "SPLITTER2 Name",
        field: "SPLITTER2_NAME",
        width: 250
    },
    {
        headerName: "A SP2 PORT",
        field: "A_SP2_PORT",
        width: 250,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "SPLITTER1 Name",
        field: "SPLITTER1_NAME",
        width: 250
    },
    {
        headerName: "A SP1 PORT",
        field: "A_SP1_PORT",
        width: 250
    },
    {
        headerName: "OLT Name",
        field: "OLT_NAME",
        width: 250
    },
    {
        headerName: "OLT Port",
        field: "OLT_PORT",
        width: 250,
        cellRenderer: "anchorRenderer"
    },
    {
        headerName: "EAST Side OLT port",
        field: "EAST_Side_OLT_port",
        width: 250
    },
    {
        headerName: "WEST_Side_OLT_port",
        field: "WEST_Side_OLT_port",
        width: 250
    },
    {
        headerName: "EAST Side Neighbor NE DeviceID",
        field: "EAST_Side_Neighbor_NE_DeviceID",
        width: 250
    },
    {
        headerName: "EAST Side Neighbor NE port",
        field: "EAST_Side_Neighbor_NE_port",
        width: 250
    },
    {
        headerName: "WEST Side Neighbor NE DeviceID",
        field: "WEST_Side_Neighbor_NE_DeviceID",
        width: 250
    },
    {
        headerName: "WEST Side Neighbor NE port",
        field: "WEST_Side_Neighbor_NE_port",
        width: 250
    }
]

export const OLT_PORT_WEST = [
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "OLT NAME",
                field: "OLT_NAME",
                width: 250
            },
            {
                headerName: "EAST Side OLT Port",
                field: "EAST_Side_OLT_Port",
                width: 250
            }
        ]

    },
    {
        headerName: "AG2",
        headerClass: "text-align-group-header",
        width: 320,

        children: [
            {
                headerName: "EAST Side Neighbor NEDeviceID",
                field: "EAST_Side_Neighbor_NE_DeviceID",
                width: 250
            },
            {
                headerName: "EAST Side Neighbor NE Port",
                field: "EAST_Side_Neighbor_NE_Port",
                width: 250
            }
        ]
    }
]

export const OLT_PORT_EAST = [
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "OLT NAME",
                field: "OLT_NAME",
                width: 250
            },
            {
                headerName: "WEST Side OLT Port",
                field: "WEST_Side_OLT_Port",
                width: 250
            }
        ]
    },
    {
        headerName: "AG2",
        headerClass: "text-align-group-header",
        width: 320,
        children: [
            {
                headerName: "WEST Side Neighbor NEDeviceID",
                field: "WEST_Side_Neighbor_NE_DeviceID",
                width: 250
            },
            {
                headerName: "WEST Side Neighbor NE Port",
                field: "WEST_Side_Neighbor_NE_Port",
                width: 250
            }
        ]
    }
]

export const OLT_PORT_SPLITTER = [
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 750,
        children: [
            {
                headerName: "OLT NAME",
                field: "OLT_NAME",
                width: 375
            }, {
                headerName: "OLT PORT",
                field: "OLT_PORT",
                width: 375
            }
        ]
    }, {
        headerName: "SPLITTER1",
        headerClass: "text-align-group-header",
        width: 250,
        children: [
            {
                headerName: "SPLITTER1 Name",
                field: "SPLITTER1_NAME",
                width: 250
            }
        ]
    }
]

export const SPLITTER1_OLT = [
    {
        headerName: "SPLITTER 1",
        headerClass: "text-align-group-header",
        width: 700,
        children: [
            {
                headerName: "SPLITTER1 Name",
                field: "SPLITTER1_NAME",
                width: 350
            },
            {
                headerName: "OLT Name",
                field: "OLT_NAME",
                width: 350,
                renderer: 'dropDownThreeDotRenderer'
            }
        ]
    }, {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 300,
        children: [
            {
                headerName: "OLT Port",
                field: "OLT_PORT",
                width: 300,
                renderer: 'dropDownThreeDotRenderer'
            }
        ]
    }
]

export const SPLITTER1_SPLITTER2 = [
    {
        headerName: "SPLITTER 1",
        headerClass: "text-align-group-header",
        width: 700,
        children: [
            {
                headerName: "SPLITTER1 Name",
                field: "SPLITTER1_NAME",
                width: 350
            },
            {
                headerName: "A SP1 PORT",
                field: "A_SP1_PORT",
                width: 350,
                cellRenderer: 'dropDownThreeDotRenderer'
            }
        ]
    },
    {
        headerName: "SPLITTER 2",
        headerClass: "text-align-group-header",
        width: 300,
        children: [
            {
                headerName: "SPLITTER2 Name",
                field: "SPLITTER2_NAME",
                width: 300,
                cellRenderer: 'dropDownThreeDotRenderer'
            }
        ]
    }
]

export const SPLITTER2_SPLITTER1 = [
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "SPLITTER2 Name",
                field: "SPLITTER2_NAME",
                width: 250
            }]
    },
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "SPLITTER1 Name",
                field: "SPLITTER1_NAME",
                width: 250,
                cellRenderer: 'buttonRenderer'
            },
            {
                headerName: "A SP1 PORT",
                field: "A_SP1_PORT",
                width: 250,
                cellRenderer: 'linkRenderer'
            }
        ]
    }
]

export const SPLITTER2_ONT = [
    {
        headerName: "SPLITTER 2",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "SPLITTER2 Name",
                field: "SPLITTER2_NAME",
                width: 250
            },
            {
                headerName: "A SP2 PORT",
                field: "A_SP2_PORT",
                width: 250,
                cellRenderer: 'linkRenderer'
            }
        ]
    },
    {
        headerName: "OLT",
        headerClass: "text-align-group-header",
        width: 500,
        children: [
            {
                headerName: "ONT Name",
                field: "ONT_NAME",
                width: 250
            },
            {
                headerName: "GPON Id",
                field: "GPON_ID",
                width: 250
            },
            {
                headerName: "MAC_Address",
                field: "MAC_Address",
                width: 250
            },
            {
                headerName: "ACS Serial Number",
                field: "ACS_Serial_Number",
                width: 250
            },
            {
                headerName: "ONT Description",
                field: "ONT_Description",
                width: 250
            },
            {
                headerName: "Site Circle",
                field: "SITE_CIRCLE",
                width: 250
            },
            {
                headerName: "Site State",
                field: "SITE_STATE",
                width: 250
            },
            {
                headerName: "Jio Center",
                field: "JIO_CENTER",
                width: 250
            },
            {
                headerName: "Site City",
                field: "SITE_CITY",
                width: 250
            },
            {
                headerName: "Building Id",
                field: "Building_Id",
                width: 250
            }
        ]
    }
]