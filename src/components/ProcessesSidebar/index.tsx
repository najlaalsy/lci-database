import { history, Link, useLocation } from '@umijs/max';
import { Tree, type TreeDataNode, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { isicRev5Sections } from '@/data/isicRev5';
import './index.less';

const { Text } = Typography;

type ProcessNodeType = 'section' | 'division' | 'group' | 'class';

interface ProcessTreeNode extends TreeDataNode {
  key: string;
  title: React.ReactNode;
  nodeType: ProcessNodeType;
  code: string;
  name: string;
  children?: ProcessTreeNode[];
}

const createTitle = (code: string, name: string) => (
  <span className="processes-sidebar__title">
    <Text className="processes-sidebar__code">{code}</Text>
    <span>{name}</span>
  </span>
);

const ProcessesSidebar = () => {
  const location = useLocation();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const treeData = useMemo<ProcessTreeNode[]>(
    () =>
      isicRev5Sections.map((section) => ({
        key: `section:${section.code}`,
        title: createTitle(section.code, section.name),
        nodeType: 'section',
        code: section.code,
        name: section.name,
        children: section.divisions.map((division) => ({
          key: `division:${division.code}`,
          title: createTitle(division.code, division.name),
          nodeType: 'division',
          code: division.code,
          name: division.name,
          children: division.groups.map((group) => ({
            key: `group:${group.code}`,
            title: createTitle(group.code, group.name),
            nodeType: 'group',
            code: group.code,
            name: group.name,
            children: group.classes.map((item) => ({
              key: `class:${item.code}`,
              title: createTitle(item.code, item.name),
              nodeType: 'class',
              code: item.code,
              name: item.name,
              isLeaf: true,
            })),
          })),
        })),
      })),
    [],
  );

  const selectedClass = location.pathname.match(/^\/processes\/([^/]+)$/);

  const selectedKeys = selectedClass ? [`class:${selectedClass[1]}`] : [];

  const handleSelect = (
    _selectedKeys: React.Key[],
    info: { node: ProcessTreeNode },
  ) => {
    const node = info.node;

    if (node.nodeType === 'class') {
      history.push(`/processes/${node.code}`);
      return;
    }

    setExpandedKeys((currentKeys) =>
      currentKeys.includes(node.key)
        ? currentKeys.filter((key) => key !== node.key)
        : [...currentKeys, node.key],
    );
  };

  return (
    <div className="processes-sidebar">
      <div className="processes-sidebar__header">
        <Link to="/welcome" className="processes-sidebar__welcome">
          Welcome
        </Link>

        <Typography.Title level={5}>Processes</Typography.Title>

        <Text type="secondary">ISIC Revision 5</Text>
      </div>

      <div className="processes-sidebar__scroll">
        <Tree<ProcessTreeNode>
          blockNode
          autoExpandParent={false}
          treeData={treeData}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default ProcessesSidebar;
