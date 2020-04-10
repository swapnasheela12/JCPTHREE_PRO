export const menuListData=[
  {
    displayName: "Home",
    iconName: "fas fa-home",
    route: "portaljcp"
  },
  {
    displayName: "Layers",
    iconName: "fas fa-layer-group",
    route: "layer",
    children: [
      {
        displayName: "Sites",
        iconName: "group",
        route: "layer/sites",
        children: [
          {
            displayName: "Macro",
            iconName: "person",
            route: "layer/sites/macro"
          },
          {
            displayName: "Nominal",
            iconName: "person",
            route: "layer/sites/nominal"
          },
          {
            displayName: "On-Air",
            iconName: "person",
            route: "layer/sites/onair"
          }
        ]
      }
    ]
  },
  {
    displayName: "Report",
    iconName: "fa fa-file-alt",
    route: "Report"
  }
];
