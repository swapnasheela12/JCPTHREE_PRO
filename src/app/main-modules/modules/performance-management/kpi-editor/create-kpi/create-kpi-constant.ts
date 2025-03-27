
export interface dropdown {
    name: string;
    abbr: string;
}

export const DOMAIN: dropdown[] = [
    { name: 'All Zone', abbr: 'all' },
    { name: '5.0.0', abbr: '5.0.0' },
    { name: '6.0.0', abbr: '6.0.0' },
    { name: '1.3.1', abbr: '1.3.1' },
    { name: '6.1.0', abbr: '6.1.0' },
    { name: '7.9.0', abbr: '7.9.0' },
    { name: '5.0.1', abbr: '5.0.1' },
    { name: 'RAN', abbr: 'RAN' }
];

export const NODE: dropdown[] = [
    { name: 'Accessibility', abbr: 'accessibilty' },
    { name: 'Accessibility data per PLMN', abbr: 'accessibility' },
    { name: 'Accessibility data per PLMN test', abbr: 'accessibility_test' },
    { name: 'Active DRX', abbr: 'activedrx' },
    { name: 'Active DRX1', abbr: 'activedrx12' }
];

export const NodeAggr: dropdown[] = [
    { name: 'AVG', abbr: 'AVG' },
    { name: 'COUNT', abbr: 'COUNT' },
    { name: 'Max', abbr: 'Max' },
    { name: 'MIN', abbr: 'MIN' },
    { name: 'SUM', abbr: 'SUM' }
];

export const subcatAggr: dropdown[] = [
    { name: 'Min', abbr: 'Min' },
    { name: 'Max', abbr: 'Max' },
    { name: 'Avg', abbr: 'Avg' },
    { name: 'Sum', abbr: 'Sum' },
    { name: 'None', abbr: 'None' }
];

export const hierarchical: dropdown[] = [
    { name: 'Sector', abbr: 'Sector' },
    { name: 'ENodeB', abbr: 'ENodeB' },
    { name: 'Geography', abbr: 'Geography' }
];

export const AddFormula: dropdown[] = [
    { name: 'If-Else', abbr: 'If-Else' },
    { name: 'HextoDec', abbr: 'HextoDec' },
    { name: 'DectoHex', abbr: 'DectoHex', },
    { name: 'Ceiling', abbr: 'Ceiling' },
    { name: 'Floor', abbr: 'Floor' }
];