import { useState } from 'react';

import { ASInput } from 'components';

export function Tiles() {
  const [tilesCount, setTilesCount] = useState<number>(8);
  const tilesHeight = 24;
  const tilesWidth = 24;

  const totalHeight = 208;
  const totalWidth = 48;

  const totalTilesHeight = tilesCount * tilesHeight;

  const totalEmptySpace = totalHeight - totalTilesHeight;
  const totalGaps = tilesCount + 1;

  const eachEmptySpaceHeight = totalEmptySpace / totalGaps;
  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>{`Tile Height: ${tilesHeight}`}</p>
      <br />
      <p>{`Gap Height: ${eachEmptySpaceHeight}`}</p>
      <br />
      <ASInput
        label="tileCount"
        type="number"
        value={tilesCount}
        onChange={(event) => {
          setTilesCount(Number(event.target.value));
        }}
      />
      <br />
      <br />
      <div
        style={{
          height: totalHeight,
          backgroundColor: 'antiquewhite',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingLeft: 10,
          paddingRight: 10,
          width: totalWidth,
          alignItems: 'center',
          // scale: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '100%',
            backgroundColor: 'saddlebrown',
          }}
        >
          {Array(tilesCount)
            .fill(0)
            .map((tile, tileIndex) => {
              return (
                <div
                  key={tileIndex}
                  style={{
                    height: tilesHeight,
                    width: tilesWidth,
                    backgroundColor: 'gray',
                    transform: 'rotate(45deg)',
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
