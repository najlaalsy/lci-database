/**
 * ISIC Rev. 5 classification hierarchy.
 * Source: United Nations, International Standard Industrial Classification
 * of All Economic Activities (ISIC), Revision 5, Part Two, Section B.
 *
 * This file contains classification data only. LCI datasets will be stored
 * separately and linked to one or more ISIC classes.
 */

export interface IsicClass {
  code: string;
  name: string;
}

export interface IsicGroup {
  code: string;
  name: string;
  classes: IsicClass[];
}

export interface IsicDivision {
  code: string;
  name: string;
  groups: IsicGroup[];
}

export interface IsicSection {
  code: string;
  name: string;
  divisions: IsicDivision[];
}

export const ISIC_REVISION = '5' as const;

export const isicRev5Sections: IsicSection[] = [
  {
    code: 'A',
    name: 'Agriculture, forestry and fishing',
    divisions: [
      {
        code: '01',
        name: 'Crop and animal production, hunting and related service activities',
        groups: [
          {
            code: '011',
            name: 'Growing of non-perennial crops',
            classes: [
              {
                code: '0111',
                name: 'Growing of cereals (except rice), leguminous crops and oil seeds',
              },
              {
                code: '0112',
                name: 'Growing of rice',
              },
              {
                code: '0113',
                name: 'Growing of vegetables and melons, roots and tubers',
              },
              {
                code: '0114',
                name: 'Growing of sugar cane',
              },
              {
                code: '0115',
                name: 'Growing of tobacco',
              },
              {
                code: '0116',
                name: 'Growing of fibre crops',
              },
              {
                code: '0119',
                name: 'Growing of other non-perennial crops',
              },
            ],
          },
          {
            code: '012',
            name: 'Growing of perennial crops',
            classes: [
              {
                code: '0121',
                name: 'Growing of grapes',
              },
              {
                code: '0122',
                name: 'Growing of tropical and subtropical fruits',
              },
              {
                code: '0123',
                name: 'Growing of citrus fruits',
              },
              {
                code: '0124',
                name: 'Growing of pome fruits and stone fruits',
              },
              {
                code: '0125',
                name: 'Growing of other tree and bush fruits and nuts',
              },
              {
                code: '0126',
                name: 'Growing of oleaginous fruits',
              },
              {
                code: '0127',
                name: 'Growing of beverage crops',
              },
              {
                code: '0128',
                name: 'Growing of spices, aromatic, drug and pharmaceutical crops',
              },
              {
                code: '0129',
                name: 'Growing of other perennial crops',
              },
            ],
          },
          {
            code: '013',
            name: 'Plant propagation',
            classes: [
              {
                code: '0130',
                name: 'Plant propagation',
              },
            ],
          },
          {
            code: '014',
            name: 'Animal production',
            classes: [
              {
                code: '0141',
                name: 'Raising of cattle and buffaloes',
              },
              {
                code: '0142',
                name: 'Raising of horses and other equines',
              },
              {
                code: '0143',
                name: 'Raising of camels and camelids',
              },
              {
                code: '0144',
                name: 'Raising of sheep and goats',
              },
              {
                code: '0145',
                name: 'Raising of swine and pigs',
              },
              {
                code: '0146',
                name: 'Raising of poultry',
              },
              {
                code: '0149',
                name: 'Raising of other animals',
              },
            ],
          },
          {
            code: '015',
            name: 'Mixed farming',
            classes: [
              {
                code: '0150',
                name: 'Mixed farming',
              },
            ],
          },
          {
            code: '016',
            name: 'Support activities to agriculture and post-harvest crop activities',
            classes: [
              {
                code: '0161',
                name: 'Support activities for crop production',
              },
              {
                code: '0162',
                name: 'Support activities for animal production',
              },
              {
                code: '0163',
                name: 'Post-harvest crop activities',
              },
              {
                code: '0164',
                name: 'Seed processing for propagation',
              },
            ],
          },
          {
            code: '017',
            name: 'Hunting, trapping and related service activities',
            classes: [
              {
                code: '0170',
                name: 'Hunting, trapping and related service activities',
              },
            ],
          },
        ],
      },
      {
        code: '02',
        name: 'Forestry and logging',
        groups: [
          {
            code: '021',
            name: 'Silviculture and other forestry activities',
            classes: [
              {
                code: '0210',
                name: 'Silviculture and other forestry activities',
              },
            ],
          },
          {
            code: '022',
            name: 'Logging',
            classes: [
              {
                code: '0220',
                name: 'Logging',
              },
            ],
          },
          {
            code: '023',
            name: 'Gathering of non-wood forest products',
            classes: [
              {
                code: '0230',
                name: 'Gathering of non-wood forest products',
              },
            ],
          },
          {
            code: '024',
            name: 'Support services to forestry',
            classes: [
              {
                code: '0240',
                name: 'Support services to forestry',
              },
            ],
          },
        ],
      },
      {
        code: '03',
        name: 'Fishing and aquaculture',
        groups: [
          {
            code: '031',
            name: 'Fishing',
            classes: [
              {
                code: '0311',
                name: 'Marine fishing',
              },
              {
                code: '0312',
                name: 'Freshwater fishing',
              },
            ],
          },
          {
            code: '032',
            name: 'Aquaculture',
            classes: [
              {
                code: '0321',
                name: 'Marine aquaculture',
              },
              {
                code: '0322',
                name: 'Freshwater aquaculture',
              },
            ],
          },
          {
            code: '033',
            name: 'Support activities for fishing and aquaculture',
            classes: [
              {
                code: '0330',
                name: 'Support activities for fishing and aquaculture',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'B',
    name: 'Mining and quarrying',
    divisions: [
      {
        code: '05',
        name: 'Mining of coal and lignite',
        groups: [
          {
            code: '051',
            name: 'Mining of hard coal',
            classes: [
              {
                code: '0510',
                name: 'Mining of hard coal',
              },
            ],
          },
          {
            code: '052',
            name: 'Mining of lignite',
            classes: [
              {
                code: '0520',
                name: 'Mining of lignite',
              },
            ],
          },
        ],
      },
      {
        code: '06',
        name: 'Extraction of crude petroleum and natural gas',
        groups: [
          {
            code: '061',
            name: 'Extraction of crude petroleum',
            classes: [
              {
                code: '0610',
                name: 'Extraction of crude petroleum',
              },
            ],
          },
          {
            code: '062',
            name: 'Extraction of natural gas',
            classes: [
              {
                code: '0620',
                name: 'Extraction of natural gas',
              },
            ],
          },
        ],
      },
      {
        code: '07',
        name: 'Mining of metal ores',
        groups: [
          {
            code: '071',
            name: 'Mining of iron ores',
            classes: [
              {
                code: '0710',
                name: 'Mining of iron ores',
              },
            ],
          },
          {
            code: '072',
            name: 'Mining of non-ferrous metal ores',
            classes: [
              {
                code: '0721',
                name: 'Mining of uranium and thorium ores',
              },
              {
                code: '0729',
                name: 'Mining of other non-ferrous metal ores',
              },
            ],
          },
        ],
      },
      {
        code: '08',
        name: 'Other mining and quarrying',
        groups: [
          {
            code: '081',
            name: 'Quarrying of stone, sand and clay',
            classes: [
              {
                code: '0810',
                name: 'Quarrying of stone, sand and clay',
              },
            ],
          },
          {
            code: '089',
            name: 'Mining and quarrying n.e.c.',
            classes: [
              {
                code: '0891',
                name: 'Mining of chemical and fertilizer minerals',
              },
              {
                code: '0892',
                name: 'Extraction of peat',
              },
              {
                code: '0893',
                name: 'Extraction of salt',
              },
              {
                code: '0899',
                name: 'Other mining and quarrying n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '09',
        name: 'Mining support service activities',
        groups: [
          {
            code: '091',
            name: 'Support activities for petroleum and natural gas extraction',
            classes: [
              {
                code: '0910',
                name: 'Support activities for petroleum and natural gas extraction',
              },
            ],
          },
          {
            code: '099',
            name: 'Support activities for other mining and quarrying',
            classes: [
              {
                code: '0990',
                name: 'Support activities for other mining and quarrying',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'C',
    name: 'Manufacturing',
    divisions: [
      {
        code: '10',
        name: 'Manufacture of food products',
        groups: [
          {
            code: '101',
            name: 'Processing and preserving of meat',
            classes: [
              {
                code: '1010',
                name: 'Processing and preserving of meat',
              },
            ],
          },
          {
            code: '102',
            name: 'Processing and preserving of fish, crustaceans and molluscs',
            classes: [
              {
                code: '1020',
                name: 'Processing and preserving of fish, crustaceans and molluscs',
              },
            ],
          },
          {
            code: '103',
            name: 'Processing and preserving of fruit and vegetables',
            classes: [
              {
                code: '1030',
                name: 'Processing and preserving of fruit and vegetables',
              },
            ],
          },
          {
            code: '104',
            name: 'Manufacture of vegetable and animal oils and fats',
            classes: [
              {
                code: '1040',
                name: 'Manufacture of vegetable and animal oils and fats',
              },
            ],
          },
          {
            code: '105',
            name: 'Manufacture of dairy products',
            classes: [
              {
                code: '1050',
                name: 'Manufacture of dairy products',
              },
            ],
          },
          {
            code: '106',
            name: 'Manufacture of grain mill products, starches and starch products',
            classes: [
              {
                code: '1061',
                name: 'Manufacture of grain mill products',
              },
              {
                code: '1062',
                name: 'Manufacture of starches and starch products',
              },
            ],
          },
          {
            code: '107',
            name: 'Manufacture of other food products',
            classes: [
              {
                code: '1071',
                name: 'Manufacture of bakery products',
              },
              {
                code: '1072',
                name: 'Manufacture of sugar',
              },
              {
                code: '1073',
                name: 'Manufacture of cocoa, chocolate and sugar confectionery',
              },
              {
                code: '1074',
                name: 'Manufacture of macaroni, noodles, couscous and similar farinaceous products',
              },
              {
                code: '1075',
                name: 'Manufacture of prepared meals and dishes',
              },
              {
                code: '1076',
                name: 'Processing of coffee and tea',
              },
              {
                code: '1079',
                name: 'Manufacture of other food products n.e.c.',
              },
            ],
          },
          {
            code: '108',
            name: 'Manufacture of prepared animal feeds',
            classes: [
              {
                code: '1080',
                name: 'Manufacture of prepared animal feeds',
              },
            ],
          },
        ],
      },
      {
        code: '11',
        name: 'Manufacture of beverages',
        groups: [
          {
            code: '110',
            name: 'Manufacture of beverages',
            classes: [
              {
                code: '1101',
                name: 'Distilling, rectifying and blending of spirits',
              },
              {
                code: '1102',
                name: 'Manufacture of wines',
              },
              {
                code: '1103',
                name: 'Manufacture of beer',
              },
              {
                code: '1104',
                name: 'Manufacture of malt',
              },
              {
                code: '1105',
                name: 'Manufacture of soft drinks; production of mineral waters and other bottled waters',
              },
            ],
          },
        ],
      },
      {
        code: '12',
        name: 'Manufacture of tobacco products',
        groups: [
          {
            code: '120',
            name: 'Manufacture of tobacco products',
            classes: [
              {
                code: '1200',
                name: 'Manufacture of tobacco products',
              },
            ],
          },
        ],
      },
      {
        code: '13',
        name: 'Manufacture of textiles',
        groups: [
          {
            code: '131',
            name: 'Spinning, weaving and finishing of textiles',
            classes: [
              {
                code: '1311',
                name: 'Preparation and spinning of textile fibres',
              },
              {
                code: '1312',
                name: 'Weaving of textiles',
              },
              {
                code: '1313',
                name: 'Finishing of textiles',
              },
            ],
          },
          {
            code: '139',
            name: 'Manufacture of other textiles',
            classes: [
              {
                code: '1391',
                name: 'Manufacture of knitted and crocheted fabrics',
              },
              {
                code: '1392',
                name: 'Manufacture of made-up textile articles, except apparel',
              },
              {
                code: '1393',
                name: 'Manufacture of carpets and rugs',
              },
              {
                code: '1394',
                name: 'Manufacture of cordage, rope, twine and netting',
              },
              {
                code: '1399',
                name: 'Manufacture of other textiles n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '14',
        name: 'Manufacture of wearing apparel',
        groups: [
          {
            code: '141',
            name: 'Manufacture of wearing apparel, except fur apparel',
            classes: [
              {
                code: '1410',
                name: 'Manufacture of wearing apparel, except fur apparel',
              },
            ],
          },
          {
            code: '142',
            name: 'Manufacture of articles of fur',
            classes: [
              {
                code: '1420',
                name: 'Manufacture of articles of fur',
              },
            ],
          },
          {
            code: '143',
            name: 'Manufacture of knitted and crocheted apparel',
            classes: [
              {
                code: '1430',
                name: 'Manufacture of knitted and crocheted apparel',
              },
            ],
          },
        ],
      },
      {
        code: '15',
        name: 'Manufacture of leather and related products',
        groups: [
          {
            code: '151',
            name: 'Tanning, dyeing, dressing of leather and fur; manufacture of luggage, handbags, saddlery and harness',
            classes: [
              {
                code: '1511',
                name: 'Tanning and dressing of leather; dressing and dyeing of fur',
              },
              {
                code: '1512',
                name: 'Manufacture of luggage, handbags and the like, saddlery and harness of any material',
              },
            ],
          },
          {
            code: '152',
            name: 'Manufacture of footwear',
            classes: [
              {
                code: '1520',
                name: 'Manufacture of footwear',
              },
            ],
          },
        ],
      },
      {
        code: '16',
        name: 'Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials',
        groups: [
          {
            code: '161',
            name: 'Sawmilling and planing of wood',
            classes: [
              {
                code: '1610',
                name: 'Sawmilling and planing of wood',
              },
            ],
          },
          {
            code: '162',
            name: 'Manufacture of products of wood, cork, straw and plaiting materials',
            classes: [
              {
                code: '1621',
                name: 'Manufacture of veneer sheets and wood-based panels',
              },
              {
                code: '1622',
                name: "Manufacture of builders' carpentry and joinery",
              },
              {
                code: '1623',
                name: 'Manufacture of wooden containers',
              },
              {
                code: '1629',
                name: 'Manufacture of other products of wood; manufacture of articles of cork, straw and plaiting materials',
              },
            ],
          },
        ],
      },
      {
        code: '17',
        name: 'Manufacture of paper and paper products',
        groups: [
          {
            code: '170',
            name: 'Manufacture of paper and paper products',
            classes: [
              {
                code: '1701',
                name: 'Manufacture of pulp, paper and paperboard',
              },
              {
                code: '1702',
                name: 'Manufacture of corrugated paper and paperboard and of containers of paper and paperboard',
              },
              {
                code: '1709',
                name: 'Manufacture of other articles of paper and paperboard',
              },
            ],
          },
        ],
      },
      {
        code: '18',
        name: 'Printing and reproduction of recorded media',
        groups: [
          {
            code: '181',
            name: 'Printing and service activities related to printing',
            classes: [
              {
                code: '1811',
                name: 'Printing',
              },
              {
                code: '1812',
                name: 'Service activities related to printing',
              },
            ],
          },
          {
            code: '182',
            name: 'Reproduction of recorded media',
            classes: [
              {
                code: '1820',
                name: 'Reproduction of recorded media',
              },
            ],
          },
        ],
      },
      {
        code: '19',
        name: 'Manufacture of coke and refined petroleum products',
        groups: [
          {
            code: '191',
            name: 'Manufacture of coke oven products',
            classes: [
              {
                code: '1910',
                name: 'Manufacture of coke oven products',
              },
            ],
          },
          {
            code: '192',
            name: 'Manufacture of refined petroleum products; manufacture of fossil fuel products',
            classes: [
              {
                code: '1920',
                name: 'Manufacture of refined petroleum products; manufacture of fossil fuel products',
              },
            ],
          },
        ],
      },
      {
        code: '20',
        name: 'Manufacture of chemicals and chemical products',
        groups: [
          {
            code: '201',
            name: 'Manufacture of basic chemicals, fertilizers and nitrogen compounds, plastics and synthetic rubber in primary forms',
            classes: [
              {
                code: '2011',
                name: 'Manufacture of basic chemicals',
              },
              {
                code: '2012',
                name: 'Manufacture of fertilizers and nitrogen compounds',
              },
              {
                code: '2013',
                name: 'Manufacture of plastics and synthetic rubber in primary forms',
              },
            ],
          },
          {
            code: '202',
            name: 'Manufacture of other chemical products',
            classes: [
              {
                code: '2021',
                name: 'Manufacture of pesticides and other agrochemical products',
              },
              {
                code: '2022',
                name: 'Manufacture of paints, varnishes and similar coatings, printing ink and mastics',
              },
              {
                code: '2023',
                name: 'Manufacture of soap and detergents, cleaning and polishing preparations, perfumes and toilet preparations',
              },
              {
                code: '2029',
                name: 'Manufacture of other chemical products n.e.c.',
              },
            ],
          },
          {
            code: '203',
            name: 'Manufacture of man-made fibres',
            classes: [
              {
                code: '2030',
                name: 'Manufacture of man-made fibres',
              },
            ],
          },
        ],
      },
      {
        code: '21',
        name: 'Manufacture of basic pharmaceutical products and pharmaceutical preparations',
        groups: [
          {
            code: '210',
            name: 'Manufacture of pharmaceuticals, medicinal chemical and botanical products',
            classes: [
              {
                code: '2100',
                name: 'Manufacture of pharmaceuticals, medicinal chemical and botanical products',
              },
            ],
          },
        ],
      },
      {
        code: '22',
        name: 'Manufacture of rubber and plastic products',
        groups: [
          {
            code: '221',
            name: 'Manufacture of rubber products',
            classes: [
              {
                code: '2211',
                name: 'Manufacture of rubber tyres and tubes; retreading and rebuilding of rubber tyres',
              },
              {
                code: '2219',
                name: 'Manufacture of other rubber products',
              },
            ],
          },
          {
            code: '222',
            name: 'Manufacture of plastics products',
            classes: [
              {
                code: '2220',
                name: 'Manufacture of plastics products',
              },
            ],
          },
        ],
      },
      {
        code: '23',
        name: 'Manufacture of other non-metallic mineral products',
        groups: [
          {
            code: '231',
            name: 'Manufacture of glass and glass products',
            classes: [
              {
                code: '2310',
                name: 'Manufacture of glass and glass products',
              },
            ],
          },
          {
            code: '239',
            name: 'Manufacture of non-metallic mineral products n.e.c.',
            classes: [
              {
                code: '2391',
                name: 'Manufacture of refractory products',
              },
              {
                code: '2392',
                name: 'Manufacture of clay building materials',
              },
              {
                code: '2393',
                name: 'Manufacture of other porcelain and ceramic products',
              },
              {
                code: '2394',
                name: 'Manufacture of cement, lime and plaster',
              },
              {
                code: '2395',
                name: 'Manufacture of articles of concrete, cement and plaster',
              },
              {
                code: '2396',
                name: 'Cutting, shaping and finishing of stone',
              },
              {
                code: '2399',
                name: 'Manufacture of other non-metallic mineral products n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '24',
        name: 'Manufacture of basic metals',
        groups: [
          {
            code: '241',
            name: 'Manufacture of basic iron and steel',
            classes: [
              {
                code: '2410',
                name: 'Manufacture of basic iron and steel',
              },
            ],
          },
          {
            code: '242',
            name: 'Manufacture of basic precious and other non-ferrous metals',
            classes: [
              {
                code: '2420',
                name: 'Manufacture of basic precious and other non-ferrous metals',
              },
            ],
          },
          {
            code: '243',
            name: 'Casting of metals',
            classes: [
              {
                code: '2431',
                name: 'Casting of iron and steel',
              },
              {
                code: '2432',
                name: 'Casting of non-ferrous metals',
              },
            ],
          },
        ],
      },
      {
        code: '25',
        name: 'Manufacture of fabricated metal products, except machinery and equipment',
        groups: [
          {
            code: '251',
            name: 'Manufacture of structural metal products, tanks, reservoirs and steam generators',
            classes: [
              {
                code: '2511',
                name: 'Manufacture of structural metal products',
              },
              {
                code: '2512',
                name: 'Manufacture of tanks, reservoirs and containers of metal',
              },
              {
                code: '2513',
                name: 'Manufacture of steam generators, except central heating hot water boilers',
              },
            ],
          },
          {
            code: '252',
            name: 'Manufacture of weapons and ammunition',
            classes: [
              {
                code: '2520',
                name: 'Manufacture of weapons and ammunition',
              },
            ],
          },
          {
            code: '259',
            name: 'Manufacture of other fabricated metal products; metalworking service activities',
            classes: [
              {
                code: '2591',
                name: 'Forging, pressing, stamping and roll-forming of metal; powder metallurgy',
              },
              {
                code: '2592',
                name: 'Treatment and coating of metals; machining',
              },
              {
                code: '2593',
                name: 'Manufacture of cutlery, hand tools and general hardware',
              },
              {
                code: '2599',
                name: 'Manufacture of other fabricated metal products n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '26',
        name: 'Manufacture of computer, electronic and optical products',
        groups: [
          {
            code: '261',
            name: 'Manufacture of electronic components and boards',
            classes: [
              {
                code: '2611',
                name: 'Manufacture of solar cells, solar panels and photovoltaic inverters',
              },
              {
                code: '2619',
                name: 'Manufacture of other electronic components and boards',
              },
            ],
          },
          {
            code: '262',
            name: 'Manufacture of computers and peripheral equipment',
            classes: [
              {
                code: '2620',
                name: 'Manufacture of computers and peripheral equipment',
              },
            ],
          },
          {
            code: '263',
            name: 'Manufacture of communication equipment',
            classes: [
              {
                code: '2630',
                name: 'Manufacture of communication equipment',
              },
            ],
          },
          {
            code: '264',
            name: 'Manufacture of consumer electronics',
            classes: [
              {
                code: '2640',
                name: 'Manufacture of consumer electronics',
              },
            ],
          },
          {
            code: '265',
            name: 'Manufacture of measuring, testing, navigating and control equipment; watches and clocks',
            classes: [
              {
                code: '2651',
                name: 'Manufacture of measuring, testing, navigating and control equipment',
              },
              {
                code: '2652',
                name: 'Manufacture of watches and clocks',
              },
            ],
          },
          {
            code: '266',
            name: 'Manufacture of irradiation, electromedical and electrotherapeutic equipment',
            classes: [
              {
                code: '2660',
                name: 'Manufacture of irradiation, electromedical and electrotherapeutic equipment',
              },
            ],
          },
          {
            code: '267',
            name: 'Manufacture of optical instruments and photographic equipment',
            classes: [
              {
                code: '2670',
                name: 'Manufacture of optical instruments and photographic equipment',
              },
            ],
          },
          {
            code: '268',
            name: 'Manufacture of magnetic and optical media',
            classes: [
              {
                code: '2680',
                name: 'Manufacture of magnetic and optical media',
              },
            ],
          },
        ],
      },
      {
        code: '27',
        name: 'Manufacture of electrical equipment',
        groups: [
          {
            code: '271',
            name: 'Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus',
            classes: [
              {
                code: '2710',
                name: 'Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus',
              },
            ],
          },
          {
            code: '272',
            name: 'Manufacture of batteries and accumulators',
            classes: [
              {
                code: '2720',
                name: 'Manufacture of batteries and accumulators',
              },
            ],
          },
          {
            code: '273',
            name: 'Manufacture of wiring and wiring devices',
            classes: [
              {
                code: '2731',
                name: 'Manufacture of fibre optic cables',
              },
              {
                code: '2732',
                name: 'Manufacture of other electronic and electric wires and cables',
              },
              {
                code: '2733',
                name: 'Manufacture of wiring devices',
              },
            ],
          },
          {
            code: '274',
            name: 'Manufacture of lighting equipment',
            classes: [
              {
                code: '2740',
                name: 'Manufacture of lighting equipment',
              },
            ],
          },
          {
            code: '275',
            name: 'Manufacture of domestic appliances',
            classes: [
              {
                code: '2750',
                name: 'Manufacture of domestic appliances',
              },
            ],
          },
          {
            code: '279',
            name: 'Manufacture of other electrical equipment',
            classes: [
              {
                code: '2790',
                name: 'Manufacture of other electrical equipment',
              },
            ],
          },
        ],
      },
      {
        code: '28',
        name: 'Manufacture of machinery and equipment n.e.c.',
        groups: [
          {
            code: '281',
            name: 'Manufacture of general-purpose machinery',
            classes: [
              {
                code: '2811',
                name: 'Manufacture of engines and turbines, except aircraft, vehicle and cycle engines',
              },
              {
                code: '2812',
                name: 'Manufacture of fluid power equipment',
              },
              {
                code: '2813',
                name: 'Manufacture of other pumps, compressors, taps and valves',
              },
              {
                code: '2814',
                name: 'Manufacture of bearings, gears, gearing and driving elements',
              },
              {
                code: '2815',
                name: 'Manufacture of ovens, furnaces and permanent household heating equipment',
              },
              {
                code: '2816',
                name: 'Manufacture of lifting and handling equipment',
              },
              {
                code: '2817',
                name: 'Manufacture of office machinery and equipment (except computers and peripheral equipment)',
              },
              {
                code: '2818',
                name: 'Manufacture of power-driven hand tools',
              },
              {
                code: '2819',
                name: 'Manufacture of other general-purpose machinery',
              },
            ],
          },
          {
            code: '282',
            name: 'Manufacture of special-purpose machinery',
            classes: [
              {
                code: '2821',
                name: 'Manufacture of agricultural and forestry machinery',
              },
              {
                code: '2822',
                name: 'Manufacture of metal-forming machinery and machine tools',
              },
              {
                code: '2823',
                name: 'Manufacture of machinery for metallurgy',
              },
              {
                code: '2824',
                name: 'Manufacture of machinery for mining, quarrying and construction',
              },
              {
                code: '2825',
                name: 'Manufacture of machinery for food, beverage and tobacco processing',
              },
              {
                code: '2826',
                name: 'Manufacture of machinery for textile, apparel and leather production',
              },
              {
                code: '2829',
                name: 'Manufacture of other special-purpose machinery',
              },
            ],
          },
        ],
      },
      {
        code: '29',
        name: 'Manufacture of motor vehicles, trailers and semi-trailers',
        groups: [
          {
            code: '291',
            name: 'Manufacture of motor vehicles',
            classes: [
              {
                code: '2910',
                name: 'Manufacture of motor vehicles',
              },
            ],
          },
          {
            code: '292',
            name: 'Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers',
            classes: [
              {
                code: '2920',
                name: 'Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers',
              },
            ],
          },
          {
            code: '293',
            name: 'Manufacture of parts and accessories for motor vehicles',
            classes: [
              {
                code: '2930',
                name: 'Manufacture of parts and accessories for motor vehicles',
              },
            ],
          },
        ],
      },
      {
        code: '30',
        name: 'Manufacture of other transport equipment',
        groups: [
          {
            code: '301',
            name: 'Building of ships and boats',
            classes: [
              {
                code: '3011',
                name: 'Building of ships and floating structures',
              },
              {
                code: '3012',
                name: 'Building of pleasure and sporting boats',
              },
            ],
          },
          {
            code: '302',
            name: 'Manufacture of railway locomotives and rolling stock',
            classes: [
              {
                code: '3020',
                name: 'Manufacture of railway locomotives and rolling stock',
              },
            ],
          },
          {
            code: '303',
            name: 'Manufacture of air and spacecraft and related machinery',
            classes: [
              {
                code: '3030',
                name: 'Manufacture of air and spacecraft and related machinery',
              },
            ],
          },
          {
            code: '304',
            name: 'Manufacture of military fighting vehicles',
            classes: [
              {
                code: '3040',
                name: 'Manufacture of military fighting vehicles',
              },
            ],
          },
          {
            code: '309',
            name: 'Manufacture of transport equipment n.e.c.',
            classes: [
              {
                code: '3091',
                name: 'Manufacture of motorcycles',
              },
              {
                code: '3092',
                name: 'Manufacture of bicycles and invalid carriages',
              },
              {
                code: '3099',
                name: 'Manufacture of other transport equipment n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '31',
        name: 'Manufacture of furniture',
        groups: [
          {
            code: '310',
            name: 'Manufacture of furniture',
            classes: [
              {
                code: '3101',
                name: 'Manufacture of wooden furniture',
              },
              {
                code: '3102',
                name: 'Manufacture of other furniture',
              },
            ],
          },
        ],
      },
      {
        code: '32',
        name: 'Other manufacturing',
        groups: [
          {
            code: '321',
            name: 'Manufacture of jewellery, bijouterie and related articles',
            classes: [
              {
                code: '3211',
                name: 'Manufacture of jewellery and related articles',
              },
              {
                code: '3212',
                name: 'Manufacture of imitation jewellery and related articles',
              },
            ],
          },
          {
            code: '322',
            name: 'Manufacture of musical instruments',
            classes: [
              {
                code: '3220',
                name: 'Manufacture of musical instruments',
              },
            ],
          },
          {
            code: '323',
            name: 'Manufacture of sports goods',
            classes: [
              {
                code: '3230',
                name: 'Manufacture of sports goods',
              },
            ],
          },
          {
            code: '324',
            name: 'Manufacture of games and toys',
            classes: [
              {
                code: '3240',
                name: 'Manufacture of games and toys',
              },
            ],
          },
          {
            code: '325',
            name: 'Manufacture of medical and dental instruments and supplies',
            classes: [
              {
                code: '3250',
                name: 'Manufacture of medical and dental instruments and supplies',
              },
            ],
          },
          {
            code: '329',
            name: 'Other manufacturing n.e.c.',
            classes: [
              {
                code: '3290',
                name: 'Other manufacturing n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '33',
        name: 'Repair, maintenance and installation of machinery and equipment',
        groups: [
          {
            code: '331',
            name: 'Repair and maintenance of fabricated metal products, machinery and equipment',
            classes: [
              {
                code: '3311',
                name: 'Repair and maintenance of fabricated metal products',
              },
              {
                code: '3312',
                name: 'Repair and maintenance of machinery',
              },
              {
                code: '3313',
                name: 'Repair and maintenance of electronic and optical equipment',
              },
              {
                code: '3314',
                name: 'Repair and maintenance of electrical equipment',
              },
              {
                code: '3315',
                name: 'Repair and maintenance of transport equipment, except motor vehicles',
              },
              {
                code: '3319',
                name: 'Repair and maintenance of other equipment',
              },
            ],
          },
          {
            code: '332',
            name: 'Installation of industrial machinery and equipment',
            classes: [
              {
                code: '3320',
                name: 'Installation of industrial machinery and equipment',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'D',
    name: 'Electricity, gas, steam and air conditioning supply',
    divisions: [
      {
        code: '35',
        name: 'Electricity, gas, steam and air conditioning supply',
        groups: [
          {
            code: '351',
            name: 'Electric power generation, transmission and distribution activities',
            classes: [
              {
                code: '3511',
                name: 'Electric power generation activities from non-renewable sources',
              },
              {
                code: '3512',
                name: 'Electric power generation activities from renewable sources',
              },
              {
                code: '3513',
                name: 'Electric power transmission and distribution activities',
              },
            ],
          },
          {
            code: '352',
            name: 'Manufacture of gas; distribution of gaseous fuels through mains',
            classes: [
              {
                code: '3520',
                name: 'Manufacture of gas; distribution of gaseous fuels through mains',
              },
            ],
          },
          {
            code: '353',
            name: 'Steam and air conditioning supply',
            classes: [
              {
                code: '3530',
                name: 'Steam and air conditioning supply',
              },
            ],
          },
          {
            code: '354',
            name: 'Activities of brokers and agents for electric power and natural gas',
            classes: [
              {
                code: '3540',
                name: 'Activities of brokers and agents for electric power and natural gas',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'E',
    name: 'Water supply; sewerage, waste management and remediation activities',
    divisions: [
      {
        code: '36',
        name: 'Water collection, treatment and supply',
        groups: [
          {
            code: '360',
            name: 'Water collection, treatment and supply',
            classes: [
              {
                code: '3600',
                name: 'Water collection, treatment and supply',
              },
            ],
          },
        ],
      },
      {
        code: '37',
        name: 'Sewerage',
        groups: [
          {
            code: '370',
            name: 'Sewerage',
            classes: [
              {
                code: '3700',
                name: 'Sewerage',
              },
            ],
          },
        ],
      },
      {
        code: '38',
        name: 'Waste collection, treatment and disposal, and recovery activities',
        groups: [
          {
            code: '381',
            name: 'Waste collection activities',
            classes: [
              {
                code: '3811',
                name: 'Collection of non-hazardous waste',
              },
              {
                code: '3812',
                name: 'Collection of hazardous waste',
              },
            ],
          },
          {
            code: '382',
            name: 'Waste treatment and disposal',
            classes: [
              {
                code: '3821',
                name: 'Treatment and disposal of non-hazardous waste',
              },
              {
                code: '3822',
                name: 'Treatment and disposal of hazardous waste',
              },
            ],
          },
          {
            code: '383',
            name: 'Materials and other waste recovery',
            classes: [
              {
                code: '3830',
                name: 'Materials and other waste recovery',
              },
            ],
          },
        ],
      },
      {
        code: '39',
        name: 'Remediation and other waste management service activities',
        groups: [
          {
            code: '390',
            name: 'Remediation and other waste management service activities',
            classes: [
              {
                code: '3900',
                name: 'Remediation and other waste management service activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'F',
    name: 'Construction',
    divisions: [
      {
        code: '41',
        name: 'Construction of residential and non-residential buildings',
        groups: [
          {
            code: '410',
            name: 'Construction of residential and non-residential buildings',
            classes: [
              {
                code: '4100',
                name: 'Construction of residential and non-residential buildings',
              },
            ],
          },
        ],
      },
      {
        code: '42',
        name: 'Civil engineering',
        groups: [
          {
            code: '421',
            name: 'Construction of roads and railways',
            classes: [
              {
                code: '4210',
                name: 'Construction of roads and railways',
              },
            ],
          },
          {
            code: '422',
            name: 'Construction of utility projects',
            classes: [
              {
                code: '4220',
                name: 'Construction of utility projects',
              },
            ],
          },
          {
            code: '429',
            name: 'Construction of other civil engineering projects',
            classes: [
              {
                code: '4290',
                name: 'Construction of other civil engineering projects',
              },
            ],
          },
        ],
      },
      {
        code: '43',
        name: 'Specialized construction activities',
        groups: [
          {
            code: '431',
            name: 'Demolition and site preparation',
            classes: [
              {
                code: '4311',
                name: 'Demolition',
              },
              {
                code: '4312',
                name: 'Site preparation',
              },
            ],
          },
          {
            code: '432',
            name: 'Electrical, plumbing and other construction installation activities',
            classes: [
              {
                code: '4321',
                name: 'Electrical installation',
              },
              {
                code: '4322',
                name: 'Plumbing, heat and air-conditioning installation',
              },
              {
                code: '4329',
                name: 'Other construction installation',
              },
            ],
          },
          {
            code: '433',
            name: 'Building completion and finishing',
            classes: [
              {
                code: '4330',
                name: 'Building completion and finishing',
              },
            ],
          },
          {
            code: '434',
            name: 'Intermediation service activities for specialized construction services',
            classes: [
              {
                code: '4340',
                name: 'Intermediation service activities for specialized construction services',
              },
            ],
          },
          {
            code: '439',
            name: 'Other specialized construction activities',
            classes: [
              {
                code: '4390',
                name: 'Other specialized construction activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'G',
    name: 'Wholesale and retail trade',
    divisions: [
      {
        code: '46',
        name: 'Wholesale trade',
        groups: [
          {
            code: '461',
            name: 'Wholesale on a fee or contract basis',
            classes: [
              {
                code: '4610',
                name: 'Wholesale on a fee or contract basis',
              },
            ],
          },
          {
            code: '462',
            name: 'Wholesale of agricultural raw materials and live animals',
            classes: [
              {
                code: '4620',
                name: 'Wholesale of agricultural raw materials and live animals',
              },
            ],
          },
          {
            code: '463',
            name: 'Wholesale of food, beverages and tobacco',
            classes: [
              {
                code: '4630',
                name: 'Wholesale of food, beverages and tobacco',
              },
            ],
          },
          {
            code: '464',
            name: 'Wholesale of household goods',
            classes: [
              {
                code: '4641',
                name: 'Wholesale of textiles, clothing and footwear',
              },
              {
                code: '4642',
                name: 'Wholesale of household, office and shop furniture, carpets and lighting equipment',
              },
              {
                code: '4649',
                name: 'Wholesale of other household goods',
              },
            ],
          },
          {
            code: '465',
            name: 'Wholesale of machinery, equipment and supplies',
            classes: [
              {
                code: '4651',
                name: 'Wholesale of computers, computer peripheral equipment and software',
              },
              {
                code: '4652',
                name: 'Wholesale of electronic and telecommunications equipment and parts',
              },
              {
                code: '4653',
                name: 'Wholesale of agricultural machinery, equipment and supplies',
              },
              {
                code: '4659',
                name: 'Wholesale of other machinery and equipment',
              },
            ],
          },
          {
            code: '466',
            name: 'Wholesale of motor vehicles, motorcycles and related parts and accessories',
            classes: [
              {
                code: '4661',
                name: 'Wholesale of motor vehicles',
              },
              {
                code: '4662',
                name: 'Wholesale of motor vehicle parts and accessories',
              },
              {
                code: '4663',
                name: 'Wholesale of motorcycles, motorcycle parts and accessories',
              },
            ],
          },
          {
            code: '467',
            name: 'Other specialized wholesale',
            classes: [
              {
                code: '4671',
                name: 'Wholesale of solid, liquid and gaseous fuels and related products',
              },
              {
                code: '4672',
                name: 'Wholesale of metals and metal ores',
              },
              {
                code: '4673',
                name: 'Wholesale of construction materials, hardware, plumbing and heating equipment and supplies',
              },
              {
                code: '4679',
                name: 'Wholesale of chemicals, waste and scrap and other products n.e.c.',
              },
            ],
          },
          {
            code: '469',
            name: 'Non-specialized wholesale trade',
            classes: [
              {
                code: '4690',
                name: 'Non-specialized wholesale trade',
              },
            ],
          },
        ],
      },
      {
        code: '47',
        name: 'Retail trade',
        groups: [
          {
            code: '471',
            name: 'Non-specialized retail sale',
            classes: [
              {
                code: '4711',
                name: 'Non-specialized retail sale with food, beverages or tobacco predominating',
              },
              {
                code: '4719',
                name: 'Other non-specialized retail sale',
              },
            ],
          },
          {
            code: '472',
            name: 'Retail sale of food, beverages and tobacco',
            classes: [
              {
                code: '4721',
                name: 'Retail sale of food',
              },
              {
                code: '4722',
                name: 'Retail sale of beverages',
              },
              {
                code: '4723',
                name: 'Retail sale of tobacco products',
              },
            ],
          },
          {
            code: '473',
            name: 'Retail sale of automotive fuel',
            classes: [
              {
                code: '4730',
                name: 'Retail sale of automotive fuel',
              },
            ],
          },
          {
            code: '474',
            name: 'Retail sale of information and communication equipment',
            classes: [
              {
                code: '4740',
                name: 'Retail sale of information and communication equipment',
              },
            ],
          },
          {
            code: '475',
            name: 'Retail sale of other household equipment',
            classes: [
              {
                code: '4751',
                name: 'Retail sale of textiles',
              },
              {
                code: '4752',
                name: 'Retail sale of hardware, building materials, paints and glass',
              },
              {
                code: '4753',
                name: 'Retail sale of carpets, rugs, wall and floor coverings',
              },
              {
                code: '4759',
                name: 'Retail sale of electrical household appliances, furniture, lighting equipment and other household articles',
              },
            ],
          },
          {
            code: '476',
            name: 'Retail sale of cultural and recreational goods',
            classes: [
              {
                code: '4761',
                name: 'Retail sale of books, newspapers, stationery and office supplies',
              },
              {
                code: '4762',
                name: 'Retail sale of sporting equipment',
              },
              {
                code: '4763',
                name: 'Retail sale of games and toys',
              },
              {
                code: '4769',
                name: 'Retail sale of cultural and recreational goods n.e.c.',
              },
            ],
          },
          {
            code: '477',
            name: 'Retail sale of other goods, except motor vehicles and motorcycles',
            classes: [
              {
                code: '4771',
                name: 'Retail sale of clothing, footwear and leather articles',
              },
              {
                code: '4772',
                name: 'Retail sale of pharmaceutical and medical goods, cosmetic and toilet articles',
              },
              {
                code: '4773',
                name: 'Retail sale of other new goods n.e.c.',
              },
              {
                code: '4774',
                name: 'Retail sale of second-hand goods',
              },
            ],
          },
          {
            code: '478',
            name: 'Retail sale of motor vehicles, motorcycles and related parts and accessories',
            classes: [
              {
                code: '4781',
                name: 'Retail sale of motor vehicles',
              },
              {
                code: '4782',
                name: 'Retail sale of motor vehicle parts and accessories',
              },
              {
                code: '4783',
                name: 'Retail sale of motorcycles, motorcycles parts and accessories',
              },
            ],
          },
          {
            code: '479',
            name: 'Intermediation service activities for retail sale',
            classes: [
              {
                code: '4790',
                name: 'Intermediation service activities for retail sale',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'H',
    name: 'Transportation and storage',
    divisions: [
      {
        code: '49',
        name: 'Land transport and transport via pipelines',
        groups: [
          {
            code: '491',
            name: 'Transport via railways',
            classes: [
              {
                code: '4911',
                name: 'Passenger rail transport, interurban',
              },
              {
                code: '4912',
                name: 'Freight rail transport',
              },
            ],
          },
          {
            code: '492',
            name: 'Other land transport',
            classes: [
              {
                code: '4921',
                name: 'Urban and suburban passenger land transport',
              },
              {
                code: '4922',
                name: 'Other passenger land transport',
              },
              {
                code: '4923',
                name: 'Freight transport by road',
              },
            ],
          },
          {
            code: '493',
            name: 'Transport via pipeline',
            classes: [
              {
                code: '4930',
                name: 'Transport via pipeline',
              },
            ],
          },
        ],
      },
      {
        code: '50',
        name: 'Water transport',
        groups: [
          {
            code: '501',
            name: 'Sea and coastal water transport',
            classes: [
              {
                code: '5011',
                name: 'Sea and coastal passenger water transport',
              },
              {
                code: '5012',
                name: 'Sea and coastal freight water transport',
              },
            ],
          },
          {
            code: '502',
            name: 'Inland water transport',
            classes: [
              {
                code: '5021',
                name: 'Inland passenger water transport',
              },
              {
                code: '5022',
                name: 'Inland freight water transport',
              },
            ],
          },
        ],
      },
      {
        code: '51',
        name: 'Air transport',
        groups: [
          {
            code: '511',
            name: 'Passenger air transport',
            classes: [
              {
                code: '5110',
                name: 'Passenger air transport',
              },
            ],
          },
          {
            code: '512',
            name: 'Freight air transport',
            classes: [
              {
                code: '5120',
                name: 'Freight air transport',
              },
            ],
          },
        ],
      },
      {
        code: '52',
        name: 'Warehousing and support activities for transportation',
        groups: [
          {
            code: '521',
            name: 'Warehousing and storage',
            classes: [
              {
                code: '5210',
                name: 'Warehousing and storage',
              },
            ],
          },
          {
            code: '522',
            name: 'Support activities for transportation',
            classes: [
              {
                code: '5221',
                name: 'Service activities incidental to land transportation',
              },
              {
                code: '5222',
                name: 'Service activities incidental to water transportation',
              },
              {
                code: '5223',
                name: 'Service activities incidental to air transportation',
              },
              {
                code: '5224',
                name: 'Cargo handling',
              },
              {
                code: '5229',
                name: 'Other support activities for transportation',
              },
            ],
          },
          {
            code: '523',
            name: 'Intermediation service activities for transportation',
            classes: [
              {
                code: '5231',
                name: 'Intermediation service activities for freight transportation',
              },
              {
                code: '5232',
                name: 'Intermediation service activities for passenger transportation',
              },
            ],
          },
        ],
      },
      {
        code: '53',
        name: 'Postal and courier activities',
        groups: [
          {
            code: '531',
            name: 'Postal activities',
            classes: [
              {
                code: '5310',
                name: 'Postal activities',
              },
            ],
          },
          {
            code: '532',
            name: 'Courier activities',
            classes: [
              {
                code: '5320',
                name: 'Courier activities',
              },
            ],
          },
          {
            code: '533',
            name: 'Intermediation service activities for postal and courier activities',
            classes: [
              {
                code: '5330',
                name: 'Intermediation service activities for postal and courier activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'I',
    name: 'Accommodation and food service activities',
    divisions: [
      {
        code: '55',
        name: 'Accommodation',
        groups: [
          {
            code: '551',
            name: 'Hotels and similar accommodation activities',
            classes: [
              {
                code: '5510',
                name: 'Hotels and similar accommodation activities',
              },
            ],
          },
          {
            code: '552',
            name: 'Other short term accommodation activities',
            classes: [
              {
                code: '5520',
                name: 'Other short term accommodation activities',
              },
            ],
          },
          {
            code: '553',
            name: 'Camping grounds, recreational vehicle parks and trailer parks',
            classes: [
              {
                code: '5530',
                name: 'Camping grounds, recreational vehicle parks and trailer parks',
              },
            ],
          },
          {
            code: '554',
            name: 'Intermediation service activities for accommodation',
            classes: [
              {
                code: '5540',
                name: 'Intermediation service activities for accommodation',
              },
            ],
          },
          {
            code: '559',
            name: 'Other accommodation n.e.c.',
            classes: [
              {
                code: '5590',
                name: 'Other accommodation n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '56',
        name: 'Food and beverage service activities',
        groups: [
          {
            code: '561',
            name: 'Restaurants and mobile food service activities',
            classes: [
              {
                code: '5610',
                name: 'Restaurants and mobile food service activities',
              },
            ],
          },
          {
            code: '562',
            name: 'Event catering and other food service activities',
            classes: [
              {
                code: '5621',
                name: 'Event catering activities',
              },
              {
                code: '5629',
                name: 'Other food service activities',
              },
            ],
          },
          {
            code: '563',
            name: 'Beverage serving activities',
            classes: [
              {
                code: '5630',
                name: 'Beverage serving activities',
              },
            ],
          },
          {
            code: '564',
            name: 'Intermediation service activities for food and beverage services activities',
            classes: [
              {
                code: '5640',
                name: 'Intermediation service activities for food and beverage services activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'J',
    name: 'Publishing, broadcasting, and content production and distribution activities',
    divisions: [
      {
        code: '58',
        name: 'Publishing activities',
        groups: [
          {
            code: '581',
            name: 'Publishing of books, newspapers, periodicals and other publishing activities',
            classes: [
              {
                code: '5811',
                name: 'Publishing of books',
              },
              {
                code: '5812',
                name: 'Publishing of newspapers',
              },
              {
                code: '5813',
                name: 'Publishing of journals and periodicals',
              },
              {
                code: '5819',
                name: 'Other publishing activities',
              },
            ],
          },
          {
            code: '582',
            name: 'Software publishing',
            classes: [
              {
                code: '5821',
                name: 'Publishing of video games',
              },
              {
                code: '5829',
                name: 'Other software publishing',
              },
            ],
          },
        ],
      },
      {
        code: '59',
        name: 'Motion picture, video and television programme production, sound recording and music publishing activities',
        groups: [
          {
            code: '591',
            name: 'Motion picture, video and television programme activities',
            classes: [
              {
                code: '5911',
                name: 'Motion picture, video and television programme production activities',
              },
              {
                code: '5912',
                name: 'Motion picture, video and television programme post-production activities',
              },
              {
                code: '5913',
                name: 'Motion picture, video and television programme distribution activities',
              },
              {
                code: '5914',
                name: 'Motion picture projection activities',
              },
            ],
          },
          {
            code: '592',
            name: 'Sound recording and music publishing activities',
            classes: [
              {
                code: '5920',
                name: 'Sound recording and music publishing activities',
              },
            ],
          },
        ],
      },
      {
        code: '60',
        name: 'Programming, broadcasting, news agency and other content distribution activities',
        groups: [
          {
            code: '601',
            name: 'Radio broadcasting and audio distribution activities',
            classes: [
              {
                code: '6010',
                name: 'Radio broadcasting and audio distribution activities',
              },
            ],
          },
          {
            code: '602',
            name: 'Television programming, broadcasting and video distribution activities',
            classes: [
              {
                code: '6020',
                name: 'Television programming, broadcasting and video distribution activities',
              },
            ],
          },
          {
            code: '603',
            name: 'News agency and other content distribution activities',
            classes: [
              {
                code: '6031',
                name: 'News agency activities',
              },
              {
                code: '6039',
                name: 'Social network sites and other content distribution activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'K',
    name: 'Telecommunications, computer programming, consultancy, computing infrastructure, and other information service activities',
    divisions: [
      {
        code: '61',
        name: 'Telecommunications',
        groups: [
          {
            code: '611',
            name: 'Wired, wireless, and satellite telecommunication activities',
            classes: [
              {
                code: '6110',
                name: 'Wired, wireless, and satellite telecommunication activities',
              },
            ],
          },
          {
            code: '612',
            name: 'Telecommunication reselling activities and intermediation service activities for telecommunication',
            classes: [
              {
                code: '6120',
                name: 'Telecommunication reselling activities and intermediation service activities for telecommunication',
              },
            ],
          },
          {
            code: '619',
            name: 'Other telecommunication activities',
            classes: [
              {
                code: '6190',
                name: 'Other telecommunication activities',
              },
            ],
          },
        ],
      },
      {
        code: '62',
        name: 'Computer programming, consultancy and related activities',
        groups: [
          {
            code: '621',
            name: 'Computer programming activities',
            classes: [
              {
                code: '6211',
                name: 'Development of video games, video game software, and video game software tools',
              },
              {
                code: '6219',
                name: 'Other computer programming activities',
              },
            ],
          },
          {
            code: '622',
            name: 'Computer consultancy and computer facilities management activities',
            classes: [
              {
                code: '6220',
                name: 'Computer consultancy and computer facilities management activities',
              },
            ],
          },
          {
            code: '629',
            name: 'Other information technology and computer service activities',
            classes: [
              {
                code: '6290',
                name: 'Other information technology and computer service activities',
              },
            ],
          },
        ],
      },
      {
        code: '63',
        name: 'Computing infrastructure, data processing, hosting, and other information service activities',
        groups: [
          {
            code: '631',
            name: 'Computing infrastructure, data processing, hosting and related activities',
            classes: [
              {
                code: '6310',
                name: 'Computing infrastructure, data processing, hosting and related activities',
              },
            ],
          },
          {
            code: '639',
            name: 'Web search portals activities and other information service activities',
            classes: [
              {
                code: '6390',
                name: 'Web search portals activities and other information service activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'L',
    name: 'Financial and insurance activities',
    divisions: [
      {
        code: '64',
        name: 'Financial service activities, except insurance and pension funding',
        groups: [
          {
            code: '641',
            name: 'Monetary intermediation',
            classes: [
              {
                code: '6411',
                name: 'Central banking',
              },
              {
                code: '6419',
                name: 'Other monetary intermediation',
              },
            ],
          },
          {
            code: '642',
            name: 'Activities of holding companies and financing conduits',
            classes: [
              {
                code: '6421',
                name: 'Activities of holding companies',
              },
              {
                code: '6422',
                name: 'Activities of financing conduits',
              },
            ],
          },
          {
            code: '643',
            name: 'Activities of trusts, funds and similar financial entities',
            classes: [
              {
                code: '6431',
                name: 'Activities of money market funds',
              },
              {
                code: '6432',
                name: 'Activities of non-money market investments funds',
              },
              {
                code: '6433',
                name: 'Activities of trust, estate and agency accounts',
              },
            ],
          },
          {
            code: '649',
            name: 'Other financial service activities, except insurance and pension funding activities',
            classes: [
              {
                code: '6491',
                name: 'Financial leasing activities',
              },
              {
                code: '6492',
                name: 'International trade financing activities',
              },
              {
                code: '6493',
                name: 'Factoring activities',
              },
              {
                code: '6494',
                name: 'Securitisation activities',
              },
              {
                code: '6495',
                name: 'Other credit granting activities',
              },
              {
                code: '6499',
                name: 'Other financial service activities n.e.c., except insurance and pension funding activities',
              },
            ],
          },
        ],
      },
      {
        code: '65',
        name: 'Insurance, reinsurance and pension funding, except compulsory social security',
        groups: [
          {
            code: '651',
            name: 'Insurance',
            classes: [
              {
                code: '6511',
                name: 'Life insurance',
              },
              {
                code: '6512',
                name: 'Non-life insurance',
              },
            ],
          },
          {
            code: '652',
            name: 'Reinsurance',
            classes: [
              {
                code: '6520',
                name: 'Reinsurance',
              },
            ],
          },
          {
            code: '653',
            name: 'Pension funding',
            classes: [
              {
                code: '6530',
                name: 'Pension funding',
              },
            ],
          },
        ],
      },
      {
        code: '66',
        name: 'Activities auxiliary to financial service and insurance activities',
        groups: [
          {
            code: '661',
            name: 'Activities auxiliary to financial services, except insurance and pension funding',
            classes: [
              {
                code: '6611',
                name: 'Administration of financial markets',
              },
              {
                code: '6612',
                name: 'Security and commodity contracts brokerage',
              },
              {
                code: '6619',
                name: 'Other activities auxiliary to financial service activities, except insurance and pension funding',
              },
            ],
          },
          {
            code: '662',
            name: 'Activities auxiliary to insurance and pension funding',
            classes: [
              {
                code: '6621',
                name: 'Risk and damage evaluation',
              },
              {
                code: '6622',
                name: 'Activities of insurance agents and brokers',
              },
              {
                code: '6629',
                name: 'Other activities auxiliary to insurance and pension funding',
              },
            ],
          },
          {
            code: '663',
            name: 'Fund management activities',
            classes: [
              {
                code: '6630',
                name: 'Fund management activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'M',
    name: 'Real estate activities',
    divisions: [
      {
        code: '68',
        name: 'Real estate activities',
        groups: [
          {
            code: '681',
            name: 'Real estate activities with own or leased property',
            classes: [
              {
                code: '6810',
                name: 'Real estate activities with own or leased property',
              },
            ],
          },
          {
            code: '682',
            name: 'Real estate activities on a fee or contract basis',
            classes: [
              {
                code: '6821',
                name: 'Intermediation service activities for real estate',
              },
              {
                code: '6829',
                name: 'Other real estate activities on a fee or contract basis',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'N',
    name: 'Professional, scientific and technical activities',
    divisions: [
      {
        code: '69',
        name: 'Legal and accounting activities',
        groups: [
          {
            code: '691',
            name: 'Legal activities',
            classes: [
              {
                code: '6910',
                name: 'Legal activities',
              },
            ],
          },
          {
            code: '692',
            name: 'Accounting, bookkeeping and auditing activities; tax consultancy',
            classes: [
              {
                code: '6920',
                name: 'Accounting, bookkeeping and auditing activities; tax consultancy',
              },
            ],
          },
        ],
      },
      {
        code: '70',
        name: 'Activities of head offices; management consultancy activities',
        groups: [
          {
            code: '701',
            name: 'Activities of head offices',
            classes: [
              {
                code: '7010',
                name: 'Activities of head offices',
              },
            ],
          },
          {
            code: '702',
            name: 'Business and other management consultancy activities',
            classes: [
              {
                code: '7020',
                name: 'Business and other management consultancy activities',
              },
            ],
          },
        ],
      },
      {
        code: '71',
        name: 'Architectural and engineering activities; technical testing and analysis',
        groups: [
          {
            code: '711',
            name: 'Architectural and engineering, and related technical consultancy activities',
            classes: [
              {
                code: '7110',
                name: 'Architectural and engineering, and related technical consultancy activities',
              },
            ],
          },
          {
            code: '712',
            name: 'Technical testing and analysis',
            classes: [
              {
                code: '7120',
                name: 'Technical testing and analysis',
              },
            ],
          },
        ],
      },
      {
        code: '72',
        name: 'Scientific research and development',
        groups: [
          {
            code: '721',
            name: 'Research and experimental development on natural sciences and engineering',
            classes: [
              {
                code: '7210',
                name: 'Research and experimental development on natural sciences and engineering',
              },
            ],
          },
          {
            code: '722',
            name: 'Research and experimental development on social sciences and humanities',
            classes: [
              {
                code: '7220',
                name: 'Research and experimental development on social sciences and humanities',
              },
            ],
          },
        ],
      },
      {
        code: '73',
        name: 'Activities of advertising, market research and public relations',
        groups: [
          {
            code: '731',
            name: 'Advertising activities',
            classes: [
              {
                code: '7310',
                name: 'Advertising activities',
              },
            ],
          },
          {
            code: '732',
            name: 'Market research and public opinion polling activities',
            classes: [
              {
                code: '7320',
                name: 'Market research and public opinion polling activities',
              },
            ],
          },
          {
            code: '733',
            name: 'Public relations activities',
            classes: [
              {
                code: '7330',
                name: 'Public relations activities',
              },
            ],
          },
        ],
      },
      {
        code: '74',
        name: 'Other professional, scientific and technical activities',
        groups: [
          {
            code: '741',
            name: 'Specialized design activities',
            classes: [
              {
                code: '7410',
                name: 'Specialized design activities',
              },
            ],
          },
          {
            code: '742',
            name: 'Photographic activities',
            classes: [
              {
                code: '7420',
                name: 'Photographic activities',
              },
            ],
          },
          {
            code: '743',
            name: 'Translation and interpretation activities',
            classes: [
              {
                code: '7430',
                name: 'Translation and interpretation activities',
              },
            ],
          },
          {
            code: '749',
            name: 'Other professional, scientific and technical activities n.e.c.',
            classes: [
              {
                code: '7491',
                name: 'Patent brokering and marketing service activities',
              },
              {
                code: '7499',
                name: 'All other professional, scientific and technical activities n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '75',
        name: 'Veterinary activities',
        groups: [
          {
            code: '750',
            name: 'Veterinary activities',
            classes: [
              {
                code: '7500',
                name: 'Veterinary activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'O',
    name: 'Administrative and support service activities',
    divisions: [
      {
        code: '77',
        name: 'Rental and leasing activities',
        groups: [
          {
            code: '771',
            name: 'Rental and leasing of motor vehicles',
            classes: [
              {
                code: '7710',
                name: 'Rental and leasing of motor vehicles',
              },
            ],
          },
          {
            code: '772',
            name: 'Rental and leasing of personal and household goods',
            classes: [
              {
                code: '7721',
                name: 'Rental and leasing of recreational and sports goods',
              },
              {
                code: '7729',
                name: 'Rental and leasing of other personal and household goods',
              },
            ],
          },
          {
            code: '773',
            name: 'Rental and leasing of other machinery, equipment and tangible goods',
            classes: [
              {
                code: '7730',
                name: 'Rental and leasing of other machinery, equipment and tangible goods',
              },
            ],
          },
          {
            code: '774',
            name: 'Leasing of intellectual property and similar products, except copyrighted works',
            classes: [
              {
                code: '7740',
                name: 'Leasing of intellectual property and similar products, except copyrighted works',
              },
            ],
          },
          {
            code: '775',
            name: 'Intermediation service activities for rental and leasing of tangible goods and non-financial intangible assets',
            classes: [
              {
                code: '7751',
                name: 'Intermediation service activities for rental and leasing of cars, motorhomes and trailers',
              },
              {
                code: '7752',
                name: 'Intermediation service activities for rental and leasing of other tangible goods and non-financial intangible assets',
              },
            ],
          },
        ],
      },
      {
        code: '78',
        name: 'Employment activities',
        groups: [
          {
            code: '781',
            name: 'Activities of employment placement agencies',
            classes: [
              {
                code: '7810',
                name: 'Activities of employment placement agencies',
              },
            ],
          },
          {
            code: '782',
            name: 'Temporary employment agency activities and other human resource provisions',
            classes: [
              {
                code: '7820',
                name: 'Temporary employment agency activities and other human resource provisions',
              },
            ],
          },
        ],
      },
      {
        code: '79',
        name: 'Travel agency, tour operator, and other travel related activities',
        groups: [
          {
            code: '791',
            name: 'Travel agency and tour operator activities',
            classes: [
              {
                code: '7911',
                name: 'Travel agency activities',
              },
              {
                code: '7912',
                name: 'Tour operator activities',
              },
            ],
          },
          {
            code: '799',
            name: 'Other travel related activities',
            classes: [
              {
                code: '7990',
                name: 'Other travel related activities',
              },
            ],
          },
        ],
      },
      {
        code: '80',
        name: 'Investigation and security activities',
        groups: [
          {
            code: '801',
            name: 'Investigation and security activities',
            classes: [
              {
                code: '8011',
                name: 'Investigation and private security activities',
              },
              {
                code: '8019',
                name: 'Security activities n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '81',
        name: 'Services to buildings and landscape activities',
        groups: [
          {
            code: '811',
            name: 'Combined facilities support activities',
            classes: [
              {
                code: '8110',
                name: 'Combined facilities support activities',
              },
            ],
          },
          {
            code: '812',
            name: 'Cleaning activities',
            classes: [
              {
                code: '8121',
                name: 'General cleaning of buildings',
              },
              {
                code: '8129',
                name: 'Other cleaning activities',
              },
            ],
          },
          {
            code: '813',
            name: 'Landscape service activities',
            classes: [
              {
                code: '8130',
                name: 'Landscape service activities',
              },
            ],
          },
        ],
      },
      {
        code: '82',
        name: 'Office administrative, office support and other business support activities',
        groups: [
          {
            code: '821',
            name: 'Office administrative and support activities',
            classes: [
              {
                code: '8210',
                name: 'Office administrative and support activities',
              },
            ],
          },
          {
            code: '822',
            name: 'Activities of call centres',
            classes: [
              {
                code: '8220',
                name: 'Activities of call centres',
              },
            ],
          },
          {
            code: '823',
            name: 'Organization of conventions and trade shows',
            classes: [
              {
                code: '8230',
                name: 'Organization of conventions and trade shows',
              },
            ],
          },
          {
            code: '824',
            name: 'Intermediation service activities for business support activities n.e.c., except financial intermediation',
            classes: [
              {
                code: '8240',
                name: 'Intermediation service activities for business support activities n.e.c., except financial intermediation',
              },
            ],
          },
          {
            code: '829',
            name: 'Business support service activities n.e.c.',
            classes: [
              {
                code: '8291',
                name: 'Activities of collection agencies and credit bureaus',
              },
              {
                code: '8292',
                name: 'Packaging activities',
              },
              {
                code: '8299',
                name: 'Other business support service activities n.e.c.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'P',
    name: 'Public administration and defence; compulsory social security',
    divisions: [
      {
        code: '84',
        name: 'Public administration and defence; compulsory social security',
        groups: [
          {
            code: '841',
            name: 'Administration of the State and the economic, social and environmental policies of the community',
            classes: [
              {
                code: '8411',
                name: 'General public administration activities',
              },
              {
                code: '8412',
                name: 'Regulation of the activities of providing health care, education, cultural services and other social services, excluding social security and environment',
              },
              {
                code: '8413',
                name: 'Regulation of the activities of providing environmental services',
              },
              {
                code: '8414',
                name: 'Regulation of and contribution to more efficient operation of businesses',
              },
            ],
          },
          {
            code: '842',
            name: 'Provision of services to the community as a whole',
            classes: [
              {
                code: '8421',
                name: 'Foreign affairs',
              },
              {
                code: '8422',
                name: 'Defence activities',
              },
              {
                code: '8423',
                name: 'Public order and safety activities',
              },
            ],
          },
          {
            code: '843',
            name: 'Compulsory social security activities',
            classes: [
              {
                code: '8430',
                name: 'Compulsory social security activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'Q',
    name: 'Education',
    divisions: [
      {
        code: '85',
        name: 'Education',
        groups: [
          {
            code: '851',
            name: 'Pre-primary education',
            classes: [
              {
                code: '8510',
                name: 'Pre-primary education',
              },
            ],
          },
          {
            code: '852',
            name: 'Primary education',
            classes: [
              {
                code: '8520',
                name: 'Primary education',
              },
            ],
          },
          {
            code: '853',
            name: 'Secondary and post-secondary non-tertiary education',
            classes: [
              {
                code: '8531',
                name: 'General secondary education',
              },
              {
                code: '8532',
                name: 'Vocational secondary education',
              },
              {
                code: '8533',
                name: 'Post-secondary non-tertiary education',
              },
            ],
          },
          {
            code: '854',
            name: 'Tertiary education',
            classes: [
              {
                code: '8540',
                name: 'Tertiary education',
              },
            ],
          },
          {
            code: '855',
            name: 'Other education',
            classes: [
              {
                code: '8551',
                name: 'Sports and recreation education',
              },
              {
                code: '8552',
                name: 'Cultural education',
              },
              {
                code: '8553',
                name: 'Driving school activities',
              },
              {
                code: '8559',
                name: 'Other education n.e.c.',
              },
            ],
          },
          {
            code: '856',
            name: 'Educational support activities',
            classes: [
              {
                code: '8561',
                name: 'Intermediation service activities for courses and tutors',
              },
              {
                code: '8569',
                name: 'Other educational support activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'R',
    name: 'Human health and social work activities',
    divisions: [
      {
        code: '86',
        name: 'Human health activities',
        groups: [
          {
            code: '861',
            name: 'Hospital activities',
            classes: [
              {
                code: '8610',
                name: 'Hospital activities',
              },
            ],
          },
          {
            code: '862',
            name: 'Medical and dental practice activities',
            classes: [
              {
                code: '8620',
                name: 'Medical and dental practice activities',
              },
            ],
          },
          {
            code: '869',
            name: 'Other human health activities',
            classes: [
              {
                code: '8691',
                name: 'Intermediation service activities for medical, dental, and other human health services',
              },
              {
                code: '8699',
                name: 'Other human health activities n.e.c',
              },
            ],
          },
        ],
      },
      {
        code: '87',
        name: 'Residential care activities',
        groups: [
          {
            code: '871',
            name: 'Residential nursing care activities',
            classes: [
              {
                code: '8710',
                name: 'Residential nursing care activities',
              },
            ],
          },
          {
            code: '872',
            name: 'Residential care activities for persons living with or having a diagnosis of a mental illness or substance abuse',
            classes: [
              {
                code: '8720',
                name: 'Residential care activities for persons living with or having a diagnosis of a mental illness or substance abuse',
              },
            ],
          },
          {
            code: '873',
            name: 'Residential care activities for older persons or persons with physical disabilities',
            classes: [
              {
                code: '8730',
                name: 'Residential care activities for older persons or persons with physical disabilities',
              },
            ],
          },
          {
            code: '879',
            name: 'Other residential care activities',
            classes: [
              {
                code: '8791',
                name: 'Intermediation service activities for residential care activities',
              },
              {
                code: '8799',
                name: 'Other residential care activities n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '88',
        name: 'Social work activities without accommodation',
        groups: [
          {
            code: '881',
            name: 'Social work activities without accommodation for older persons or persons with disabilities',
            classes: [
              {
                code: '8810',
                name: 'Social work activities without accommodation for older persons or persons with disabilities',
              },
            ],
          },
          {
            code: '889',
            name: 'Other social work activities without accommodation',
            classes: [
              {
                code: '8890',
                name: 'Other social work activities without accommodation',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'S',
    name: 'Arts, sports and recreation',
    divisions: [
      {
        code: '90',
        name: 'Arts creation and performing arts activities',
        groups: [
          {
            code: '901',
            name: 'Arts creation activities',
            classes: [
              {
                code: '9011',
                name: 'Literary creation and musical composition activities',
              },
              {
                code: '9012',
                name: 'Visual arts creation activities',
              },
              {
                code: '9013',
                name: 'Other arts creation activities',
              },
            ],
          },
          {
            code: '902',
            name: 'Activities of performing arts',
            classes: [
              {
                code: '9020',
                name: 'Activities of performing arts',
              },
            ],
          },
          {
            code: '903',
            name: 'Support activities to arts creation and performing arts',
            classes: [
              {
                code: '9031',
                name: 'Operation of arts facilities and sites',
              },
              {
                code: '9039',
                name: 'Other support activities to arts creation and performing arts',
              },
            ],
          },
        ],
      },
      {
        code: '91',
        name: 'Library, archives, museum and other cultural activities',
        groups: [
          {
            code: '911',
            name: 'Library and archive activities',
            classes: [
              {
                code: '9111',
                name: 'Library activities',
              },
              {
                code: '9112',
                name: 'Archive activities',
              },
            ],
          },
          {
            code: '912',
            name: 'Museum, collection, historical site and monument activities',
            classes: [
              {
                code: '9121',
                name: 'Museum and collection activities',
              },
              {
                code: '9122',
                name: 'Historical site and monument activities',
              },
            ],
          },
          {
            code: '913',
            name: 'Conservation, restoration and other support activities for cultural heritage',
            classes: [
              {
                code: '9130',
                name: 'Conservation, restoration and other support activities for cultural heritage',
              },
            ],
          },
          {
            code: '914',
            name: 'Botanical and zoological garden and nature reserve activities',
            classes: [
              {
                code: '9141',
                name: 'Botanical and zoological garden activities',
              },
              {
                code: '9142',
                name: 'Nature reserve activities',
              },
            ],
          },
        ],
      },
      {
        code: '92',
        name: 'Gambling and betting activities',
        groups: [
          {
            code: '920',
            name: 'Gambling and betting activities',
            classes: [
              {
                code: '9200',
                name: 'Gambling and betting activities',
              },
            ],
          },
        ],
      },
      {
        code: '93',
        name: 'Sports activities and amusement and recreation activities',
        groups: [
          {
            code: '931',
            name: 'Sports activities',
            classes: [
              {
                code: '9311',
                name: 'Operation of sports facilities',
              },
              {
                code: '9312',
                name: 'Activities of sports clubs',
              },
              {
                code: '9319',
                name: 'Other sports activities',
              },
            ],
          },
          {
            code: '932',
            name: 'Amusement and recreation activities',
            classes: [
              {
                code: '9321',
                name: 'Activities of amusement parks and theme parks',
              },
              {
                code: '9329',
                name: 'Other amusement and recreation activities',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'T',
    name: 'Other service activities',
    divisions: [
      {
        code: '94',
        name: 'Activities of membership organizations',
        groups: [
          {
            code: '941',
            name: 'Activities of business, employers and professional membership organizations',
            classes: [
              {
                code: '9411',
                name: 'Activities of business and employers membership organizations',
              },
              {
                code: '9412',
                name: 'Activities of professional membership organizations',
              },
            ],
          },
          {
            code: '942',
            name: 'Activities of trade unions',
            classes: [
              {
                code: '9420',
                name: 'Activities of trade unions',
              },
            ],
          },
          {
            code: '949',
            name: 'Activities of other membership organizations',
            classes: [
              {
                code: '9491',
                name: 'Activities of religious organizations',
              },
              {
                code: '9492',
                name: 'Activities of political organizations',
              },
              {
                code: '9499',
                name: 'Activities of other membership organizations n.e.c.',
              },
            ],
          },
        ],
      },
      {
        code: '95',
        name: 'Repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
        groups: [
          {
            code: '951',
            name: 'Repair and maintenance of computers and communication equipment',
            classes: [
              {
                code: '9510',
                name: 'Repair and maintenance of computers and communication equipment',
              },
            ],
          },
          {
            code: '952',
            name: 'Repair and maintenance of personal and household goods',
            classes: [
              {
                code: '9521',
                name: 'Repair and maintenance of consumer electronics',
              },
              {
                code: '9522',
                name: 'Repair and maintenance of household appliances and home and garden equipment',
              },
              {
                code: '9523',
                name: 'Repair and maintenance of footwear and leather goods',
              },
              {
                code: '9524',
                name: 'Repair and maintenance of furniture and home furnishings',
              },
              {
                code: '9529',
                name: 'Repair and maintenance of other personal and household goods',
              },
            ],
          },
          {
            code: '953',
            name: 'Repair and maintenance of motor vehicles and motorcycles',
            classes: [
              {
                code: '9531',
                name: 'Repair and maintenance of motor vehicles',
              },
              {
                code: '9532',
                name: 'Repair and maintenance of motorcycles',
              },
            ],
          },
          {
            code: '954',
            name: 'Intermediation service activities for repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
            classes: [
              {
                code: '9540',
                name: 'Intermediation service activities for repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
              },
            ],
          },
        ],
      },
      {
        code: '96',
        name: 'Personal service activities',
        groups: [
          {
            code: '961',
            name: 'Washing and cleaning of textile and fur products',
            classes: [
              {
                code: '9610',
                name: 'Washing and cleaning of textile and fur products',
              },
            ],
          },
          {
            code: '962',
            name: 'Hairdressing, beauty treatment, day spa and similar activities',
            classes: [
              {
                code: '9621',
                name: 'Hairdressing and barber activities',
              },
              {
                code: '9622',
                name: 'Beauty care and other beauty treatment activities',
              },
              {
                code: '9623',
                name: 'Day spa, sauna and steam bath activities',
              },
            ],
          },
          {
            code: '963',
            name: 'Funeral and related activities',
            classes: [
              {
                code: '9630',
                name: 'Funeral and related activities',
              },
            ],
          },
          {
            code: '964',
            name: 'Intermediation service activities for personal services',
            classes: [
              {
                code: '9640',
                name: 'Intermediation service activities for personal services',
              },
            ],
          },
          {
            code: '969',
            name: 'Other personal service activities n.e.c.',
            classes: [
              {
                code: '9690',
                name: 'Other personal service activities n.e.c.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'U',
    name: 'Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use',
    divisions: [
      {
        code: '97',
        name: 'Activities of households as employers of domestic personnel',
        groups: [
          {
            code: '970',
            name: 'Activities of households as employers of domestic personnel',
            classes: [
              {
                code: '9700',
                name: 'Activities of households as employers of domestic personnel',
              },
            ],
          },
        ],
      },
      {
        code: '98',
        name: 'Undifferentiated goods- and services-producing activities of private households for own use',
        groups: [
          {
            code: '981',
            name: 'Undifferentiated goods-producing activities of private households for own use',
            classes: [
              {
                code: '9810',
                name: 'Undifferentiated goods-producing activities of private households for own use',
              },
            ],
          },
          {
            code: '982',
            name: 'Undifferentiated service-producing activities of private households for own use',
            classes: [
              {
                code: '9820',
                name: 'Undifferentiated service-producing activities of private households for own use',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'V',
    name: 'Activities of extraterritorial organizations and bodies',
    divisions: [
      {
        code: '99',
        name: 'Activities of extraterritorial organizations and bodies',
        groups: [
          {
            code: '990',
            name: 'Activities of extraterritorial organizations and bodies',
            classes: [
              {
                code: '9900',
                name: 'Activities of extraterritorial organizations and bodies',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const isicRev5Counts = {
  sections: isicRev5Sections.length,
  divisions: isicRev5Sections.reduce(
    (total, section) => total + section.divisions.length,
    0,
  ),
  groups: isicRev5Sections.reduce(
    (total, section) =>
      total +
      section.divisions.reduce(
        (divisionTotal, division) => divisionTotal + division.groups.length,
        0,
      ),
    0,
  ),
  classes: isicRev5Sections.reduce(
    (total, section) =>
      total +
      section.divisions.reduce(
        (divisionTotal, division) =>
          divisionTotal +
          division.groups.reduce(
            (groupTotal, group) => groupTotal + group.classes.length,
            0,
          ),
        0,
      ),
    0,
  ),
};
