/*
 * Copyright 2019 Alex Niu, Garret Fick, Jitendra Rathour, Zhimin Shen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import * as React from 'react'
import { toLonLat } from 'ol/proj'
import { ChartProps } from './shared'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryContainer, VictoryLabel } from 'victory'
import { GeoJsonShape } from '../data/GeoJson'
import { Coordinate } from '../geom'

type DataSet = {
  id: string,
  data: {},
}

const mapDataForTarget = (id: string, data: GeoJsonShape, target: Coordinate): DataSet => {
  const pos = toLonLat([target.x, target.y]);
  const posX = pos[0]

  const items = []
  for (let i = 0; i < data.features.length; ++i) {
    const coordList = data.features[i].geometry.coordinates[0];
    const minX = Math.min(coordList[0][0], coordList[2][0]);
    const maxX = Math.max(coordList[0][0], coordList[2][0]);
    if (posX >= minX && posX < maxX) {
      items.push({
        y: coordList[0][1],
        ghi: data.features[i].properties.ghi,
        energy: data.features[i].properties.energy,
      })
    }
  }

  items.sort((el1, el2) => {
    return el1.y - el2.y
  });

  return {
    id,
    data: items
  }
}

export default class Vertical extends React.Component<ChartProps> {
    state = {
        count: 0
    };

    filteredData: DataSet[] = []

    render () {
      const yDomain = this.props.region.toLonLat().yDomain();

      const lines = this.filteredData.map(def => {
        return (<VictoryLine
          key={def.id}
          horizontal={true}
          data={def.data}
          // data accessor for x values
          x="y"
          // data accessor for y values
          y="ghi"
          style={{data: {stroke: "#aa2e25"}}}
        />);
      });

      return (
        <VictoryChart theme={VictoryTheme.material} height={this.props.mapHeight} width={80} padding={{top: 0, left: 12, bottom: 0, right: 0}}  containerComponent={<VictoryContainer responsive={false}/>}>
          <VictoryAxis domain={yDomain} orientation="right"/>
          <VictoryAxis dependentAxis={true} domain={this.props.valueDomain} invertAxis={true} tickLabelComponent={<VictoryLabel dx={-20} angle={90} textAnchor="end" style={{ fill: "white" }} />}/>
          {lines}
      </VictoryChart>);
    }

    componentDidUpdate(prevProps: ChartProps) {
      if (this.props.data && (prevProps.data !== this.props.data || prevProps.target !== this.props.target)) {
        this.filteredData = []
        this.filteredData.push(mapDataForTarget("NREL", this.props.data, this.props.target))
      }
    }
}