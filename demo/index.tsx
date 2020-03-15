import React, { memo, useState, useEffect } from 'react';
import List, { CellProps, CellData, HeaderFooterProps } from '../src/index';
import ReactDOM from 'react-dom';

const Header: React.FC<HeaderFooterProps> = memo(({ onHeightChange, style }) => {
  const [height, setHeight] = useState(100);
  return (
    <div
      style={{ height, textAlign: 'center', backgroundColor: 'green', ...style }}
      onClick={() => {
        const height1 = 100 + ~~(Math.random() * 20);
        setHeight(height1);
        onHeightChange(height1);
      }}
    >
      header
    </div>
  );
});

Header.initHeight = 100;

const Cell = memo((props: CellProps<{ name: string }>) => {
  const { width, height, top, index } = props;
  return (
    <div
      style={{
        width,
        height,
        top,
        position: 'absolute',
        backgroundColor: index % 2 === 0 ? 'white' : 'yellow',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span>{props.data.name + props.index}</span>
    </div>
  );
});

const cellData: CellData<{ name: string }>[] = Array(1000)
  .fill(1)
  .map((_, i) => {
    return {
      height: ~~(100 + Math.random() * 30),
      data: { name: `name` },
      Component: Cell
    };
  });

const Cell2 = memo((props: CellProps<{ title: string; subTitle: string }>) => {
  useEffect(() => {
    return () => {
      console.log('componentWillUnmount');
    };
  }, []);

  return (
    <section
      style={{
        height: props.height,
        width: props.width,
        position: 'absolute',
        top: props.top,
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h4>{props.data.title + props.index}</h4>
      <span>{props.data.subTitle + props.index}</span>
    </section>
  );
});

const cellData2: CellData<{ title: string; subTitle: string }>[] = Array(1000)
  .fill(1)
  .map((_, i) => {
    return {
      height: ~~(100 + Math.random() * 30),
      data: { title: `title`, subTitle: `subtile` },
      Component: Cell2
    };
  });

const renderData = [...cellData, ...cellData2].sort(() => Math.random() - 0.5);

const Demo = () => {
  return <List Header={Header} height={screen.height} width={screen.width} cellData={renderData} />;
};

ReactDOM.render(<Demo />, document.getElementById('root'));