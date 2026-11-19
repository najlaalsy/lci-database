/**
 * @name umi çš„è·¯ç”±é…ç½®
 * @description åªæ”¯æŒ path,component,routes,redirect,wrappers,name,icon çš„é…ç½®
 * @param path  path åªæ”¯æŒä¸¤ç§å ä½ç¬¦é…ç½®ï¼Œç¬¬ä¸€ç§æ˜¯åŠ¨æ€å‚æ•° :id çš„å½¢å¼ï¼Œç¬¬äºŒç§æ˜¯ * é€šé…ç¬¦ï¼Œé€šé…ç¬¦åªèƒ½å‡ºçŽ°è·¯ç”±å­—ç¬¦ä¸²çš„æœ€åŽã€‚
 * @param component é…ç½® location å’Œ path åŒ¹é…åŽç”¨äºŽæ¸²æŸ“çš„ React ç»„ä»¶è·¯å¾„ã€‚å¯ä»¥æ˜¯ç»å¯¹è·¯å¾„ï¼Œä¹Ÿå¯ä»¥æ˜¯ç›¸å¯¹è·¯å¾„ï¼Œå¦‚æžœæ˜¯ç›¸å¯¹è·¯å¾„ï¼Œä¼šä»Ž src/pages å¼€å§‹æ‰¾èµ·ã€‚
 * @param routes é…ç½®å­è·¯ç”±ï¼Œé€šå¸¸åœ¨éœ€è¦ä¸ºå¤šä¸ªè·¯å¾„å¢žåŠ  layout ç»„ä»¶æ—¶ä½¿ç”¨ã€‚
 * @param redirect é…ç½®è·¯ç”±è·³è½¬
 * @param wrappers é…ç½®è·¯ç”±ç»„ä»¶çš„åŒ…è£…ç»„ä»¶ï¼Œé€šè¿‡åŒ…è£…ç»„ä»¶å¯ä»¥ä¸ºå½“å‰çš„è·¯ç”±ç»„ä»¶ç»„åˆè¿›æ›´å¤šçš„åŠŸèƒ½ã€‚ æ¯”å¦‚ï¼Œå¯ä»¥ç”¨äºŽè·¯ç”±çº§åˆ«çš„æƒé™æ ¡éªŒ
 * @param name é…ç½®è·¯ç”±çš„æ ‡é¢˜ï¼Œé»˜è®¤è¯»å–å›½é™…åŒ–æ–‡ä»¶ menu.ts ä¸­ menu.xxxx çš„å€¼ï¼Œå¦‚é…ç½® name ä¸º loginï¼Œåˆ™è¯»å– menu.ts ä¸­ menu.login çš„å–å€¼ä½œä¸ºæ ‡é¢˜
 * @param icon é…ç½®è·¯ç”±çš„å›¾æ ‡ï¼Œå–å€¼å‚è€ƒ https://ant.design/components/icon-cnï¼Œ æ³¨æ„åŽ»é™¤é£Žæ ¼åŽç¼€å’Œå¤§å°å†™ï¼Œå¦‚æƒ³è¦é…ç½®å›¾æ ‡ä¸º <StepBackwardOutlined /> åˆ™å–å€¼åº”ä¸º stepBackward æˆ– StepBackwardï¼Œå¦‚æƒ³è¦é…ç½®å›¾æ ‡ä¸º <UserOutlined /> åˆ™å–å€¼åº”ä¸º user æˆ–è€… User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        component: './user/register-result',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './user/register',
      },
      {
        path: '/user/*',
        component: './exception/404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'Home',
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/admin/users',
    name: 'User Management',
    icon: 'team',
    component: './Admin/Users',
  },
  {
    path: '/datasets',
    name: 'Datasets',
    icon: 'database',
    component: './Datasets/List',
  },
  {
    path: '/processes',
    name: 'Processes',
    icon: 'apartment',
    component: './Processes',
  },
  {
    path: '/processes/:classCode',
    component: './Processes/Class',
    hideInMenu: true,
  },
  {
    path: '/datasets/new/manual',
    component: './Datasets/New/Manual',
    hideInMenu: true,
  },
  {
    path: '/datasets/new/import',
    component: './Datasets/New/Import',
    hideInMenu: true,
  },
  {
    path: '/datasets/new',
    component: './Datasets/New',
    hideInMenu: true,
  },
  {
    path: '/datasets/new/detail/:datasetId',
    component: './Datasets/New/Detail',
    hideInMenu: true,
  },
  {
    path: '/flows',
    name: 'Flows',
    icon: 'branches',
    component: './Flows',
  },
  {
    path: '/supporting-data',
    name: 'Supporting-data',
    icon: 'database',
    routes: [
      {
        path: '/supporting-data/flow-properties',
        name: 'Flow-properties',
        component: './SupportingData/FlowProperties',
      },
      {
        path: '/supporting-data/unit-groups',
        name: 'Unit-groups',
        component: './SupportingData/UnitGroups',
      },
      {
        path: '/supporting-data/sources',
        name: 'Sources',
        component: './SupportingData/Sources',
      },
    ],
  },
  {
    path: '/verifier',
    layout: false,
    wrappers: ['@/wrappers/verifier'],
    redirect: '/verifier/dashboard',
  },
  {
    path: '/verifier/dashboard',
    layout: false,
    wrappers: ['@/wrappers/verifier'],
    component: './verifier/Dashboard',
  },
  {
    path: '/verifier/review-queue',
    layout: false,
    wrappers: ['@/wrappers/verifier'],
    component: './verifier/ReviewQueue',
  },
  {
    path: '/verifier/history',
    layout: false,
    wrappers: ['@/wrappers/verifier'],
    component: './verifier/VerificationHistory',
  },
  {
    path: '/verifier/datasets/:datasetId',
    layout: false,
    wrappers: ['@/wrappers/verifier'],
    component: './Datasets/New/Detail',
    hideInMenu: true,
  },
  {
    path: '/',
    layout: false,
    redirect: '/user/login',
  },
  {
    path: '/*',
    component: './exception/404',
  },
];
