const SITES_SITES_LIST_COVERAGE =[
    {
      name: "P1",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "RP1",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "IP Colo",
      icon: "fas fa-users fa-3",
      link: "ipcolo",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "Additional Candidates",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];
  
  const SITES_SITES_LIST_VALIDATION = [
    {
      name: "Nominals",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      componentLayer: 'MacroLayerComponent',
      children: []
    },
    {
      name: "Additional Candidates",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      componentLayer: 'MacroLayerComponent',
      children: []
    }
  ];

  const OPTIMIZATION_ONLY = [
    {
      name: "RSRP",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "SINR",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];

  const SELECTION_MODE = [
    {
      name: "Nominals",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "Additional Candidates",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];

  const OPTIMIZATION_SELECTION_MODE = [
    {
      name: "Nominals",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "Additional Candidates",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];

  const SITES_PREDICTION_LAYERS_LIST_VALIDATION = [
    {
      name: "Nominals",
      icon: "fas fa-users fa-3",
      link: "p1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "Additional Candidates",
      icon: "fas fa-users fa-3",
      link: "rp1",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];

  const SITES_PREDICTION_LAYERS_LIST_COVERAGE = [
    {
      name: "RSRP",
      icon: "fas fa-users fa-3",
      link: "rsrp",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "SINR",
      icon: "fas fa-users fa-3",
      link: "sinr",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "DL Throughput",
      icon: "fas fa-users fa-3",
      link: "dl-throughput",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    },
    {
      name: "Spectral Efficiency",
      icon: "fas fa-users fa-3",
      link: "Spectral-Efficiency",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: []
    }
  ];
  
  export const COVERAGE_PLANNING= [
    {
      name: "Sites",
      icon: "fas fa-users fa-3",
      link: "Sites",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: SITES_SITES_LIST_COVERAGE
    },
    {
        name: "Prediction Layers",
        icon: "fas fa-users fa-3",
        link: "Prediction-Layers",
        eventName: 'sites-outdoor-esc',
        show:true,
        children: SITES_PREDICTION_LAYERS_LIST_COVERAGE,
        classId: 'prediction-layer-border'
    }
  ];

  const Nominals = [
    {
        name: "Qualifying Area",
        icon: "fas fa-users fa-3",
        link: "Sites",
        eventName: 'sites-outdoor-esc',
        show:true,
        children: [],
        // componentLayer: 'CoveredAreaLayerComponent'
    },
    {
        name: "5G Covered Area",
        icon: "fas fa-users fa-3",
        link: "Prediction-Layers",
        eventName: 'sites-outdoor-esc',
        show:true,
        children: [],
        classId: 'prediction-layer-border',
        // componentLayer: 'CoveredAreaLayerComponent'
    }
  ]

  const CANDIDATE_LIST = [
    {
      name: "5G Macro",
      icon: "fas fa-users fa-3",
      link: "Sites",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: [],
      // componentLayer: 'MacroLayerComponent'
  },
  {
      name: "5G ODSC",
      icon: "fas fa-users fa-3",
      link: "Prediction-Layers",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: [],
      classId: 'prediction-layer-border',
      // componentLayer: 'OdscLayerComponent'
  }
  ];
  export const CAPACITY_PLANNING = [
    {
        name: "Nominals",
        icon: "fas fa-users fa-3",
        link: "Sites",
        eventName: 'sites-outdoor-esc',
        show:true,
        children: CANDIDATE_LIST
      },
      {
          name: "Polygons",
          icon: "fas fa-users fa-3",
          link: "Prediction-Layers",
          eventName: 'sites-outdoor-esc',
          show:true,
          children: Nominals,
          classId: 'prediction-layer-border'
      },
      {
        name: "Candidates",
        icon: "fas fa-users fa-3",
        link: "Prediction-Layers",
        eventName: 'sites-outdoor-esc',
        show:true,
        children: CANDIDATE_LIST,
        classId: 'prediction-layer-border'
    }
  ];

  export const VALIDATION_PLANNING = [
    {
      name: "Sites",
      icon: "fas fa-users fa-3",
      link: "Sites",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: SITES_SITES_LIST_VALIDATION
    },
    {
      name: "Prediction Layers",
      icon: "fas fa-users fa-3",
      link: "Prediction-Layers",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: SITES_PREDICTION_LAYERS_LIST_VALIDATION,
      classId: 'prediction-layer-border'
    },
    {
      name: "Optimization Only",
      icon: "fas fa-users fa-3",
      link: "Sites",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: OPTIMIZATION_ONLY
    },
    {
      name: "Selection Mode",
      icon: "fas fa-users fa-3",
      link: "Prediction-Layers",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: SELECTION_MODE,
      classId: 'prediction-layer-border'
    },
    {
      name: "Optimization + Selection",
      icon: "fas fa-users fa-3",
      link: "Prediction-Layers",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: OPTIMIZATION_SELECTION_MODE,
      classId: 'prediction-layer-border'
    }
  ]